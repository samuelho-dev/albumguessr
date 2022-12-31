function Main() {
  // if (session) {
  //   getGameOptions();
  //   return (
  //     <div id="main">
  //       <div className="app-container">
  //         <div className="album-art-container">
  //           <img src="/" alt="/" />
  //         </div>
  //         <GameOptions />
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div id='main'>
      <div className='app-container'>
        <h1>Please Sign In</h1>
      </div>
    </div>
  );
}

export default Main;

function GameOptions() {
  return (
    <div className='game-options-container'>
      <div>gameOption</div>
      <div>gameOption</div>
      <div>gameOption</div>
      <div>gameOption</div>
    </div>
  );
}
