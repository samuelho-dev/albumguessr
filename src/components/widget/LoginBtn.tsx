import React from 'react';
import Image from 'next/image';
import spotifylogo from '../../../public/imgs/spotifylogo.svg';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Session } from '../../../types/types';

export default function LoginBtn() {
  const { data: session } = useSession<Session>();

  if (session) {
    return (
      <div>
        {`signed in as ${session.user?.name}`}
        <br />
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <button
      className="spotify-btn-container"
      placeholder="blur"
      onClick={() => signIn('spotify')}
    >
      <div className="spotify-inner">
        <h4>Log In with Spotify</h4>
        <div className="spotify-btn">
          <Image alt="spotify" src={spotifylogo} />
        </div>
      </div>
    </button>
  );
}
