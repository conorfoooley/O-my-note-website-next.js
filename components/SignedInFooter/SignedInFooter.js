import React from 'react';
import Separator from '../Separator/Separator'

const SignedInFooter = ({ }) => {
    return (
        <div className='footer'>
            <Separator size='full' />
            <div style={{ paddingRight: 0, paddingLeft: 0 }} className="client-list-header" >
                <div><a style={{ fontSize: 14, color: '#7b7b7b', marginRight: 28 }}>Terms and conditions</a><a style={{ fontSize: 14, color: '#7b7b7b' }}>Privacy policy</a></div>
                <div style={{ fontSize: 14, color: '#7b7b7b' }}  >2020 © O MY NOTE. All Rights Reserved.</div>
            </div>
        </div>
    )
}

export default SignedInFooter