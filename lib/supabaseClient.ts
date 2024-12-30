import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'production') {
    console.error('Supabase credentials are missing. Please check your environment variables.')
  }
}

export const supabase = createClient(
  supabaseUrl || supabaseUrl,
  supabaseAnonKey || supabaseAnonKey
)