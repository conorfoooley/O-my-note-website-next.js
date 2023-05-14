import React from 'react';
import ProductCard from './ProductCard'

const ProductCardGroup = ({ cards }) => {
    return (
        <div className='client-list-header' style={{ flexWrap: 'wrap' }}>
            {cards && cards.map((card,i) => <ProductCard key={i} card={card}/>)
            }
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />
            <div style={{ height: 0, width: '15%' }} />

        </div>
    )

}

export default ProductCardGroup