import { createClient } from "@supabase/supabase-js";

// Supabase Configuration loaded from environment variables (prefixed with VITE_ for Vite dev/build pipelines)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
