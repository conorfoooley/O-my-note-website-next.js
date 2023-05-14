import React from "react";

import page1 from '../assets/images/nda/ndaomn-1.png'
import page2 from '../assets/images/nda/ndaomn-2.png'
import page3 from '../assets/images/nda/ndaomn-3.png'
import page4 from '../assets/images/nda/ndaomn-4.png'
import page5 from '../assets/images/nda/ndaomn-5.png'
import page6 from '../assets/images/nda/ndaomn-6.png'

export default function nda() {
    return(
        <div style ={{width:'50%', margin : 'auto'}}>
            <img src = {page1}/>
            <div>
                <img src = {page2}/>
            </div>
            <div>
                <img src = {page3}/>
            </div>
            <div>
                <img src = {page4}/>
            </div>
            <div>
                <img src = {page5}/>
            </div>
            <div>
                <img src = {page6}/>
            </div>
        </div>
        

        )
  }