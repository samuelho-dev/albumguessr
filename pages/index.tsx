import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import LoginDisplay from "../components/LoginDisplay";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface Props {
  //THEME
  theme?: string;
  setTheme: Function;

  //LOGIN
  loginPrompt: boolean;
  setLoginPrompt: Function;
}
const Home: NextPage<Props> = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div id="root">
      <Head>
        <title>Album Guessing Game</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="base-root">
        <Navbar
          theme={theme}
          setTheme={setTheme}
          loginPrompt={loginPrompt}
          setLoginPrompt={setLoginPrompt}
        />
        {loginPrompt && <LoginDisplay />}
        <SideBar />
        <Main />
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
};

export default Home;
