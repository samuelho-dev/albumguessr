import React from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface Modal {
  showLoginModal: boolean;
  setShowLoginModal: Function;
}

export default function LoginModal(Modal: Modal) {
  const supabase = useSupabaseClient();
  return (
    <>
      {Modal.showLoginModal ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max-content',
            zIndex: '12',
            background: 'black',
            padding: '3rem',
          }}
        >
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={['spotify']}
          />
        </div>
      ) : null}
    </>
  );
}
