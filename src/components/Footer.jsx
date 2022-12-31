import AudioPlayer from '../components/app/AudioPlayer';

function Footer() {
  return (
    <footer id='footer'>
      <div className='plug-container'>
        // github icon here
        <div className='footer-icon-description'>
          <p>Check out my other projects!</p>
        </div>
      </div>
      <AudioPlayer />
      //Share icon here
    </footer>
  );
}

export default Footer;
