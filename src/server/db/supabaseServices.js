import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const supabaseUrl = 'https://mnopnsflftxklsrsunal.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ub3Buc2ZsZnR4a2xzcnN1bmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MjA4OTgsImV4cCI6MjA0MTk5Njg5OH0.xw24ADZ6ojlTxutQDStLYqzXhXMApfqW3BLJJ0C6ImM'
// Check if the environment variables are loaded correctly
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
