import { RiSkipForwardFill } from 'react-icons/ri';
import { RiSkipBackFill } from 'react-icons/ri';
import { GoPlay } from 'react-icons/go';
import { MdPauseCircleFilled } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import SpotifyPlayer from './SpotifyPlayer';

interface Props {
  answerTrack: any;
}

function AudioPlayer({ answerTrack }: Props) {
  const { data: session } = useSession();
  const [playerState, setPlayerState] = useState<boolean>(false);
  const [volume, setVolume] = useState(50);
  const [currentTrack, setCurrentTrack] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect;

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
      console.log(data, 'onsuccess');
      setPlayerState(!playerState);
    },
  });

  const togglePlayPause = () => {
    if (answerTrack) {
      const endpoint = !playerState ? 'play' : 'pause';
      mutation.mutate(endpoint);
    }
  };

  return (
    <div className="audio-player-container">
      <div className="audio-btn-container">
        <RiSkipBackFill color="#B2B3B2" className="forwardbackwardbtn" />
        <button className="playpausebtn" onClick={togglePlayPause}>
          {!playerState ? <GoPlay /> : <MdPauseCircleFilled />}
          <SpotifyPlayer trackUri={answerTrack?.uri} />
        </button>
        <RiSkipForwardFill color="#B2B3B2" className="forwardbackwardbtn" />
      </div>
      <div className="audio-prog-container">
        {/* Current time */}
        <div>
          <p>0:00</p>
        </div>
        {/* Progress Bar */}
        <div className="playrange">
          <input type="range" className="range" />
        </div>
        {/* Duration */}
        <div>
          <p>1:00</p>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
