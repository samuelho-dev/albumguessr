import { useState } from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SideBar from './components/Sidebar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='base-root'>
      <Navbar />
      <SideBar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
