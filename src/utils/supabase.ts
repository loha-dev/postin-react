import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.ANON_KEY as string;
const supabaseAnonKey = process.env.ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
