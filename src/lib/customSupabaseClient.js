import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kjpzgphwpjngmhefdjhw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqcHpncGh3cGpuZ21oZWZkamh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMzcxOTMsImV4cCI6MjA3NDkxMzE5M30.YNplBEQG9trhAL9fJGaJ8S9FCoeAd8E5jPHX_Da7jFo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);