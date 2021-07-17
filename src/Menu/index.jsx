import React from 'react'
import PropTypes from 'prop-types'
import "./Menu.scss"

function Menu(props) {
    const { resetGame, onSubmit } = props

    return (
        <div className="menu">
            <button onClick={resetGame}>Rematch</button>
            <button onClick={() => onSubmit(true)}>Play vs Computer</button>
            <button onClick={() => onSubmit(false)}>Play vs People</button>
        </div>
    )
}

Menu.propTypes = {
    resetGame: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default Menu

