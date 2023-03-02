import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MySession } from '../../../types/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession<MySession>({ req });

  if (!session) {
    res.status(404);
  }
  const { correct } = JSON.parse(req.body);
  // console.log({ game_result: correct });
  try {
    if (correct) {
      await prisma.leaderboard.update({
        where: { user_id: session?.user?.id },
        data: {
          score: { increment: 1 },
        },
      });
    }
    await prisma.game.create({
      data: {
        user_id: session?.user?.id,
        correct: correct,
      },
    });
    res.status(200).send('Score updated successfully');
  } catch (err) {
    console.error(err);
    res.send(500);
  } finally {
    prisma.$disconnect();
  }
}
