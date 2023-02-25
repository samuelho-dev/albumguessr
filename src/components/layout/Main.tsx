import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession, signIn } from 'next-auth/react';
import Game from '../../lib/Game';

// Access token in session.user.accessToken
function Main() {
  const { data: session } = useSession();

  const { data, error, isLoading } = useQuery(['search'], () =>
    fetch('/api/spotify').then((res) => res.json()),
  );

  useEffect(() => {
    if (data?.error?.message === 'The access token expired') {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [data]);

  console.log(data, 'front end');
  if (session) {
    if (isLoading) {
      return (
        <div id="main">
          <span>Loading...</span>
        </div>
      );
    }
    if (error) <span>{data.error.message}</span>;
    return (
      <div id="main">
        <div className="app-container">
          <div className="album-art-container">
            <img src="/" alt="/" />
          </div>
          <Game options={data.albums} />
        </div>
      </div>
    );
  }
  return (
    <div id="main">
      <div className="app-container">
        <h1>Please Sign In</h1>
      </div>
    </div>
  );
}

export default Main;
