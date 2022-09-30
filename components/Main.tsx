import { useSession } from "next-auth/react";
import { useState } from "react";

function Main() {
  const { data: session } = useSession();
  const [gameOptions, setGameOptions] = useState([]);
  const getGameOptions = async () => {
    const res = await fetch("/api/game-info");
    const { items } = await res.json();
    setGameOptions(items);
  };
  console.log(gameOptions);

  if (session) {
    getGameOptions();
    return (
      <div id="main">
        <div className="app-container">
          <div className="album-art-container">
            <img src="/" alt="/" />
          </div>
          <GameOptions gameOptions={gameOptions} />
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
