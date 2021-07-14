import React from "react";
import PropTypes from "prop-types";
import "./BoardCard.scss";
import CardX from "./CardX";
import CardO from "./CardO";

function BoardCard(props) {
  const { turn, onSubmit, item, allowEnter } = props;
  const { id, status } = item;
  const [card, setCard] = React.useState("");

  const setActive = () => {
    if (status === "" && allowEnter) {
      console.log("previus : " + turn);
      const value = turn % 2 === 0 ? "x" : "o";

      onSubmit(id, value);
    }
  };
  const alertHover = () => {
    console.log("hover current: " + turn);
  };

  React.useEffect(() => {
    if (status === "x") {
      setCard(<CardX active={true} />);
    } else if (status === "o") {
      setCard(<CardO active={true} />);
    } else if (!allowEnter) {
      setCard("");
    } else {
      if (turn % 2 === 0) {
        setCard(<CardX active={false} />);
      } else {
        setCard(<CardO active={false} />);
      }
    }
  }, [turn, status, allowEnter]);
  return (
    <div className="card" onClick={setActive} onMouseEnter={alertHover}>
      {console.log("enter : " + allowEnter)}
      <div className="card--flipback">{card}</div>
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
