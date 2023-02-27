import { getSession } from 'next-auth/react';
import getRandom from '../../../utils/getRandom';
import { MySession } from '../../../types/types';
import gameOptions from '../../../utils/gameOptions';

export default async function handler(
  req: any,
  res: { status: (arg0: number) => void; send: (arg0: any) => any },
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(404);
  }
  const query = {
    q: getRandom(1, 3, true),
    offset: getRandom(1, 15, false),
  };

  try {
    fetch(
      `https://api.spotify.com/v1/search?q=${query.q}&type=album&market=ES&limit=5&offset=${query.offset}`,
      {
        headers: {
          Authorization: `Bearer ${(<MySession>session)?.user?.accessToken}`,
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
