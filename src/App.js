import React from "react";
import "./App.scss";
import GameBoard from "./GameBoard";
import Menu from "./Menu";

export default function App() {
  const items = [
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
  const [gameOver, setGameOver] = React.useState({ status: false, winner: "", step: 1 });

  const handleResetGame = () => {
    setReset(!reset);
    setGameOver({ status: false, winner: "", step: 1 });
  };
  const handleGameOver = (status, winner, step) => {
    console.log(gameOver);
    setGameOver({ status: status, winner: winner, step: step });
  };
  React.useEffect(() => {
    const log = () => {
      if (gameOver.status) {
        setTimeout(() => {
          console.log(gameOver);
          //Alert Modal Winner
          alert(gameOver.winner.toUpperCase());
          
        }, 300);
        setGameOver({ status: false, winner: "", step: 1 });
      }
    };
    log();
  }, [gameOver]);

  return (
    <>
      <main>
        <GameBoard reset={reset} SubmitReset={handleResetGame} items={items} handleGameOver={handleGameOver} gameOver={gameOver.status} />
      </main>
      <Menu resetGame={handleResetGame} />
    </>
  );
}
