'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import SearchModal from './SearchModal'

export default function QuickSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-600" />
          Discover
        </h2>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full p-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-2xl transition-all duration-300 text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-gray-500">Search for users, posts, or content...</span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-300 rounded">
                Ctrl
              </kbd>
              <span className="text-gray-400 text-xs">+</span>
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-300 rounded">
                K
              </kbd>
            </div>
          </div>
        </button>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100/50">
            <h3 className="font-medium text-blue-900 text-sm">Popular Today</h3>
            <p className="text-xs text-blue-700 mt-1">Find trending discussions</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100/50">
            <h3 className="font-medium text-purple-900 text-sm">New Members</h3>
            <p className="text-xs text-purple-700 mt-1">Connect with newcomers</p>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
