import React from 'react';

interface Props {
  correct: boolean;
  answerTrack: any;
  handleOptionSelected: Function;
}

function AnswerSelected({ handleOptionSelected, answerTrack, correct }: Props) {
  return (
    <div onClick={() => handleOptionSelected()} className="selected-answer">
      <h1>{correct ? 'Correct!' : 'Not Quite'}</h1>
      <h2>{answerTrack.name}</h2>
      <div>
        <div>
          <img
            className="album-art-container"
            src={answerTrack.images[0].url}
            alt="option img"
          ></img>
          <p>Released : {answerTrack.release_date}</p>
        </div>

        {answerTrack.artists.map((artist, i) => (
          <a key={i} href={answerTrack.href}>
            <span>{artist.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default AnswerSelected;
