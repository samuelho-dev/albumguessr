import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
};

export default NextAuth(authOptions);
