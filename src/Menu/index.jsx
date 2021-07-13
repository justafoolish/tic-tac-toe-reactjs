import React from 'react'
import PropTypes from 'prop-types'
import "./Menu.scss"

function Menu(props) {
    const { resetGame } = props

    return (
        <div className="menu">
            <button onClick={resetGame}>Chơi Lại</button>
        </div>
    )
}

Menu.propTypes = {
    resetGame: PropTypes.func.isRequired,
}

export default Menu

