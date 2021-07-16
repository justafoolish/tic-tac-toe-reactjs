import React from "react";
import "./App.scss";
import GameBoard from "./GameBoard";
import Menu from "./Menu";

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
  const [gameOver, setGameOver] = React.useState({ status: false, winner: "" });

  const handleResetGame = () => {
    setReset(!reset);
    setGameOver({ status: false, winner: "" });
  };
  const handleGameOver = (status, winner) => {
    console.log(gameOver);
    setGameOver({ status: status, winner: winner });
  };
  React.useEffect(() => {
    const log = () => {
      if (gameOver.status) {
        setTimeout(() => {
          console.log(gameOver);
          //Alert Modal Winner
          //alert(gameOver.winner.toUpperCase());
        }, 300);
        setGameOver({ status: false, winner: "" });
      }
    };
    log();
  }, [gameOver]);

  return (
    <>
      <div className="container">
        <div className="grid--wrapper">
          <div className="victory">
            <div className="victory--x"></div>
            <div className="victory--o"></div>
          </div>

          <GameBoard reset={reset} SubmitReset={handleResetGame} listItem={listItem} handleGameOver={handleGameOver} gameOver={gameOver.status} />
        </div>
      </div>
      <Menu resetGame={handleResetGame} />
    </>
  );
}
