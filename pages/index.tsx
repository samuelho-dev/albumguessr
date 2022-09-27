import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div id="root">
      <Head>
        <title>Album Guessing Game</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="base-root">
        <Navbar />
        <SideBar />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
