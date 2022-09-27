import { IconContext } from "react-icons";
import { VscGithub } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import AudioPlayer from "../components/app/AudioPlayer";

function Footer() {
  return (
    <IconContext.Provider value={{ color: "white", className: "react-icons" }}>
      <footer id="footer">
        <div className="plug-container">
          <VscGithub />
          <div className="footer-icon-description">
            <p>Check out my other projects!</p>
          </div>
        </div>
        <AudioPlayer />
        <FaRegShareSquare />
      </footer>
    </IconContext.Provider>
  );
}

export default Footer;
