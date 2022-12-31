import React from 'react';
import spotifylogo from '../../../public/imgs/Spotify_logo_without_text.svg';

export default function LoginBtn() {
  // const { data: session } = useSession();
  // console.log(session);

  // if (session) {
  //   return (
  //     <div>
  //       signed in as
  //       <br />
  //       <button onClick={() => signOut()}>sign out</button>
  //     </div>
  //   );
  // }
  return (
    <button
      className='spotify-btn-container'
      placeholder='blur'
      onClick={() => signIn()}
    >
      <div className='spotify-inner'>
        <h4>Log In with Spotify</h4>
        <img className='spotify-btn' alt='spotify' src={spotifylogo} />
      </div>
    </button>
  );
}
