import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  try {
    const leaderboard = await prisma.leaderboard.findMany({
      take: 20,

      orderBy: {
        score: 'desc',
      },
      select: {
        user: true,
        score: true,
      },
    });
    console.log(leaderboard, 'HERE');
    return res.status(200).send(leaderboard);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  } finally {
    prisma.$disconnect();
  }
}
