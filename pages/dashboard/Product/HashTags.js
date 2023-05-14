import React, { useState, useEffect } from "react";
import { Card, Checkbox, Col, Space } from "antd";

const HashTags = (props) => {
    // const [notes,setNotes] = useState([]);
    // useEffect(() => {
    //     setNotes(props.notes);
    //     console.log("props.notesdf",notes);
    //     notes.map((item,i) => {
    //         console.log("item.image",item.image);
    //         console.log("item.name",item.name);
    //     });
    // }, []);
    // const handleClick = (e, value) => {
    //     props.handleClick(value);
    // }
    return (
        <Col>
            <div className="d-flex flex-column" style={{gap: '0.1rem',marginTop:18,display:'content'}}>
                {props.topTenFrequentWords?
                    props.topTenFrequentWords.map((item, index) => {
                        return(
                            <div key={index} style={{display:'flex', justifyContent:'center'}}>
                                <div style={{fontSize:20,fontWeight:600,fontFamily:'Cormorant Garamond'}}>#{item}</div>
                            </div>
                        )
                    })
                    :
                    ""
                }
            </div>
        </Col>
    );
};

export default HashTags;
