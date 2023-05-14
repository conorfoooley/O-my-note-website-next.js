import React from 'react';

const FloatCard = ({ children, style }) => {
    return (
        <div className={'floatCard'} style={style} > {children}</div>
    )
}

export default FloatCard