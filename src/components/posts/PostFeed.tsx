'use client'

import { useState, useEffect } from 'react'
import { supabase, Post as PostType } from '@/lib/supabase'
import Post from './Post'
import { Loader2, RefreshCw, MessageSquare, TrendingUp } from 'lucide-react'

export default function PostFeed() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPosts = async () => {
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
        .order('created_at', { ascending: false })

      if (error) {
        setError('Failed to load posts')
        console.error('Posts fetch error:', error)
      } else {
        // Transform the data to match our Post type
        const transformedPosts = data?.map((post) => ({
          ...post,
          user: post.profiles
        })) || []
        setPosts(transformedPosts)
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()

    // Subscribe to new posts
    const channel = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
        },
        () => {
          fetchPosts()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center gap-3 text-blue-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Loading amazing posts...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCw className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchPosts}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="h-10 w-10 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">No posts yet!</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Be the first to share something amazing with the community. Your thoughts matter!
        </p>
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
            <TrendingUp className="h-4 w-4" />
            <span>Start the conversation</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'both'
          }}
        >
          <Post post={post} />
        </div>
      ))}
      
      {/* End of feed indicator */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          You&apos;re all caught up!
        </div>
      </div>
    </div>
  )
}
