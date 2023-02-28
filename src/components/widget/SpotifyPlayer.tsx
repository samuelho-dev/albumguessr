import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
interface Props {
  trackUri: string;
}

function SpotifyPlayer({ trackUri }: Props) {
  const session = useSession();
  console.log(trackUri, session, 'spotify player');
  const [player, setPlayer] = useState<any>(null);
  useEffect(() => {
    if (!player) {
      // Initialize the Spotify Web Playback SDK
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = session.accessToken;
        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });
        setPlayer(player);
      };
    }
    console.log(player, 'player PLS LOG');
    // player.connect().then((success: any) => {
    //   if (success) {
    //     console.log('The Web Playback SDK successfully connected to Spotify!');
    //   }
    // });
  });

  return null;
}

export default SpotifyPlayer;
