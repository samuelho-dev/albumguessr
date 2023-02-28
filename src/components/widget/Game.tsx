/* eslint-disable @next/next/no-img-element */
import gameOptions from '../../../utils/gameOptions';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
  options: any;
  fetchQuestion: Function;
}

export default function Game({ options, fetchQuestion }: Props) {
  const [answerSelected, setAnswerSelected] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  useEffect(() => {
    if (correctAnswer) {
      console.log('correct answer!');
    }
  }, [correctAnswer]);

  const handleAnswerSelect = (track) => {
    if (track.answer) handleCorrectAnswer();
    fetchQuestion();
    setAnswerSelected(!answerSelected);
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswer(!correctAnswer);
  };

  return (
    <div className="game-container">
      {correctAnswer
        ? options.map((track, i) => (
            <div
              key={i}
              onClick={() => handleAnswerSelect(track)}
              className="game-option"
            >
              <h4>
                {track.name}
                {`${track.answer ? ` : Answer` : null}`}
              </h4>

              <img
                className="album-art-container"
                src={track.images[0].url}
                alt="option img"
              ></img>
            </div>
          ))
        : null}
    </div>
  );
}
