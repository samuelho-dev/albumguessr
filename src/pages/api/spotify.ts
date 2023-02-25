import { getSession } from 'next-auth/react';
import getRandom from '../../../utils/getRandom';

export default function handler(req, res) {
  getSession({ req }).then((session) => {
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
            Authorization: `Bearer ${session.user?.accessToken}`,
          },
        },
      )
        .then((response) => response.json())
        .then((data) => res.send(data))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  });
}
