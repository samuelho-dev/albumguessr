function SideBar() {
  return (
    <div id="sidebar">
      <h2>Leaderboard</h2>
      <Leaderboard />
    </div>
  );
}

export default SideBar;

function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <img src="/" alt="/" />
      <p>Username</p>
      <h5>Points</h5>
    </div>
  );
}
