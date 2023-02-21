import axios from 'axios';
import { useState, useEffect } from 'react';

function Main() {
  const [user, setUser] = useState(false);
  return (
    <div id="main">
      {!user ? (
        <div className="app-container">
          <h1>Please Sign In</h1>
        </div>
      ) : (
        <div className="app-container">
          <button>WHERE</button>
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
