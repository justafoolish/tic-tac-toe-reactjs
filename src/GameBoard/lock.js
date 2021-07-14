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
  const [gameOver, setGameOver] = React.useState({ status: false, winner: "", step: 1 });

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
      setGameOver(false);
      setTurn(1);
    }
  }, [reset, SubmitReset]);

  React.useEffect(() => {
    console.log("current : " + turn);
    console.log("game over : ");
    console.log(gameOver)

    const checkValue = turn % 2 === 0 ? "o" : "x";
    const checkGame = (value) => {
      const winable = value.repeat(3);
      for (let i = 0; i < 9; i += 3) {
        let checkItem = `${items[i].status}${items[i + 1].status}${items[i + 2].status}`;
        if (checkItem === winable) return true;
      }

      for (let i = 0; i < 3; i++) {
        let checkItem = `${items[i].status}${items[i + 3].status}${items[i + 6].status}`;
        if (checkItem === winable) return true;
      }

      if (`${items[0].status}${items[4].status}${items[8].status}` === winable) return true;
      if (`${items[2].status}${items[4].status}${items[6].status}` === winable) return true;

      return false;
    };
    const checkNull = () => {
      return items.some((x) => x.status === "");
    };

    if (checkGame(checkValue)) {
      setGameOver({ status: true, winner: checkValue, step: turn});
      setTurn(1);
    } else if (!checkNull()) {
      setGameOver({ status: true, winner: checkValue, step: turn });
      setTurn(1);
    }

    ////////////////////////////////
    if (turn % 2 === 0 && turn < 9) {
      let index = 0;
      while (!gameOver.status) {
        index = Math.floor(Math.random() * items.length);
        if (items[index].status === "") break;
      }
      //console.log("random : " + index);

      let newItems = [...items];
      newItems[index].status = "x";
      setItems(newItems);
      setTurn(turn + 1);
    }
  }, [items, turn]);

  React.useEffect(() => {

  }, [gameOver])