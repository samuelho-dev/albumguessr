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

      <img
        className="album-art-container"
        src={answerTrack?.images[0]?.url}
        alt="option img"
      ></img>

      <div className="answer-artist">
        {answerTrack.artists.map((artist: any, i: number) => (
          <>
            <a key={i} href={answerTrack.href}>
              <p>
                <ins>{artist.name}</ins>
                {i !== answerTrack.artists.length - 1 ? ', ' : null}
              </p>
            </a>
          </>
        ))}
      </div>
      <sub>Released : {answerTrack.release_date}</sub>
    </div>
  );
}

export default AnswerSelected;
