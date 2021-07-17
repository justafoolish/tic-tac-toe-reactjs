import React from "react";
import "./App.scss";
import GameBoard from "./GameBoard";
import Menu from "./Menu";
import ScoreBoard from "./ScoreBoard";

export default function App() {
  const listItem = [
    { id: 1, status: "" },
    { id: 2, status: "" },
    { id: 3, status: "" },
    { id: 4, status: "" },
    { id: 5, status: "" },
    { id: 6, status: "" },
    { id: 7, status: "" },
    { id: 8, status: "" },
    { id: 9, status: "" },
  ];
  const [reset, setReset] = React.useState(false);
  const [scoreboard, setScoreboard] = React.useState([0, 0, 0]);
  const [pvpMode, setPvpMode] = React.useState(true);

  const handleResetGame = () => {
    setReset(!reset);
  };
  const handleGameMode = (gameMode) => {
    if(gameMode !== pvpMode) {
      setPvpMode(gameMode)
      setReset(true)
      setScoreboard([0,0,0])
    }
  }

  const handleScoreBoard = (resultGame) => {
    if (resultGame === "x") {
      let newScoreBoard = [...scoreboard];
      newScoreBoard[0] = newScoreBoard[0] + 1;
      setScoreboard(newScoreBoard);
    } else if (resultGame === "o") {
      let newScoreBoard = [...scoreboard];
      newScoreBoard[1] = newScoreBoard[1] + 1;
      setScoreboard(newScoreBoard);
    } else if (resultGame === "tie") {
      let newScoreBoard = [...scoreboard];
      newScoreBoard[2] = newScoreBoard[2] + 1;
      setScoreboard(newScoreBoard);
    }
  };

  return (
    <>
      <div className="container">
        <div className="grid--wrapper">
          <GameBoard reset={reset} SubmitReset={handleResetGame} listItem={listItem} updateScoreBoard={handleScoreBoard} pvpMode={pvpMode}/>
        </div>
        <ScoreBoard scoreboard={scoreboard} pvpMode={pvpMode} />
      </div>
      <Menu resetGame={handleResetGame} onSubmit={handleGameMode}/>
    </>
  );
}
