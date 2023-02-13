import { useUser, useSession } from '@supabase/auth-helpers-react';

import { useState } from 'react';
const baseUrl = `https://api.spotify.com/v1`;
const curProfile = `me`;

function Main() {
  const [userProf, setUserProf] = useState({});
  const session = useSession();

  const spotifyApi = async () => {
    try {
      const res = await fetch(`${baseUrl}/${curProfile}`);
      const data = await res.json();
      setUserProf(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userProf);
  return (
    <div id="main">
      {!session ? (
        <div className="app-container">
          <h1>Please Sign In</h1>
        </div>
      ) : (
        <div className="app-container">
          <button onClick={() => spotifyApi()}>WHERE</button>
          <div>gameOption</div>
          <GameOptions />
        </div>
      )}
    </div>
  );
}

export default Main;

function GameOptions() {
  return (
    <div className="game-options-container">
      <div className="album-art-container">
        <img src="/" alt="/" />
      </div>
      <div className="album-art-container">
        <img src="/" alt="/" />
      </div>
      <div className="album-art-container">
        <img src="/" alt="/" />
      </div>
      <div className="album-art-container">
        <img src="/" alt="/" />
      </div>
    </div>
  );
}
