import { IconContext } from 'react-icons';
import { VscGithub } from 'react-icons/vsc';
import { FaRegShareSquare } from 'react-icons/fa';
import AudioPlayer from '../widget/AudioPlayer';
interface Props {
  answerTrack: any;
}
function Footer({ answerTrack }: Props) {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <footer id="footer">
        <div className="plug-container">
          <VscGithub />
          <div className="footer-icon-description">
            <p>Check out my other projects!</p>
          </div>
        </div>
        <AudioPlayer answerTrack={answerTrack} />
        <FaRegShareSquare />
      </footer>
    </IconContext.Provider>
  );
}

export default Footer;
