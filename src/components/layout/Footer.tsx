import { IconContext } from 'react-icons';
import { VscGithub } from 'react-icons/vsc';
import { FaRegShareSquare } from 'react-icons/fa';
import AudioPlayer from '../widget/AudioPlayer';
interface Props {
  answerTrack: any;
  uris: any;
  index: number;
}
function Footer({ answerTrack, uris, index }: Props) {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <footer id="footer">
        <a
          href="https://github.com/samuelho-dev"
          target="_blank"
          rel="noreferrer"
        >
          <div className="plug-container">
            <VscGithub />
            <div className="footer-icon-description">
              <p>Check out my other projects!</p>
            </div>
          </div>
        </a>
        <AudioPlayer answerTrack={answerTrack} uris={uris} index={index} />
        <FaRegShareSquare />
      </footer>
    </IconContext.Provider>
  );
}

export default Footer;
