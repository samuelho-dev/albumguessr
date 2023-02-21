import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';

import SpotifyProvider from 'next-auth/providers/spotify';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '~/env.mjs';
import { prisma } from '~/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: any;
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.accessToken = token.accessToken;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-playback-state,user-modify-playback-state,playlist-read-private,user-library-modify,user-read-email,streaming,user-library-read',
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

// import NextAuth from 'next-auth';
// import SpotifyProvider from 'next-auth/providers/spotify';

// export default NextAuth({
//   providers: [
//     SpotifyProvider({
//       authorization:
//         'https://accounts.spotify.com/authorize?scope=user-read-playback-state,user-modify-playback-state,playlist-read-private,user-library-modify,user-read-email,streaming,user-library-read',
//       clientId: process.env.SPOTIFY_CLIENT_ID!,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
//     }),
//   ],
// callbacks: {
//   async jwt({ token, account }) {
//     if (account) {
//       token.accessToken = account.refresh_token;
//     }
//     return token;
//   },
//   async session({ session, token, user }) {
//     session.accessToken = token.accessToken;
//     console.log(token);
//     session.user = user;
//     return session;
//   },
// },
// });
