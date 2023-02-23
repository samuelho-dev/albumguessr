import LoginBtn from '../widget/LoginBtn';
import ThemeSwitch from '../widget/ThemeSwitch';

interface Props {
  //THEME
  theme: string;
  setTheme: Function;
}

function Navbar(props: Props) {
  return (
    <nav id="navbar">
      <div className="navbar-container">
        <h1>Album Guessing Game</h1>
        <div className="navbtn-container">
          <ThemeSwitch theme={props.theme} setTheme={props.setTheme} />
          <LoginBtn />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
