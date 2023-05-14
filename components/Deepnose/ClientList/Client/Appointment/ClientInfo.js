import React from "react";

import { Button, Card, Col, Row } from "antd";

const ClientInfo = ({ profileImage }) => {
    return (
        <Card className="client-info-container">
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
                                <h6 className="mb-1">YEARS OF EXPERIENCE</h6>
                                <p>12</p>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16}>
                            <h6 className="mb-1">ABOUT FRANCIS</h6>
                            <p>
                                Nulla vitae elit libero, a pharetra augue. Duis
                                mollis, est non commodo luctus, nisi erat
                                porttitor ligula, eget lacinia odio sem nec
                                elit. Fusce dapibus, tellus ac cursus commodo,
                                tortor mauris condimentum nibh, ut fermentum
                                massa justo sit amet risus. Vestibulum...
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
    );
};

export default ClientInfo;
