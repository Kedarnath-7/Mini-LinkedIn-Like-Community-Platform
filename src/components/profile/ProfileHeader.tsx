'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Edit2, Save, X, Mail, Calendar, MapPin, Briefcase, Camera, Award } from 'lucide-react'

interface ProfileHeaderProps {
  profile: {
    id: string
    name: string
    email: string
    bio: string | null
    created_at?: string
  }
  isOwnProfile: boolean
  postsCount?: number
}

export default function ProfileHeader({ profile, isOwnProfile, postsCount = 0 }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio || '')
  const [loading, setLoading] = useState(false)
  const { updateProfile } = useAuth()

  const handleSave = async () => {
    setLoading(true)
    try {
      const { error } = await updateProfile({ name, bio: bio || undefined })
      if (!error) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Update profile error:', error)
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setName(profile.name)
    setBio(profile.bio || '')
    setIsEditing(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const joinedDate = profile.created_at 
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    : 'Recently'

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm overflow-hidden mb-6 sm:mb-8">
      {/* Cover Photo */}
      <div className="h-32 sm:h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        {isOwnProfile && (
          <button className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">
            <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}
      </div>

      {/* Profile Content */}
      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-12 sm:-mt-16 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative self-center sm:self-auto">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white text-xl sm:text-3xl font-bold shadow-2xl ring-4 ring-white">
                {getInitials(profile.name)}
              </div>
              {isOwnProfile && (
                <button className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 p-1.5 sm:p-2 bg-white rounded-full shadow-lg border-2 border-blue-100 text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110">
                  <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>

            {/* Name and Title */}
            <div className="space-y-2 flex-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-4 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/50">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 bg-gray-50 focus:bg-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-800">{profile.name}</h1>
                    {isOwnProfile && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
                      >
                        <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 font-medium text-sm sm:text-base">
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Community Member</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm sm:text-base">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Global Network</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!isEditing && (
            <div className="mt-4 sm:mt-6 lg:mt-0 flex justify-center lg:justify-end">
              {isOwnProfile ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 sm:gap-3">
                  <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base">
                    Connect
                  </button>
                  <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl sm:rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base">
                    Message
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bio Section */}
        {!isEditing && profile.bio && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl sm:rounded-2xl border border-blue-100/50">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              About
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{profile.bio}</p>
          </div>
        )}

        {/* Stats and Info */}
        {!isEditing && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100/50">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Activity</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Posts</span>
                  <span className="font-bold text-blue-600 text-lg sm:text-xl">{postsCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Connections</span>
                  <span className="font-bold text-purple-600 text-lg sm:text-xl">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Views</span>
                  <span className="font-bold text-green-600 text-lg sm:text-xl">1.2K</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100/50">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Contact</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-600 text-xs sm:text-sm break-all">{profile.email}</span>
                </div>
              </div>
            </div>

            {/* Member Since */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100/50 sm:col-span-2 md:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Member Since</h3>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <span className="text-gray-600 text-sm sm:text-base">{joinedDate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
