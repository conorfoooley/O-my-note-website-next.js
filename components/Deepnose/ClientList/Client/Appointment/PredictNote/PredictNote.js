import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import React from "react";
import PredictNoteList from "./PredictNoteList";

const PredictNote = () => {
    return (
        <Card className="bg-transparent border-0">
            <h3 className="mb-5">Predicted Accords & Notes</h3>

            <Row justify="center" className="source-font-wrapper">
                <Col lg={12}>
                    <div className="text-center mb-5">
                        <h6 className="text-uppercase mb-3">
                            Duis mollis, est non commodo luctus
                        </h6>

                        <p
                            style={{ fontSize: "14px", fontWeight: "600" }}
                            className="mb-4"
                        >
                            Cras mattis consectetur purus sit amet fermentum.
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula, eget lacinia odio sem nec elit.
                            Curabitur blandit tempus
                        </p>

                        <Input placeholder="Enter Perfume Recipe Name" />
                    </div>
                </Col>
            </Row>

            <Row justify="space-between" gutter={16}>
                <PredictNoteList />
                <PredictNoteList />
                <PredictNoteList />
                <PredictNoteList />
            </Row>

            <Row
                justify="space-between"
                className="mt-5 source-font-wrapper"
                align="center"
            >
                <Col lg={12}>
                    <p style={{ fontSize: "14px" }}>
                        You will be able to join meeting 10 minutes before
                    </p>
                </Col>

                <Col lg={12}>
                    <div className="text-right">
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            className="site-btn-primary"
                        >
                            <span>START PERSONAL SESSION</span>
                            <span className="btn-icon ml-2">
                                <ArrowRightOutlined />
                            </span>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default PredictNote;
