// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ywcdgzpynxfrhkizepew.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Y2RnenB5bnhmcmhraXplcGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMjE4MzEsImV4cCI6MjA2NTg5NzgzMX0.fxFX_YileTrM6P1jUpIBunj7djwjrVdpZVFemn4kbfw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


        