import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxjumdtlcfjjphrxsbtm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4anVtZHRsY2ZqanBocnhzYnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MjAzNjMsImV4cCI6MjA2MjM5NjM2M30.qECAfKvkEC0ra7w2r2-wA_ryesC8iNulrnAiJUbq00w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
