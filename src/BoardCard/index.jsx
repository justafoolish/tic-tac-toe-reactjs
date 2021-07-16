import React from "react";
import PropTypes from "prop-types";
import "./BoardCard.scss";
import CardX from "./CardX";
import CardO from "./CardO";

function BoardCard(props) {
  const { turn, onSubmit, item, allowEnter, winCard } = props;
  const { id, status } = item;
  const [card, setCard] = React.useState("");

  const setActive = () => {
    if (status === "" && allowEnter) {
      // console.log("Clicked");
      //   console.log("previus : " + turn);
      const value = turn % 2 === 0 ? "x" : "o";

      onSubmit(id, value);
    }
  };

  React.useEffect(() => {
    // console.log("on card effect " + turn);
    if (status === "x") {
      setCard(<CardX active={true} winner={winCard} />);
    } else if (status === "o") {
      setCard(<CardO active={true} winner={winCard} />);
    } else if (!allowEnter) {
      setCard("");
    } else {
      if (turn % 2 === 0) {
        setCard(<CardX active={false} winner={false} />);
      } else {
        setCard(<CardO active={false} winner={false} />);
      }
    }
  }, [turn, status, allowEnter, winCard]);

  return (
    <div className="card" onClick={setActive}>
      {card}
    </div>
  );
}

BoardCard.propTypes = {
  turn: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  items: PropTypes.object,
  allowEnter: PropTypes.bool,
};

BoardCard.defaultProps = {
  items: {},
  allowEnter: true,
};

export default BoardCard;
