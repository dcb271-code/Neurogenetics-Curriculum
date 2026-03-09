import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service_role key.
 * NEVER import this in client components — only use in API routes / server code.
 */
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
