import React from 'react';
import Image from 'next/image';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginBtn() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <div>
        signed in as
        <br />
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <button
      className="spotify-btn-container"
      placeholder="blur"
      onClick={() => signIn()}
    >
      <div className="spotify-inner">
        <h4>Log In with Spotify</h4>
        <div className="spotify-btn">
          {/* <Image alt="spotify" src={spotifylogo} /> */}
        </div>
      </div>
    </button>
  );
}
