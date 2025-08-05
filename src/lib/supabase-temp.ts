import { createClient } from '@supabase/supabase-js'

// Temporary hard-coded values for testing
const supabaseUrl = 'https://zrybgyxpkkobvokqkeur.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyeWJneXhwa2tvYnZva3FrZXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODQxNDcsImV4cCI6MjA2OTk2MDE0N30.9Zf-eZtarNhxx4EmajH-E8HrFyLP2fNwmi3W-GdZ1qM'

// Use environment variables if available, otherwise use hard-coded values
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey

// Debug logging (remove in production)
if (typeof window !== 'undefined') {
  console.log('Supabase URL:', url)
  console.log('Supabase Key exists:', !!key)
  console.log('Using env vars:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
}

export const supabase = createClient(url, key)

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
