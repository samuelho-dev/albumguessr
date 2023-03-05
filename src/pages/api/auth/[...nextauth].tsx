import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const scope = `
  streaming,
  user-read-email,
  user-read-private,
  user-library-read,
  user-library-modify,
  user-read-playback-state,
  user-modify-playback-state`;

interface MyToken {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  user?: any;
  error?: any;
  expires_at: number;
}

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
    // console.log(token, 'refresh token');
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    } as MyToken;
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
        token.accessToken = account.access_token;
        return {
          accessToken: account.access_token,
          accessTokenExpires: token.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < Number(token.expires_at)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
    async signIn({ user, account }) {
      console.log({ user: user, account: account });
      const { id, name, email, image } = user;
      // console.log('user', user);
      try {
        await prisma.user.upsert({
          where: { id },
          create: {
            id: id,
            name: name,
            email: email,
            image: image,
            leaderboard: {
              create: { score: 0 },
            },
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
              },
            },
          },

          update: {
            // accounts: {
            //   refresh_token: account.refresh_token,
            // },
          },
        });
      } catch (err) {
        console.error(err);
        return false;
      } finally {
        prisma.$disconnect();
      }
      return true;
    },
  },
});
