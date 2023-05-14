import { Col, Row, Slider } from "antd";
import React from "react";

import NoteImage from "../../../../../../assets/images/fakeNotePhoto.jpg";

const FragnaceIntensityItem = () => {
    return (
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col lg={8}>
                <div className="note-checkbox">
                    <div className="note-checkbox-icon">
                        <img src={NoteImage} className="img-fluid" alt="" />
                    </div>

                    <span className="font-weight-bold">Coriander</span>
                </div>
            </Col>
            <Col lg={16}>
                <div className="fill-form-range">
                    <Slider defaultValue={37} />
                </div>
            </Col>
        </Row>
    );
};

export default FragnaceIntensityItem;
