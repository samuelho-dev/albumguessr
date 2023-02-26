/* eslint-disable @next/next/no-img-element */
import gameOptions from '../../../utils/gameOptions';
import Image from 'next/image';

export default function Game({ options }) {
  return (
    <div>
      {options.map((track, i) => (
        <div key={i}>
          <h5>{track.name}</h5>
          {track.answer ? <p>Answer!</p> : null}
          <img
            className="album-art-container"
            src={track.images[0].url}
            alt="option img"
            width={200}
            height={200}
          ></img>
        </div>
        // <Image
        // src={track.images[0].url}
        // alt="option img"
        // width={track.images[0].width}
        // height={track.images[0].height}
        // />
      ))}
    </div>
  );
}
