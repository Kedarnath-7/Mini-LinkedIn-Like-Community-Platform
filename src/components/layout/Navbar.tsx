'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Home, User, LogOut, PlusCircle, Users, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchModal from '@/components/search/SearchModal'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!user) return null

  const handleSignOut = async () => {
    await signOut()
  }

  const navItems = [
    { href: '/', icon: Home, label: 'Home', color: 'text-blue-600' },
    { href: '/create-post', icon: PlusCircle, label: 'Create', color: 'text-green-600' },
    { href: `/profile/${user.id}`, icon: User, label: 'Profile', color: 'text-purple-600' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 group">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mini LinkedIn-Like Community
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex flex-col items-center px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-1 ${isActive ? item.color : 'text-gray-500'} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="hidden sm:block">{item.label}</span>
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    )}
                  </Link>
                )
              })}

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative flex flex-col items-center px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 group"
                title="Search (Ctrl+K)"
              >
                <Search className="h-5 w-5 mb-1 text-gray-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden sm:block">Search</span>
              </button>

              <div className="ml-4 pl-4 border-l border-gray-200">
                <button
                  onClick={handleSignOut}
                  className="flex flex-col items-center px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group"
                >
                  <LogOut className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform duration-200" />
                  <span className="hidden sm:block">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
