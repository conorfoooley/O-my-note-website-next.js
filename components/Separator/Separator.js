import React from 'react';
const Separator = ({ size, style }) => {
    return (
        <div style={style} className={size ? `separator-${size}` : 'separator'} />
    )
}

export default Separator