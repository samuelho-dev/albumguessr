import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import getRandom from '../../../utils/getRandom';
import { useSession } from 'next-auth/react';

// Access token in session.user.accessToken
function Main() {
  const { data: session } = useSession();
  const [searchResults, setSearchResults] = useState({});
  const accessToken = session?.user?.accessToken;
  const query = {
    q: getRandom(1, 20, true),
    type: 'track',
    limit: getRandom(1, 10, false),
    offset: getRandom(1, 10, false),
    include_external: 'audio',
  };

  const { data, error, isLoading } = useQuery('search', () =>
    // fetch(
    //   `https://api.spotify.com/v1/search
    //   ?q=${query.q}&type=${query.type}
    //   &market=ES&limit=${query.limit}&offset=${query.offset}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json()),
  );

  console.log(data, 'data');
  console.log(accessToken, 'token');

  if (session) {
    return (
      <div id="main">
        <div className="app-container">
          <div className="album-art-container">
            <img src="/" alt="/" />
          </div>
          <GameOptions />
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

function GameOptions() {
  return (
    <div className="game-options-container">
      <div>gameOption</div>
      <div>gameOption</div>
      <div>gameOption</div>
      <div>gameOption</div>
    </div>
  );
}
