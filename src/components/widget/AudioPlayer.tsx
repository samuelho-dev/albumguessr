import { RiSkipForwardFill } from 'react-icons/ri';
import { RiSkipBackFill } from 'react-icons/ri';
import { GoPlay } from 'react-icons/go';
import { MdPauseCircleFilled } from 'react-icons/md';
import React, { useState, useRef } from 'react';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  //References
  const audioPlayer = useRef();

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      // console.log("audioPlayer.current.play();");
    }
  };

  return (
    <div className="audio-player-container">
      {/* <audio ref={audioPlayer} src="/"></audio> */}
      <div className="audio-btn-container">
        <button className="forwardbackwardbtn">
          <RiSkipBackFill color="#B2B3B2" />
        </button>
        <button className="playpausebtn" onClick={togglePlayPause}>
          {isPlaying ? <MdPauseCircleFilled /> : <GoPlay />}
        </button>
        <button className="forwardbackwardbtn">
          <RiSkipForwardFill color="#B2B3B2" />
        </button>
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
      <audio src="/"></audio>
    </div>
  );
}

export default AudioPlayer;
