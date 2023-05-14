import React from 'react';
import ReactPlayer from 'react-player'

export default ({URL}) => {
    return (
        <div className='player-wrapper'>
            {<ReactPlayer
                className='react-player'
                controls
                url={URL}
                width='100%'
                height='100%'
            />}
        </div>
    )

}