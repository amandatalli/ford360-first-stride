// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ixtwfpifjlqfnvejxylq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4dHdmcGlmamxxZm52ZWp4eWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTU4MzYsImV4cCI6MjA2MDM5MTgzNn0.38IGOaq6VKrJWfLf0wL4Xr9uzwpd0YZUFKqwAtIWnpg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);