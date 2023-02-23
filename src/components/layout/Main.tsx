import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { api } from '~/utils/api';

function Main() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<Record<string, unknown>>({});

  const useTracks = () => {
    return api.getTracks.useQuery();
  };

  const { data: tracksData, isLoading: tracksLoading } = useTracks();

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
