import type { NextPage } from 'next';
import Head from 'next/head';
import Main from '../components/layout/Main';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/Sidebar';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';

interface Props {
  //THEME
  theme: string;
  setTheme: Function;
}

const Home: NextPage<Props> = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme('dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const search = useQuery(['search'], () =>
    fetch('/api/spotifySearch').then((res) => res.json()),
  );

  if (!mounted) null;

  const answerTrack = search?.data?.find(
    (option: { answer: any }) => !!option.answer,
  );

  return (
    <div id="root">
      <Head>
        <title>Album Guessing Game</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="base-root">
        <Navbar theme={theme!} setTheme={setTheme} />
        <SideBar />
        <Main searchLoading={search.isLoading} searchData={search.data} />
        <Footer answerTrack={answerTrack} />
      </div>
    </div>
  );
};

export default Home;
