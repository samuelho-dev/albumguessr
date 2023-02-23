import { z } from 'zod';
import getRandom from '~/utils/getRandom';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';

export const Router = createTRPCRouter({
  getTracks: publicProcedure.query(() => {
    const params = {
      q: getRandom(1, 20, true),
      offset: getRandom(1, 10, false),
    };
    const url = `https://api.spotify.com/v1/search?include_external=audio&type=track`;
    const options = {
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`, // use the accessToken from the user's session
      },
    };

    return fetch(url, options).then((response) => {
      console.log(response.json());
    });
  }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    // return ctx.prisma.albumgame.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
