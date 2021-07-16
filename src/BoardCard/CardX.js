import React from "react";
import PropTypes from "prop-types";

const CardX = (props) => {
  const { active, winner } = props;
  return <div className="card--x" active={active ? "" : null} winner={winner ? "" : null}></div>;
};

CardX.propTypes = {
  active: PropTypes.bool,
  winner: PropTypes.bool,
};
CardX.defaultProps = {
  active: false,
  winner: false,
};

export default CardX;
