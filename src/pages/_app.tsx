import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';

import '../styles/css/index.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
