import React from 'react';
import SearchCard from '../SearchCard/SearchCard'

const SearchCardGroup = ({ cards }) => {
    return (
        <div className='client-list-header' style={{ flexWrap: 'wrap' }}>
            {cards && cards.map((card) => <SearchCard card={card} />)
            }
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />

        </div>
    )

}

export default SearchCardGroup