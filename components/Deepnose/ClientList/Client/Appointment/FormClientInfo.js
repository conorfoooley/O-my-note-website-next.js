import React from "react";

import { Button, Card, Col, Row } from "antd";
import { SettingOutlined, ArrowRightOutlined } from "@ant-design/icons";

import CalenderImg from "../../../../../assets/images/calender.png";

const FormClientInfo = ({ profileImage }) => {
    return (
        <div className="client-info-container">
            <Card>
                <Row>
                    <Col xs={24} sm={24} md={20} lg={18}>
                        <h3 className="mb-5">Upcomming session</h3>
                    </Col>
                    <Col xs={24} sm={24} md={4} lg={6} className="text-right">
                        <Button type="outline" shape="circle" size="large">
                            <span className="btn-icon">
                                <SettingOutlined />
                            </span>
                        </Button>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Card>
                            <Row justify="space-between" gutter={16}>
                                <Col lg={6}>
                                    <div className="position-relative">
                                        <img
                                            src={CalenderImg}
                                            className="img-fluid"
                                            alt="CalenderImage"
                                        />

                                        <div className="text-center calender-select-day">
                                            <h6>APRIL 2020</h6>
                                            <h3 className="my-2">28th</h3>
                                            <p>at 18:00</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={18}>
                                    <h4 className="mb-1">
                                        You have an appointment with Francis
                                    </h4>
                                    <div className="my-3">
                                        <Row>
                                            <Col lg={16}>
                                                <Button
                                                    type="outline"
                                                    shape="round"
                                                    block
                                                    className="start-session-btn"
                                                >
                                                    <span>
                                                        START PERSONAL SESSION
                                                    </span>
                                                    <span className="btn-icon ml-2">
                                                        <ArrowRightOutlined />
                                                    </span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <p>
                                        You will be able to join meeting 10
                                        minutes before
                                    </p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Card className="bg-light">
                <Row>
                    <Col xs={24} sm={24} md={20} lg={18}>
                        <h3 className="mb-5">Francis Walton</h3>

                        <Row>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <div className="mb-4">
                                    <h6 className="mb-1">PERFUMERY ADDRESS</h6>
                                    <p>51, rue de la République, 69004 LYON</p>
                                </div>

                                <div>
                                    <h6 className="mb-1">
                                        YEARS OF EXPERIENCE
                                    </h6>
                                    <p>12</p>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={16} lg={16}>
                                <h6 className="mb-1">ABOUT FRANCIS</h6>
                                <p>
                                    Nulla vitae elit libero, a pharetra augue.
                                    Duis mollis, est non commodo luctus, nisi
                                    erat porttitor ligula, eget lacinia odio sem
                                    nec elit. Fusce dapibus, tellus ac cursus
                                    commodo, tortor mauris condimentum nibh, ut
                                    fermentum massa justo sit amet risus.
                                    Vestibulum...
                                </p>

                                <div className="text-right mt-3 read-more-btn">
                                    <Button type="link">Read more</Button>
                                </div>
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
        </div>
    );
};

export default FormClientInfo;
