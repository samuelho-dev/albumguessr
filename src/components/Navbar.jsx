import LoginBtn from './login/LoginBtn';

function Navbar() {
  return (
    <nav id='navbar'>
      <div className='navbar-container'>
        <h1>Album Guessing Game</h1>
        <div className='navbtn-container'>
          <LoginBtn />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
