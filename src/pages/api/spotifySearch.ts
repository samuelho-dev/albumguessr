import { NextApiRequest, NextApiResponse } from 'next';
import getRandom from '../../../utils/getRandom';
import { MySession } from '../../../types/types';
import gameOptions from '../../../utils/gameOptions';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const token = session?.accessToken;
  if (!token) {
    res.status(404);
  }
  const query = {
    q: getRandom(1, 3, true),
    offset: getRandom(1, 15, false),
  };
  try {
    fetch(
      `https://api.spotify.com/v1/search?q=${query.q}&type=album&market=ES&limit=4&offset=${query.offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => gameOptions(data))
      .then((options) => res.send(options))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
