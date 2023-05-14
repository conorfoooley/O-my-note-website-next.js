import { Button, Card, Col, Input, Row, Slider } from "antd";
import React from "react";
import FragnaceIntensityItem from "./FragnanceIntensity/FragnaceIntensityItem";

const UserFragnanceIntensity = () => {
    return (
        <Card className="bg-transparent border-0">
            <h3 className="mb-5">Fragnance intensity</h3>

            <Row gutter={16} justify="space-between" className="mb-5">
                <Col lg={10}>
                    <FragnaceIntensityItem />
                    <FragnaceIntensityItem />
                    <FragnaceIntensityItem />
                    <FragnaceIntensityItem />
                    <FragnaceIntensityItem />
                </Col>

                <Col lg={10}>
                    <FragnaceIntensityItem />
                    <FragnaceIntensityItem />
                    <FragnaceIntensityItem />
                    <FragnaceIntensityItem />
                </Col>
            </Row>

            <div className="source-font-wrapper">
                <h6 className="text-uppercase mb-2">Perfume recipe name</h6>

                <Row justify="space-between" align="middle">
                    <Col lg={10}>
                        <Input placeholder="Tortor Ridiculus" />
                    </Col>
                    <Col lg={10}>
                        <div className="text-right">
                            <Button
                                type="primary"
                                shape="round"
                                className="site-btn-primary"
                            >
                                SAVE FRAGNANCE
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default UserFragnanceIntensity;
