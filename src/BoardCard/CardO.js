import React from 'react';

const CardO = (props) => {
    const active = props.active ? "active" : "";
    return (
        <div className="card--flipback--o" status={active}>
            
        </div>
    );
}

export default CardO;
