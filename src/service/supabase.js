import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gybnqmiojrplaqumbfnd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Ym5xbWlvanJwbGFxdW1iZm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MjE0MTIsImV4cCI6MjA4NTM5NzQxMn0.xwYN0-Ms_kXnUPREZgcNuRbP93MncUo15AaRkzv6ZlE";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
