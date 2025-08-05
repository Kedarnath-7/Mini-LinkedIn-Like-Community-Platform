'use client'

import { Post as PostType } from '@/lib/supabase'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { User, Clock, Heart, MessageCircle, Share2 } from 'lucide-react'

interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <Link href={`/profile/${post.user_id}`} className="flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
          </Link>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Link
                href={`/profile/${post.user_id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                {post.user?.name || 'Unknown User'}
              </Link>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
              </div>
            </div>
            
            {/* Post Content */}
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors duration-200 group/like">
              <Heart className="h-5 w-5 group-hover/like:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Like</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 group/comment">
              <MessageCircle className="h-5 w-5 group-hover/comment:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Comment</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors duration-200 group/share">
              <Share2 className="h-5 w-5 group-hover/share:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          
          <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full">
            #{post.id.slice(-6)}
          </div>
        </div>
      </div>
    </div>
  )
}
