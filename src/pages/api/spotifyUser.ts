import { NextApiRequest, NextApiResponse } from 'next';
import { MySession } from '../../../types/types';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const prisma = new PrismaClient();

  if (!token) {
    res.status(404);
  }

  try {
    fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
