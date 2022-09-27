import Image from "next/image";
import spotifylogo from "../public/imgs/Spotify_logo_without_text.svg";

function Navbar() {
  return (
    <nav id="navbar">
      <div className="navbar-container">
        <h1>Album Guessing Game</h1>
        <div className="navbtn-container">
          <div className="theme-btn" placeholder="blur">
            <div className="theme-circle"></div>
          </div>
          <button className="spotify-btn-container" placeholder="blur">
            <div className="spotify-inner">
              <h4>Log In with Spotify</h4>
              <div className="spotify-btn">
                <Image alt="spotify" src={spotifylogo} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
