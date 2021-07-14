import React from "react";
import PropTypes from 'prop-types';

const CardX = (props) => {
  return <div className="card--flipback--x" active={props.active ? "" : null} hide={props.hide ? null : ""}></div>;
};

CardX.propTypes = {
    active: PropTypes.bool,
    hide: PropTypes.bool
}
CardX.defaultProps = {
    active: false,
    hide: true
}

export default CardX;
