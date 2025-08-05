'use client'

import { useState, useEffect, use } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Post as PostType } from '@/lib/supabase'
import ProfileHeader from '@/components/profile/ProfileHeader'
import Post from '@/components/posts/Post'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Profile {
  id: string
  name: string
  email: string
  bio: string | null
}

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = use(params)
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', resolvedParams.id)
          .single()

        if (error) {
          setError('Profile not found')
          console.error('Profile fetch error:', error)
        } else {
          setProfile(data)
        }
      } catch {
        setError('An unexpected error occurred')
      }
    }

    const fetchUserPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            profiles:user_id (
              id,
              name,
              email
            )
          `)
          .eq('user_id', resolvedParams.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Posts fetch error:', error)
        } else {
          const transformedPosts = data?.map((post) => ({
            ...post,
            user: post.profiles
          })) || []
          setPosts(transformedPosts)
        }
      } catch {
        console.error('An unexpected error occurred while fetching posts')
      }
    }

    const fetchData = async () => {
      setLoading(true)
      await Promise.all([fetchProfile(), fetchUserPosts()])
      setLoading(false)
    }

    fetchData()
  }, [resolvedParams.id])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to view profiles</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Feed</span>
          </Link>
        </div>
        
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const isOwnProfile = user.id === resolvedParams.id

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Feed</span>
        </Link>
      </div>
      
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} postsCount={posts.length} />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isOwnProfile ? 'Your Posts' : `Posts by ${profile.name}`}
        </h2>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {isOwnProfile ? "You haven't posted anything yet." : "This user hasn't posted anything yet."}
          </p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
