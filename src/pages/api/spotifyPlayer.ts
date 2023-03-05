import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { MySession } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  console.log(token, 'token');
  if (!token) {
    res.status(404);
  }

  //BODY ={ endpoint: 'pause', uri: 'spotify:album:6bfrlCHzoneiMotyuHAsFE' }

  const body = JSON.parse(req.body);
  // console.log({ body: body, token: token?.user, method: req.method });
  try {
    fetch(`https://api.spotify.com/me/player/${body.endpoint}`, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${token}`,
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
