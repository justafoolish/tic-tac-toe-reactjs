import React from "react";
import "./GameBoard.scss";
import BoardCard from "./../BoardCard";
import PropTypes from "prop-types";

GameBoard.propTypes = {
  reset: PropTypes.bool,
  SubmitReset: PropTypes.func,
  items: PropTypes.array.isRequired,
  handleGameOver: PropTypes.func,
};
GameBoard.defaultProps = {
  reset: false,
  SubmitReset: null,
  handleGameOver: null,
};

function GameBoard(props) {
  const { reset, SubmitReset, items, handleGameOver } = props;
  const [item, setItem] = React.useState(items);
  const [turn, setTurn] = React.useState(0);
  const [allowEnter, setAllowEnter] = React.useState(true);

  const handleNextTurn = (id, value) => {
    console.log(item);
    let newItems = [...items];
    const index = newItems.findIndex((box) => box.id === id);
    newItems[index].status = value;
    setItem(newItems);
    setTurn(turn + 1);
  };

  React.useEffect(() => {
    if (reset) {
      const resetBoard = async () => {
        setTurn(0);
        setItem(items);
        setAllowEnter(true);
      };
      resetBoard();
      SubmitReset();
    }
  }, [reset, SubmitReset, items]);

  React.useEffect(() => {
    const checkGame = (value) => {
      const winningCondition = value.repeat(3);
      for (let i = 0; i < 9; i += 3) {
        let checkItem = `${item[i].status}${item[i + 1].status}${item[i + 2].status}`;
        if (checkItem === winningCondition) return true;
      }
      for (let i = 0; i < 3; i++) {
        let checkItem = `${item[i].status}${item[i + 3].status}${item[i + 6].status}`;
        if (checkItem === winningCondition) return true;
      }
      if (`${item[0].status}${item[4].status}${item[8].status}` === winningCondition) return true;
      if (`${item[2].status}${item[4].status}${item[6].status}` === winningCondition) return true;

      return false;
    };
    const checkNull = () => {
      return item.some((item) => item.status === "");
    };

    const checkValue = turn % 2 === 0 ? "o" : "x";
    if (checkGame(checkValue)) {
      handleGameOver(true, checkValue + " Thắng", turn);
      setAllowEnter(false);
      setTurn(turn - 1);
    } else if (!checkNull()) {
      handleGameOver(true, "Hoà", turn);
      setTurn(0);
    }
  }, [turn, item, handleGameOver]);

  return (
    <div className="game-board">
      {console.log("rendered turn: " + turn)}
      {item.map((item) => (
        <BoardCard key={item.id} turn={turn} onSubmit={handleNextTurn} item={item} allowEnter={allowEnter} />
      ))}
    </div>
  );
}

export default GameBoard;
