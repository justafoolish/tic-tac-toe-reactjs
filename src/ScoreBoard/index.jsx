import React from "react";
import PropTypes from "prop-types";
import "./ScoreBoard.scss";

const ScoreBoard = (props) => {
  const { scoreboard, pvpMode } = props;
  
  return (
    <>
      <ul className="scoreboard">
        <li id="player">
          <label htmlFor="player">{pvpMode ? "PLAYER" : "PLAYER1"}(X)</label>
          <div>{scoreboard[0]}</div>
        </li>
        <li id="tie">
          <label htmlFor="tie">TIE</label>
          <div>{scoreboard[2]}</div>
        </li>
        <li id="computer">
          <label htmlFor="computer">{pvpMode ? "COMPUTER" : "PLAYER2"}(O)</label>
          <div>{scoreboard[1]}</div>
        </li>
      </ul>
    </>
  );
};

ScoreBoard.propTypes = {
  scoreboard: PropTypes.array.isRequired,
};

export default ScoreBoard;
