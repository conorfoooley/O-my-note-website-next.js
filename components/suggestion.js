import Separator from "./Separator/Separator";
import React from "react";
import Router from 'next/router'


function Suggsetion(props) {

    return (

        <div onClick={()=> Router.push('/ada/note/'+props.id)} style={{ marginBottom: 5 , padding: 10 , borderRadius : 10 , cursor:'pointer'}} className={'sugItem'}>
            <div className={'flexRow'} style={{justifyContent: 'space-between', marginBottom: 5 , alignSelf: 'center'}}>
                <div className={'flexRow'} style={{justifyContent: 'space-between', flexBasis: '47%'}}>
                    <div className={'smallTitle'} style={{alignSelf:'center'}}>{props.name}</div>
                </div>
                <div style={{    padding: 15}} className={''}>
                    {props.image &&
                    <img src={props.image} style={{width: 75, height: 75, borderRadius: 37}} alt=""/>
                    }
                    </div>

                    </div>
            <Separator size={'full'}/>
        </div>
    )


}

export default Suggsetion
