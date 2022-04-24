import * as dotenv from 'dotenv';

import { createClient } from '@supabase/supabase-js';

export const getClient = () => {
  const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;
  dotenv.config();

  if (!DATABASE_URL || !SUPABASE_SERVICE_API_KEY) {
    throw new Error('Missing environment variables');
  }

  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

  return supabase;
};
