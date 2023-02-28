import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Game from '../widget/Game';

// Access token in session.user.accessToken
interface Props {
  searchLoading: boolean;
  searchData: any;

  fetchQuestion: Function;
}
function Main({
  searchLoading,
  searchData,
  fetchQuestion,
  answerTrack,
}: Props) {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(searchData, 'data');
    if (searchData?.error?.message === 'The access token expired') {
      signIn();
    }
  }, [searchData, session]);

  if (session) {
    return (
      <div id="main">
        {searchLoading ? <span>Loading...</span> : null}
        {searchData ? (
          <div className="app-container">
            <Game options={searchData} fetchQuestion={fetchQuestion} />
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div id="main">
      <div className="app-container">
        <h1>Please Sign In</h1>
      </div>
    </div>
  );
}

export default Main;
