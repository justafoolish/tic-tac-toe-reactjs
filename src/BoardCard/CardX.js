import React from 'react';

const CardX = (props) => {
    const active = props.active ? "active" : ""
    return (
        <div className="card--flipback--x" status={active} >
        </div>
    );
};


export default CardX;
