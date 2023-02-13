import {
  useUser,
  useSupabaseClient,
  useSession,
} from '@supabase/auth-helpers-react';

import { useState } from 'react';

function Main() {
  const session = useSession();
  const [gameOptions, setGameOptions] = useState([]);

  return (
    <div id="main">
      {!session ? (
        <div className="app-container">
          <div className="album-art-container">
            <img src="/" alt="/" />
          </div>
          <GameOptions />
        </div>
      ) : (
        <div className="app-container">
          <h1>Please Sign In</h1>
        </div>
      )}
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
