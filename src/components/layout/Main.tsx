import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession, signIn } from 'next-auth/react';
import Game from '../widget/Game';

// Access token in session.user.accessToken
function Main() {
  const { data: session } = useSession();

  const { data, error, isLoading } = useQuery(['search'], () =>
    fetch('/api/spotifySearch').then((res) => res.json()),
  );

  // const spotifyUser = useQuery(['me'], () =>
  //   fetch('/api/spotifyUser').then((res) => res.json()),
  // );

  useEffect(() => {
    console.log(data, 'data');
    if (data?.error?.message === 'The access token expired') {
      signIn();
    }
  }, [data, session]);

  if (session) {
    return (
      <div id="main">
        {isLoading ? <span>Loading...</span> : null}
        {error ? <span>Error!</span> : null}
        {data ? (
          <div className="app-container">
            <Game options={data} />
          </div>
        ) : null}
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
