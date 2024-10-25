import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import process from 'process'

// Load environment variables from .env file
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// Check if the environment variables are loaded correctly
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
