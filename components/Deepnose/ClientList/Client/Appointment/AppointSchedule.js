import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Calendar, Card, Col, Row, Space } from "antd";
import React from "react";

const AppointSchedule = () => {
    return (
        <Card className="bg-transparent border-0">
            <h3 className="mb-5">Select appointment with Francis</h3>

            <Row justify="center" align="center">
                <Col lg={8}>
                    <Card>
                        <Calendar fullscreen={false} />
                    </Card>
                </Col>
                <Col lg={16}>
                    <Card className="bg-transparent border-0">
                        <Row gutter={16}>
                            <Col lg={8}>
                                <div className="text-center">
                                    <h6 className="mb-3">Morning</h6>

                                    <div className="time-btns">
                                        <Space direction="vertical">
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                08: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                08: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                09: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                09: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                10: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                10: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                11: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                11: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                12: 00
                                            </Button>
                                        </Space>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="text-center">
                                    <h6 className="mb-3">Afternoon</h6>

                                    <div className="time-btns">
                                        <Space direction="vertical">
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                08: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                08: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                09: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                09: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                10: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                10: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                11: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                11: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                12: 00
                                            </Button>
                                        </Space>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="text-center">
                                    <h6 className="mb-3">Evening</h6>

                                    <div className="time-btns">
                                        <Space direction="vertical">
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                08: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                08: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                09: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                09: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                10: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                10: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                11: 00
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                11: 30
                                            </Button>
                                            <Button
                                                type="outline"
                                                shape="round"
                                                block
                                            >
                                                12: 00
                                            </Button>
                                        </Space>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Card className="bg-light">
                <Row>
                    <Col lg={16}>
                        <h6>Schedule personal session</h6>
                        <h4>28th April 2020 at 18:00</h4>
                    </Col>

                    <Col lg={8} className="text-right">
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            className="site-btn-primary"
                            onClick={() =>
                                this.setState({ newClientModal: true })
                            }
                        >
                            <span>CONFIRM SESSION</span>
                            <span className="btn-icon ml-2">
                                <ArrowRightOutlined />
                            </span>
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Card>
    );
};

export default AppointSchedule;
