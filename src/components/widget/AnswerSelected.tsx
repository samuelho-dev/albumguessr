import React from 'react';

interface Props {
  selectedTrack: any;
  handleOptionSelected: Function;
}

function AnswerSelected({ handleOptionSelected, selectedTrack }: Props) {
  return (
    <div onClick={() => handleOptionSelected()}>
      <h2>{selectedTrack.name}</h2>
      <div>
        {selectedTrack.artists.map((artist, i) => (
          <a key={i} href={selectedTrack.href}>
            <p>{artist.name}</p>
          </a>
        ))}
      </div>
      <img
        className="album-art-container"
        src={selectedTrack.images[0].url}
        alt="option img"
      ></img>
      <sub>Released : {selectedTrack.release_date}</sub>
    </div>
  );
}

export default AnswerSelected;
