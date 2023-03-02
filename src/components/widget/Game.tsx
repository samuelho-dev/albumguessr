/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AnswerSelected from './AnswerSelected';
import { useQuery } from '@tanstack/react-query';

interface Props {
  options: any;
  answerTrack: any;
  fetchQuestion: Function;
}

export default function Game({ options, fetchQuestion, answerTrack }: Props) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnswerSelect = (track: any) => {
    setSelectedTrack(answerTrack);
    let answer = false;

    handleOptionSelected();
    fetchQuestion();
    if (track.answer) {
      answer = true;
    }
    fetch('/api/gameResults', {
      method: 'PUT',
      body: JSON.stringify({ correct: answer }),
    });
    setCorrect(answer);
    console.log(correct, 'correct state');
  };

  const handleOptionSelected = () => setOptionSelected(!optionSelected);

  return (
    <>
      {!optionSelected ? (
        <div className="game-container">
          {options.map((track: any, i: number) => (
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
          ))}
        </div>
      ) : (
        <AnswerSelected
          correct={correct}
          handleOptionSelected={handleOptionSelected}
          answerTrack={selectedTrack}
        />
      )}
    </>
  );
}
