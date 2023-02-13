import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://zpgfrsydbesdrcrxrdzx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwZ2Zyc3lkYmVzZHJjcnhyZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYyNDgxODIsImV4cCI6MTk5MTgyNDE4Mn0.vbUrguSaE_76w08wYtiOMbT06ds3f6U7N63iis5lPAw',
);

export default supabase;
