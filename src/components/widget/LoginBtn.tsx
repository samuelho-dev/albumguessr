import React, { useEffect } from 'react';
import Image from 'next/image';
import spotifylogo from '../../../public/imgs/spotifylogo.svg';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

export default function LoginBtn() {
  const { data: session } = useSession();
  useEffect(() => {}, [session]);

  // console.log(spotify.data, 'login btn');
  if (session) {
    return (
      <div className="loggedin">
        <p>Welcome {session.user?.name}!</p>

        <button className="signout" onClick={() => signOut()}>
          <p>sign out</p>
        </button>
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
          <Image alt="spotify" src={spotifylogo} />
        </div>
      </div>
    </button>
  );
}
