import { VideoCameraOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React from "react";

const ShareStory = () => {
    return (
        <Card className="border-0 bg-transparent">
            <h3>Share your story</h3>

            <Row justify="center">
                <Col lg={12} className="text-center source-font-wrapper">
                    <h6 className="mb-3">SELECT OPTION TO SHARE YOUR STORY</h6>

                    <Row justify="center" gutter={16}>
                        <Col>
                            <div className="text-center">
                                <Button
                                    size="large"
                                    shape="circle"
                                    className="client-create-btn mb-3"
                                    onClick={() =>
                                        this.setState({
                                            clientAddType: "invite",
                                        })
                                    }
                                >
                                    <VideoCameraOutlined />
                                </Button>
                                <h6>Record video/audio</h6>
                            </div>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <Button
                                    size="large"
                                    shape="circle"
                                    className="client-create-btn mb-3"
                                    onClick={() =>
                                        this.setState({
                                            clientAddType: "invite",
                                        })
                                    }
                                >
                                    <EditOutlined />
                                </Button>
                                <h6>Fill form</h6>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default ShareStory;
