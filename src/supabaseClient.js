import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sljxwksfmwkdcwyafljc.supabase.co'
const SUPABASE_KEY = 'sb_publishable_nCkPC9evsA3Wrj7KbOJWUw_tCyNZ1bX'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
