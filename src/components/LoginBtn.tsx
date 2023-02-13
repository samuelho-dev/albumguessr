import React, { useState } from 'react';
import Image from 'next/image';
import spotifylogo from '../assets/Spotify_logo_without_text.svg';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import LoginModal from '@/login/LoginModal';

export default function LoginBtn() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const supabase = useSupabaseClient();
  const session = useSession();

  return (
    <>
      {!session ? (
        <>
          <button
            className="spotify-btn-container"
            placeholder="blur"
            onClick={() => setShowLoginModal(!showLoginModal)}
          >
            <div className="spotify-inner">
              <h4>Log In with Spotify</h4>
              <div className="spotify-btn">
                <Image alt="spotify" src={spotifylogo} />
              </div>
            </div>
          </button>
          <LoginModal
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        </>
      ) : (
        <div>
          <h1>You are logged in</h1>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      )}
    </>
  );
}