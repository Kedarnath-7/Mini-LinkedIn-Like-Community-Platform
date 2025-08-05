'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...')

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { error } = await supabase.from('profiles').select('count').limit(1)
        
        if (error) {
          setConnectionStatus(`Connection Error: ${error.message}`)
        } else {
          setConnectionStatus('✅ Supabase connection successful!')
        }
      } catch (err) {
        setConnectionStatus(`Unexpected Error: ${err}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
      <h3 className="font-semibold text-blue-800">Supabase Connection Test</h3>
      <p className="text-sm text-blue-700">{connectionStatus}</p>
      <div className="text-xs text-blue-600 mt-2">
        <div>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not loaded'}</div>
        <div>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ Missing'}</div>
      </div>
    </div>
  )
}
