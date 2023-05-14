import React, { useState, useEffect } from "react";
import { Card, Checkbox, Col, Space } from "antd";
import { URI } from "../../../constants/uri";

const PredictNoteList = (props) => {
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
            <div className="d-flex flex-column flex-wrap" style={{gap: '0.3rem',height:350,marginTop:18}}>
                {props.notes?
                    props.notes.map((item, index) => {
                        return(
                            <div key={index} className="product-checkbox">
                                <div className="product-checkbox-icon">
                                    <img src={URI+item.image} className="img-fluid product-img" />
                                </div>
                                <div className="product-note-text">{item.name}</div>
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

export default PredictNoteList;
