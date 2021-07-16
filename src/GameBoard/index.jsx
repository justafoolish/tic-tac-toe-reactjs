import React from "react";
import "./GameBoard.scss";
import BoardCard from "./../BoardCard";
import PropTypes from "prop-types";

GameBoard.propTypes = {
  reset: PropTypes.bool,
  SubmitReset: PropTypes.func,
  listItem: PropTypes.array.isRequired,
  handleGameOver: PropTypes.func,
};
GameBoard.defaultProps = {
  reset: false,
  SubmitReset: null,
  handleGameOver: null,
};

function GameBoard(props) {
  const { reset, SubmitReset, listItem, handleGameOver } = props;
  const [items, setItem] = React.useState(listItem);
  const [turn, setTurn] = React.useState(0);
  const [allowEnter, setAllowEnter] = React.useState(true);
  const [line, setLine] = React.useState([]);

  const handleNextTurn = (id, value) => {
    console.log("On handleNextTurn " + turn);
    //console.log(item);
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
      const resetBoard = async () => {
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
      handleGameOver(true, checkValue + " Thắng");
      setAllowEnter(false);
      setTurn(turn - 1);

    } else if (!checkNull()) {
      console.log(items);
      handleGameOver(true, "Hoà");
      setAllowEnter(false);
      setTurn(0);
    }
    // else if (turn % 2 === 0 && turn < 9) {
    //   console.log("on effect auto " + turn);
    //   //////////// RANDOM MOVE ///////////////////////////////
    //   let index = 0;
    //   while (true) {
    //     index = Math.floor(Math.random() * item.length);
    //     if (item[index].status === "") break;
    //   }
    //   //      console.log("random : " + index);

    //   let newItems = [...item];
    //   newItems[index].status = "x";
    //   setItem(newItems);
    //   setTurn(turn + 1);
    // }
  }, [turn, items]);

  return (
    <div className="game-board">
      {console.log("on render " + turn)}
      {/* {console.log("rendered turn: " + turn)} */}
      {items.map((item) => (
        <BoardCard key={item.id} turn={turn} onSubmit={handleNextTurn} item={item} allowEnter={allowEnter} winCard={line.includes(items.findIndex((i) => i === item))} />
      ))}
    </div>
  );
}

export default GameBoard;
