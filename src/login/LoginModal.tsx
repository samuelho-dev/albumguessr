import React from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createPortal } from 'react-dom';

interface Modal {
  showLoginModal: boolean;
  setShowLoginModal: Function;
}

export default function LoginModal(Modal: Modal) {
  const supabase = useSupabaseClient();
  return (
    <div>
      {Modal.showLoginModal ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max-content',
            zIndex: '12',
          }}
        >
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        </div>
      ) : null}
    </div>
  );
}
