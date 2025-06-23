import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.0'

const supabaseUrl = "https://ykowjdipkxkihornidhc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrb3dqZGlwa3hraWhvcm5pZGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDA1MDIsImV4cCI6MjA2NjI3NjUwMn0.-rA42urQsQTwpDN9-PHu-4Y1ozjaKkg5zoJK4jKSQ_o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
