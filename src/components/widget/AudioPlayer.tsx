import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { MySession } from '../../../types/types';

interface Props {
  answerTrack: any;
  uris: any;
  index: number;
  theme: string;
}

const lightAudioStyle = {
  color: 'black',
  bgColor: 'white',
  trackNameColor: 'black',
  trackArtistColor: 'black',
};

const darkAudioStyle = {
  color: 'white',
  bgColor: 'black',
  trackNameColor: 'white',
  trackArtistColor: 'white',
};

const SpotifyPlayer = dynamic(() => import('react-spotify-web-playback'), {
  ssr: false,
});

function AudioPlayer({ answerTrack, uris, index, theme }: Props) {
  const [playerState, setPlayerState] = useState<boolean>(false);
  const [spotifyToken, setSpotifyToken] = useState<string>();
  const [playerStyle, setPlayerStyle] = useState(darkAudioStyle);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      setSpotifyToken(session.accessToken as string);
    }
  }, [session]);

  useEffect(() => {
    console.log(theme, 'audio');
    if (theme === 'light') {
      console.log(lightAudioStyle, 'light');
      setPlayerStyle(lightAudioStyle);
    } else if (theme === 'dark') {
      console.log(darkAudioStyle, 'dark');
      setPlayerStyle(darkAudioStyle);
    }
  }, [theme]);

  const mutation = useMutation({
    mutationFn: (endpoint: string) => {
      return fetch(`/api/spotifyPlayer`, {
        method: 'PUT',
        body: JSON.stringify({
          endpoint: endpoint,
          uri: answerTrack.uri,
        }),
      });
    },
    onSuccess: (data) => {
      // console.log(data, 'onsuccess');
      setPlayerState(!playerState);
    },
  });

  const togglePlayPause = () => {
    if (answerTrack) {
      const endpoint = !playerState ? 'play' : 'pause';
      mutation.mutate(endpoint);
    }
  };
  // console.log({ uris: uris, loc: uris[index], index: index });
  return (
    <div className="audio-player-container">
      {spotifyToken && uris[index] && (
        <SpotifyPlayer
          uris={uris[index].uri}
          hideAttribution={true}
          hideCoverArt={true}
          styles={playerStyle}
          layout={'compact'}
          token={spotifyToken}
        />
      )}
    </div>
  );
}

// <div className="audio-btn-container">
//   <RiSkipBackFill color="#B2B3B2" className="forwardbackwardbtn" />
//   <button className="playpausebtn" onClick={togglePlayPause}>
//     {!playerState ? <GoPlay /> : <MdPauseCircleFilled />}
//   </button>
//   <RiSkipForwardFill color="#B2B3B2" className="forwardbackwardbtn" />
// </div>
// <div className="audio-prog-container">
//   {/* Current time */}
//   <div>
//     <p>0:00</p>
//   </div>
//   {/* Progress Bar */}
//   <div className="playrange">
//     <input type="range" className="range" />
//   </div>
//   {/* Duration */}
//   <div>
//     <p>1:00</p>
//   </div>
// </div>
export default AudioPlayer;
