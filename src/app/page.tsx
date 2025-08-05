'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import CreatePostForm from '@/components/posts/CreatePostForm'
import PostFeed from '@/components/posts/PostFeed'
import QuickSearch from '@/components/search/QuickSearch'

export default function Home() {
  const { user, loading } = useAuth()
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <AuthForm 
        mode={authMode} 
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Welcome back, {user.user_metadata?.name || user.email?.split('@')[0]}! 🎉
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl">
              Share your thoughts with the community
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid gap-6 sm:gap-8">
          {/* Search Section */}
          <QuickSearch />

          {/* Create Post Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 sm:px-6 py-4">
              <h2 className="text-white font-semibold text-base sm:text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                What&apos;s on your mind?
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <CreatePostForm />
            </div>
          </div>

          {/* Feed Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                Recent Posts
              </h2>
              <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                Live Feed
              </div>
            </div>
            <PostFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
