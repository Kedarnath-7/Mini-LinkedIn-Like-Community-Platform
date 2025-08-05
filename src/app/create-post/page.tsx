'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import CreatePostForm from '@/components/posts/CreatePostForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreatePostPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/')
    return null
  }

  const handlePostCreated = () => {
    router.push('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Feed</span>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a Post</h1>
      
      <CreatePostForm onPostCreated={handlePostCreated} />
    </div>
  )
}
