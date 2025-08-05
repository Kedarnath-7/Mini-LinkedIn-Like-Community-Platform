'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Send, User, Sparkles } from 'lucide-react'

interface CreatePostFormProps {
  onPostCreated?: () => void
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            content: content.trim(),
            user_id: user.id,
          },
        ])

      if (error) {
        setError('Failed to create post')
        console.error('Post creation error:', error)
      } else {
        setContent('')
        onPostCreated?.()
      }
    } catch {
      setError('An unexpected error occurred')
    }

    setLoading(false)
  }

  if (!user) return null

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Avatar and Input */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`What would you like to share, ${user.user_metadata?.name || user.email?.split('@')[0]}?`}
                className="w-full p-4 pr-16 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 resize-none text-gray-800 placeholder-gray-500 transition-all duration-300"
                rows={4}
                maxLength={500}
                required
              />
              
              {/* Character Counter */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <div className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                  content.length > 450 
                    ? 'text-red-600 bg-red-50' 
                    : content.length > 400 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-500 bg-gray-100'
                }`}>
                  {content.length}/500
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="ml-16 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center ml-16">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="h-4 w-4" />
            <span>Share your thoughts with the community</span>
          </div>
          
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg ${
              loading || !content.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Share Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
