import React from "react";
import PropTypes from "prop-types";
import "./BoardCard.scss";
import CardX from "./CardX";
import CardO from "./CardO";

function BoardCard(props) {
  const { turn, onSubmit, item } = props;
  const { id, status } = item
  const [card, setCard] = React.useState("");

  const setActive = () => {
    if (status === "") {
      const value = turn % 2 === 0 ? "x" : "o";
      
      onSubmit(id, value);
    }
  };

  React.useEffect(() => {
    if (status === "x") {
      setCard(<CardX active={true} />);
    } else if (status === "o") {
      setCard(<CardO active={true} />);
    } else {
      if (turn % 2 === 0) {
        setCard(<CardX active={false} />);
      } else {
        setCard(<CardO active={false} />);
      }
    }
  }, [turn, status]);

  return (
    <div className="card" onClick={setActive}>
      <div className="card--flipback">{card}</div>
    </div>
  );
}

BoardCard.propTypes = {
  status: PropTypes.string,
  turn: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  items: PropTypes.object
};

BoardCard.defaultProps = {
    status: "",
    items: {}
}

export default BoardCard;
