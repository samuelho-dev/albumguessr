import type { NextPage } from 'next';
import Head from 'next/head';
import Main from '../components/layout/Main';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/Sidebar';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';
import { io } from 'socket.io-client';

interface Props {
  //THEME
  theme: string;
  setTheme: Function;
}

let socket;

const Home: NextPage<Props> = () => {
  const { theme, setTheme } = useTheme();
  const [fetchNewGame, setFetchNewGame] = useState(false);

  useEffect(() => {
    setTheme('dark');
    setFetchNewGame(!fetchNewGame);
    socketInitializer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });
  };

  const search = useQuery(
    ['search'],
    () =>
      fetch('/api/spotifySearch')
        .then((res) => {
          fetchQuestion();
          return res.json();
        })
        .catch((err) => console.error(err)),
    { enabled: fetchNewGame },
  );

  const fetchQuestion = () => setFetchNewGame(!fetchNewGame);

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
        <Main
          searchLoading={search.isLoading}
          searchData={search.data}
          fetchQuestion={fetchQuestion}
        />
        <Footer answerTrack={answerTrack} />
      </div>
    </div>
  );
};

export default Home;
