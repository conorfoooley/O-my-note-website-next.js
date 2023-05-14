import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React from "react";

const UserInfo = ({ profileImage }) => {
    return (
        <Card className="client-info-container">
            <Row>
                <Col xs={24} sm={24} md={20} lg={18}>
                    <h3 className="mb-5">Monique Chnadonnet</h3>

                    <Row className="source-font-wrapper mb-4">
                        <Col lg={6}>
                            <h6>AGE</h6>
                            <p className="site-p">
                                <span>32</span>
                                <Button
                                    type="link"
                                    className="p-0 ml-1 site-btn-color-primary"
                                >
                                    <span className="btn-icon ">
                                        <EditOutlined />
                                    </span>
                                </Button>
                            </p>
                        </Col>
                        <Col lg={6}>
                            <h6>GENDER</h6>
                            <p className="site-p">
                                <span>Female</span>
                                <Button
                                    type="link"
                                    className="p-0 ml-1 site-btn-color-primary"
                                >
                                    <span className="btn-icon ">
                                        <EditOutlined />
                                    </span>
                                </Button>
                            </p>
                        </Col>
                        <Col lg={6}>
                            <h6>INTERESTED IN</h6>
                            <p className="site-p">
                                <span>Who cares</span>
                                <Button
                                    type="link"
                                    className="p-0 ml-1 site-btn-color-primary"
                                >
                                    <span className="btn-icon ">
                                        <EditOutlined />
                                    </span>
                                </Button>
                            </p>
                        </Col>
                        <Col lg={6}>
                            <h6>ALLERGIES</h6>
                            <p className="site-p">
                                <span>None</span>
                                <Button
                                    type="link"
                                    className="p-0 ml-1 site-btn-color-primary"
                                >
                                    <span className="btn-icon ">
                                        <EditOutlined />
                                    </span>
                                </Button>
                            </p>
                        </Col>
                    </Row>

                    <Row
                        className="source-font-wrapper"
                        justify="space-between"
                    >
                        <Col lg={12}>
                            <h6>ADDRESS</h6>
                            <p className="site-p">
                                <span>
                                    51, rue de la République, 69004 LYON
                                </span>
                                <Button
                                    type="link"
                                    className="p-0 ml-1 site-btn-color-primary"
                                >
                                    <span className="btn-icon ">
                                        <EditOutlined />
                                    </span>
                                </Button>
                            </p>
                        </Col>

                        <Col lg={12}>
                            <h6>EMAIL</h6>
                            <p className="site-p">
                                <span>monique.chnadonnet@gmail.com</span>
                                <Button
                                    type="link"
                                    className="p-0 ml-1 site-btn-color-primary"
                                >
                                    <span className="btn-icon ">
                                        <EditOutlined />
                                    </span>
                                </Button>
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={4} lg={6}>
                    <img
                        src={profileImage}
                        className="img-fluid"
                        alt="Client Photo"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default UserInfo;
