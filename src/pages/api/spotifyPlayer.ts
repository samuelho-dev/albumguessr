import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MySession } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(404);
  }

  //BODY ={ endpoint: 'pause', uri: 'spotify:album:6bfrlCHzoneiMotyuHAsFE' }

  const body = JSON.parse(req.body);
  // console.log({ body: body, session: session?.user, method: req.method });
  try {
    fetch(`https://api.spotify.com/me/player/${body.endpoint}`, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        context_uri: body.uri,
      }),
    })
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
