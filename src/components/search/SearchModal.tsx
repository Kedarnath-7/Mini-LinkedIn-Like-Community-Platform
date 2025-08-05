'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, User, FileText, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface SearchResult {
  id: string
  type: 'user' | 'post'
  title: string
  subtitle: string
  content?: string
  userId?: string
  userName?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'users' | 'posts'>('all')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const performSearch = async (searchQuery: string) => {
      setLoading(true)
      const searchResults: SearchResult[] = []

      try {
        // Search users
        if (activeTab === 'all' || activeTab === 'users') {
          const { data: users } = await supabase
            .from('profiles')
            .select('id, name, email, bio')
            .or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`)
            .limit(10)

          if (users) {
            users.forEach(user => {
              searchResults.push({
                id: user.id,
                type: 'user',
                title: user.name,
                subtitle: user.email,
                content: user.bio || 'No bio available'
              })
            })
          }
        }

        // Search posts
        if (activeTab === 'all' || activeTab === 'posts') {
          const { data: posts } = await supabase
            .from('posts')
            .select(`
              id,
              content,
              created_at,
              author_id,
              profiles!posts_author_id_fkey (
                name,
                email
              )
            `)
            .ilike('content', `%${searchQuery}%`)
            .limit(10)
            .order('created_at', { ascending: false })

          if (posts) {
            posts.forEach(post => {
              const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
              searchResults.push({
                id: post.id,
                type: 'post',
                title: post.content.substring(0, 60) + (post.content.length > 60 ? '...' : ''),
                subtitle: `By ${profile?.name || 'Unknown'} • ${new Date(post.created_at).toLocaleDateString()}`,
                content: post.content,
                userId: post.author_id,
                userName: profile?.name
              })
            })
          }
        }

        setResults(searchResults)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const searchTimeout = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query, activeTab])

  const handleClose = () => {
    setQuery('')
    setResults([])
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-4 sm:pt-20 px-2 sm:px-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for users, posts, or content..."
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300"
              />
            </div>
            <button
              onClick={handleClose}
              className="p-2 sm:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3 sm:mt-4">
            {[
              { key: 'all', label: 'All' },
              { key: 'users', label: 'Users' },
              { key: 'posts', label: 'Posts' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'all' | 'users' | 'posts')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-blue-600" />
              <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-600">Searching...</span>
            </div>
          ) : results.length === 0 && query.trim().length >= 2 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-500">No results found for &quot;{query}&quot;</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Try different keywords or check your spelling</p>
            </div>
          ) : results.length === 0 && query.trim().length < 2 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-500">Start typing to search</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Search for users, posts, or any content</p>
            </div>
          ) : (
            <div className="p-3 sm:p-4">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.type === 'user' ? `/profile/${result.id}` : '/'}
                  onClick={handleClose}
                  className="block p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${
                      result.type === 'user'
                        ? 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600'
                        : 'bg-gradient-to-br from-green-100 to-blue-100 text-green-600'
                    }`}>
                      {result.type === 'user' ? (
                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                        {result.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {result.subtitle}
                      </p>
                      {result.content && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                          {result.content}
                        </p>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded-md sm:rounded-lg text-xs font-medium flex-shrink-0 ${
                      result.type === 'user'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {result.type === 'user' ? 'User' : 'Post'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
