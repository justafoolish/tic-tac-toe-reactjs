import React from "react";
import "./App.scss";
import GameBoard from "./GameBoard";
import Menu from "./Menu";

export default function App() {
  const [reset, setReset] = React.useState(false);
  const handleResetGame = () => {
    setReset(!reset)
  };

  return (
    <>
      <main>
        <GameBoard reset={reset} SubmitReset={handleResetGame} />
      </main>
      <Menu resetGame={handleResetGame} />
    </>
  );
}
