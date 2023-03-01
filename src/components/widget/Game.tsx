/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AnswerSelected from './AnswerSelected';
import { useQuery } from '@tanstack/react-query';

interface Props {
  options: any;
  fetchQuestion: Function;
}

export default function Game({ options, fetchQuestion }: Props) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);

  const handleAnswerSelect = (track: any) => {
    let answer = false;
    setSelectedTrack(track);
    handleOptionSelected();
    fetchQuestion();
    if (track.answer) {
      answer = true;
    }
    fetch('/api/gameResults', {
      method: 'PUT',
      body: JSON.stringify({ correct: answer }),
    });
  };

  const handleOptionSelected = () => setOptionSelected(!optionSelected);

  return (
    <div className="game-container">
      {!optionSelected ? (
        options.map((track: any, i: number) => (
          <div
            key={i}
            onClick={() => handleAnswerSelect(track)}
            className="game-option"
          >
            <h4>
              {track.name}
              {track.answer ? ` : Answer` : null}
            </h4>

            <img
              className="album-art-container"
              src={track.images[0].url}
              alt="option img"
            ></img>
          </div>
        ))
      ) : (
        <AnswerSelected
          handleOptionSelected={handleOptionSelected}
          selectedTrack={selectedTrack}
        />
      )}
    </div>
  );
}
