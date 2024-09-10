import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://iaxotwomllrffirommvt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheG90d29tbGxyZmZpcm9tbXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTM0MzksImV4cCI6MjA0MTQ2OTQzOX0.5zT2d9TgNVU3ByDGAffMQcFvH1S8vLg-ibekIbB5_mw"
);

export default supabase;
