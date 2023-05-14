import React from 'react';
import CloseButtonImage from '../../assets/images/close.svg'

const CloseButton = ({onClick}) => {
    return (
        <div onClick={onClick} className="close-button">
            <img src={CloseButtonImage} alt="#" />
        </div>
    )
}

export default CloseButton