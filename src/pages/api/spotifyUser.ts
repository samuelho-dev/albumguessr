import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MySession } from '../../../types/types';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const prisma = new PrismaClient();

  if (!session) {
    res.status(404);
  }

  try {
    fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${(<MySession>session)?.user?.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) =>
        prisma.user.upsert({
          where: { id: data.id },
          update: {},
          create: {
            id: data.id,
            name: data.display_name,
            email: data.email,
          },
        }),
      )
      .catch((err) => console.error(err));
  } catch (err) {
    res.status(500);
  }
}
