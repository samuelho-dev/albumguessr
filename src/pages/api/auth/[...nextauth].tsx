import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scope = `user-read-recently-played user-read-playback-state 
user-top-read user-modify-playback-state user-read-currently-playing  
user-read-email user-read-private user-library-read`;

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: { scope },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
