import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scope = `user-read-recently-played user-read-playback-state 
user-top-read user-modify-playback-state user-read-currently-playing  
user-read-email user-read-private user-library-read`;

async function refreshAccessToken(token: any) {
  try {
    const url = 'https://accounts.spotify.com/api/token';

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString('base64')}`,
      },
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();
    console.log(token, 'refresh token');
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

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
    async jwt({ token, user, account }) {
      // console.log({ token: token.exp, date: Date.now() }, 'JWT');
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: token.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.expires_at) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});

// await prisma.account.upsert({
//   where: { id: user.id },
//   update: { refresh_token: account.refresh_token },
//   create: {
//     userId: user.id,
//     type: account.type,
//     provider: account.provider,
//     providerAccountId: account.providerAccountId,
//     refresh_token: account.refresh_token,
//     access_token: account.access_token,
//     expires_at: account.expires_at,
//     token_type: account.token_type,
//     scope: account.scope,
//   },
// });
