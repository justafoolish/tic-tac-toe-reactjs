import React from "react";
import "./GameBoard.scss";
import BoardCard from "./../BoardCard";
import PropTypes from "prop-types";

GameBoard.propTypes = {
  reset: PropTypes.bool,
  SubmitReset: PropTypes.func,
  listItem: PropTypes.array.isRequired,
  updateScoreBoard: PropTypes.func,
};
GameBoard.defaultProps = {
  reset: false,
  SubmitReset: null,
  updateScoreBoard: null,
};

function GameBoard(props) {
  const { reset, SubmitReset, listItem, updateScoreBoard, pvpMode } = props;
  const [items, setItem] = React.useState(listItem);
  const [turn, setTurn] = React.useState(0);
  const [allowEnter, setAllowEnter] = React.useState(true);
  const [line, setLine] = React.useState([]);

  const handleNextTurn = (id, value) => {
    let newItems = [...items];
    const index = newItems.findIndex((box) => box.id === id);
    if (index !== -1) {
      newItems[index].status = value;
      setItem(newItems);
      if (turn < 9) {
        setTurn(turn + 1);
      }
    }
  };

  React.useEffect(() => {
    if (reset) {
      const resetBoard = () => {
        setTurn(0);
        setLine([]);
        setItem(listItem);
        setAllowEnter(true);
      };
      resetBoard();
      SubmitReset();
    }
  }, [reset, SubmitReset, listItem]);

  React.useEffect(() => {
    const checkGame = (value) => {
      const winningCondition = value.repeat(3);
      for (let i = 0; i < 9; i += 3) {
        let checkItem = `${items[i].status}${items[i + 1].status}${items[i + 2].status}`;
        if (checkItem === winningCondition) {
          setLine([i, i + 1, i + 2]);
          return true;
        }
      }
      for (let i = 0; i < 3; i++) {
        let checkItem = `${items[i].status}${items[i + 3].status}${items[i + 6].status}`;
        if (checkItem === winningCondition) {
          setLine([i, i + 3, i + 6]);
          return true;
        }
      }
      if (`${items[0].status}${items[4].status}${items[8].status}` === winningCondition) {
        setLine([0, 4, 8]);
        return true;
      }
      if (`${items[2].status}${items[4].status}${items[6].status}` === winningCondition) {
        setLine([2, 4, 6]);
        return true;
      }
      return false;
    };

    const checkNull = () => {
      return items.some((item) => item.status === "");
    };

    const checkValue = turn % 2 === 0 ? "o" : "x";
    if (checkGame(checkValue)) {
      updateScoreBoard(checkValue);
      setAllowEnter(false);
    } else if (!checkNull() && !checkGame("x") && !checkGame("o")) {
      updateScoreBoard("tie");
      setAllowEnter(false);
    } else if (turn % 2 !== 0 && checkNull() && allowEnter && pvpMode) {
      let index = 0;
      while (true) {
        index = Math.floor(Math.random() * items.length);
        if (items[index].status === "") break;
      }
      if (index !== -1) {
        let newItems = [...items];
        newItems[index].status = "o";
        setItem(newItems);
        if (turn < 9) {
          setTurn(turn + 1);
        }
      }
    }
  }, [turn, items]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="game-board">
      {items.map((item) => (
        <BoardCard key={item.id} turn={turn} onSubmit={handleNextTurn} item={item} allowEnter={allowEnter} winCard={line.includes(items.findIndex((i) => i === item))} />
      ))}
    </div>
  );
}

export default React.memo(GameBoard);
