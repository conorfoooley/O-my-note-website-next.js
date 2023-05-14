import React from "react";

import { Card, Checkbox, Col, Space } from "antd";

import NoteImage from "../../../../../../assets/images/fakeNotePhoto.jpg";

const PredictNoteList = () => {
    return (
        <Col lg={6}>
            <Card className="bg-transparent">
                <h4 className="mb-4">Accords</h4>

                <Space direction="vertical" size="middle">
                    <div className="note-checkbox">
                        <div className="note-checkbox-icon">
                            <img src={NoteImage} className="img-fluid" />
                        </div>
                        <Checkbox>Magnolia</Checkbox>
                    </div>

                    <div className="note-checkbox">
                        <div className="note-checkbox-icon">
                            <img src={NoteImage} className="img-fluid" />
                        </div>
                        <Checkbox>Leather</Checkbox>
                    </div>
                    <div className="note-checkbox">
                        <div className="note-checkbox-icon">
                            <img src={NoteImage} className="img-fluid" />
                        </div>
                        <Checkbox>Woody</Checkbox>
                    </div>
                    <div className="note-checkbox">
                        <div className="note-checkbox-icon">
                            <img src={NoteImage} className="img-fluid" />
                        </div>
                        <Checkbox>Floral</Checkbox>
                    </div>
                    <div className="note-checkbox">
                        <div className="note-checkbox-icon">
                            <img src={NoteImage} className="img-fluid" />
                        </div>
                        <Checkbox>Fresh Spicy</Checkbox>
                    </div>
                </Space>
            </Card>
        </Col>
    );
};

export default PredictNoteList;
