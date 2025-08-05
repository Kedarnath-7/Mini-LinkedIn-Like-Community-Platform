import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name: string
  bio: string | null
  created_at: string
  avatar_url?: string
}

export interface Post {
  id: string
  content: string
  user_id: string
  created_at: string
  updated_at?: string
  user?: User
}

export interface Profile {
  id: string
  email: string
  name: string
  bio: string | null
  created_at: string
}
