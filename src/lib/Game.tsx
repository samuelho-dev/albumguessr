import obj from '../../utils/fakedata';
import gameOptions from '../../utils/gameOptions';
import Image from 'next/image';

export default function Game({ options }) {
  const optionsArr = gameOptions(options.items);
  console.log(optionsArr);
  return (
    <div>
      {optionsArr.map((track, i) => (
        <div key={i}>
          <h5>{track.name}</h5>
          <img
            src={track.images[0].url}
            alt="option img"
            width={100}
            height={100}
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
