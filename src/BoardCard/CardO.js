import React from "react";
import PropTypes from "prop-types";

const CardO = (props) => {
  const { active, winner } = props;
  return <div className="card--o" active={active ? "" : null} winner={winner ? "" : null}></div>;
};

CardO.propTypes = {
  active: PropTypes.bool,
  winner: PropTypes.bool,
};
CardO.defaultProps = {
  active: false,
  winner: false,
};

export default CardO;
