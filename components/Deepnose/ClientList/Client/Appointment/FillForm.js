import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Col, Row, Steps, Space, Slider, Checkbox, Button } from "antd";
import React from "react";

const { Step } = Steps;

const FillForm = () => {
    return (
        <Card className="border-0 bg-transparent">
            <h3 className="mb-5">Fill form</h3>

            <Row justify="space-between" gutter={16}>
                <Col lg={6}>
                    <Card className="bg-transparent border-0 fill-form-step">
                        <Steps direction="vertical" current={0}>
                            <Step
                                title="TELL US ABOUT YOU"
                                description="This is a description."
                            />
                            <Step
                                title="SMELL PREFERENCES"
                                description="This is a description."
                            />
                            <Step
                                title="SELECT CATEGORY"
                                description="This is a description."
                            />
                            <Step
                                title="SPECIFIC MEMORIES"
                                description="This is a description."
                            />
                        </Steps>
                    </Card>
                </Col>

                <Col lg={12}>
                    <Space direction="vertical" size="large">
                        <Card className="bg-transparent">
                            <h4>Longevity</h4>

                            <div className="my-3 fill-form-range">
                                <Slider defaultValue={37} />
                            </div>

                            <h6 className="mb-1">Moderate</h6>
                            <p style={{ fontSize: "14px", fontWeight: "600" }}>
                                Cras mattis consectetur purus sit amet
                                fermentum. Duis mollis, est non commodo luctus,
                                nisi erat porttitor ligula, eget lacinia odio
                                sem nec elit. Curabitur blandit tempus
                            </p>
                        </Card>
                        <Card className="bg-transparent">
                            <h4>Longevity</h4>

                            <div className="my-3 fill-form-range">
                                <Slider defaultValue={37} />
                            </div>

                            <h6 className="mb-1">Moderate</h6>
                            <p style={{ fontSize: "14px", fontWeight: "600" }}>
                                Cras mattis consectetur purus sit amet
                                fermentum. Duis mollis, est non commodo luctus,
                                nisi erat porttitor ligula, eget lacinia odio
                                sem nec elit. Curabitur blandit tempus
                            </p>
                        </Card>
                    </Space>
                </Col>

                <Col lg={6}>
                    <Card className="bg-transparent">
                        <h4 className="mb-4">Seasons</h4>

                        <Space direction="vertical" size="middle">
                            <div>
                                <Checkbox>Winter</Checkbox>
                            </div>
                            <div>
                                <Checkbox>Spring</Checkbox>
                            </div>
                            <div>
                                <Checkbox>Summer</Checkbox>
                            </div>
                            <div>
                                <Checkbox>Autumn</Checkbox>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <div className="text-right mt-5">
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="site-btn-primary"
                >
                    <span>CALCULATE YOUR FRAGRANCE</span>
                    <span className="btn-icon ml-2">
                        <ArrowRightOutlined />
                    </span>
                </Button>
            </div>
        </Card>
    );
};

export default FillForm;
