import React, { useState } from 'react';
import Image from 'next/image';
import spotifylogo from '../assets/Spotify_logo_without_text.svg';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import LoginModal from '@/login/LoginModal';

export default function LoginBtn() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const session = useSession();
  const supabase = createClient(
    'https://zpgfrsydbesdrcrxrdzx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwZ2Zyc3lkYmVzZHJjcnhyZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYyNDgxODIsImV4cCI6MTk5MTgyNDE4Mn0.vbUrguSaE_76w08wYtiOMbT06ds3f6U7N63iis5lPAw',
  );
  async function signout() {
    const { error } = await supabase.auth.signOut();
  }
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
          <button>Logout</button>
        </div>
      )}
    </>
  );
}
