import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

function Main() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div id="main">
        <div className="app-container">
          <div className="album-art-container">
            <Image src="" alt="" />
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
      <Image src="" alt="" />
      <Image src="" alt="" />
      <Image src="" alt="" />
      <Image src="" alt="" />
    </div>
  );
}
