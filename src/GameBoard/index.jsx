import React from "react";
import "./GameBoard.scss";
import BoardCard from "./../BoardCard";

function GameBoard(props) {
  const initItem = () => {
    return [
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
  };

  const { reset, SubmitReset } = props;
  const [items, setItems] = React.useState(initItem());
  const [turn, setTurn] = React.useState(1);

  const handleNextTurn = (item, value) => {
    let newItems = [...items];
    const index = newItems.findIndex((x) => x.id === item);
    newItems[index].status = value;

    setItems(newItems);
    setTurn(turn + 1);
  };

  React.useEffect(() => {
    if (reset) {
      setItems(initItem());
      SubmitReset();
    }
  }, [reset, SubmitReset]);

  React.useEffect(() => {
    const checkGame = (value) => {
      for (let i = 0; i < 9; i += 3) {
        if (items[i].status === value && items[i + 1].status === value && items[i + 2].status === value) return true;
      }
      for (let i = 0; i < 3; i++) {
        if (items[i].status === value && items[i + 3].status === value && items[i + 6].status === value) return true;
      }
      if (items[0].status === value && items[4].status === value && items[8].status === value) return true;
      if (items[2].status === value && items[4].status === value && items[6].status === value) return true;

      return false;
    };
    const checkNull = () => {
      return items.some((x) => x.status === "");
    };
    const checkValue = turn % 2 === 0 ? "o" : "x";
    if (checkGame(checkValue)) {
      alert("Gà Lày Dễ Thế Cũng Thua. " + checkValue + " WIN");
    } else if (!checkNull()) {
      alert("Hoà Rồi Gà Này");
    }
  }, [items, turn]);

  return (
    <div className="game-board">
      {items.map((item) => (
        <BoardCard key={item.id} status={item.status} turn={turn} onSubmit={handleNextTurn} item={item} />
      ))}
    </div>
  );
}

export default GameBoard;
