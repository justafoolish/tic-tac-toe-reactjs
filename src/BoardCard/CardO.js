import React from "react";
import PropTypes from "prop-types";

const CardO = (props) => {
  return <div className="card--flipback--o" active={props.active ? "" : null}></div>;
};

CardO.propTypes = {
  active: PropTypes.bool,
};
CardO.defaultProps = {
  active: false,
};

export default CardO;
