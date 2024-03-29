import type { NextPage } from 'next';
import Head from 'next/head';
import Main from '../components/layout/Main';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/Sidebar';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

interface Props {
  //THEME
  theme: string;
  setTheme: Function;
}

const Home: NextPage<Props> = () => {
  const { theme, setTheme } = useTheme();
  const [fetchNewGame, setFetchNewGame] = useState(false);
  const [uris, setUri] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTheme('dark');
    setFetchNewGame(!fetchNewGame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = useQuery(
    ['search'],
    () =>
      fetch('/api/spotifySearch')
        .then((res) => res.json())
        .then((data) => {
          setFetchNewGame(!fetchNewGame);
          const copy = [...uris];
          const answerTrack = data.find(
            (option: { answer: any }) => !!option.answer,
          ) as null;
          if (answerTrack) {
            copy.push(answerTrack);
          }
          // console.log('index', copy);
          setUri(copy);
          return data;
        })

        .catch((err) => console.error(err)),
    { enabled: fetchNewGame },
  );

  const answerTrack = search?.data?.find(
    (option: { answer: any }) => !!option.answer,
  );
  const fetchQuestion = () => {
    setFetchNewGame(!fetchNewGame);
    setIndex(index + 1);
  };
  if (search.error) return <div>nope</div>;

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
          answerTrack={answerTrack}
          fetchQuestion={fetchQuestion}
        />
        <Footer
          answerTrack={answerTrack}
          uris={uris}
          index={index}
          theme={theme!}
        />
      </div>
    </div>
  );
};

export default Home;
