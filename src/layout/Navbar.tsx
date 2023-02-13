import LoginBtn from '../components/LoginBtn';

// interface Props {
//   //THEME
//   theme: string;
//   setTheme: Function;
// }

function Navbar() {
  return (
    <nav id="navbar">
      <div className="navbar-container">
        <h1>Album Guessing Game</h1>
        <div className="navbtn-container">
          {/* <ThemeSwitch theme={props.theme} setTheme={props.setTheme} /> */}
          <LoginBtn />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
