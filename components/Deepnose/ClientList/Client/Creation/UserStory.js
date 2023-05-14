import { Card, Checkbox, Col, Row } from "antd";
import React from "react";

const UserStory = () => {
    return (
        <Card className="bg-transparent border-0">
            <h3 className="mb-5">Monique’s story</h3>

            <Row className="source-font-wrapper" justify="space-between">
                <Col lg={18}>
                    <div className="mb-4">
                        <h6 className="text-uppercase mb-3">
                            Tell us about you
                        </h6>
                        <p className="site-p" style={{ fontWeight: "600" }}>
                            Cras mattis consectetur purus sit amet fermentum.
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula, eget lacinia odio sem nec elit.
                            Curabitur blandit tempus porttitor. Maecenas
                            faucibus mollis interdum. Vivamus sagittis lacus vel
                            augue laoreet rutrum faucibus dolor auctor.
                        </p>
                    </div>
                    <div className="mb-4">
                        <h6 className="text-uppercase mb-3">
                            how do you want to smell
                        </h6>
                        <p className="site-p" style={{ fontWeight: "600" }}>
                            Donec id elit non mi porta gravida at eget metus.
                        </p>
                    </div>
                    <div className="mb-4">
                        <h6 className="text-uppercase mb-3">
                            specific memories or feeling your perfume should
                            bring back, in one word
                        </h6>
                        <p className="site-p" style={{ fontWeight: "600" }}>
                            Sed posuere consectetur est at lobortis.
                        </p>
                    </div>

                    <Row className="source-font-wrapper">
                        <Col lg={6}>
                            <h6 className="mb-3 text-uppercase">Longevity</h6>

                            <div>
                                <Checkbox>
                                    <span
                                        style={{
                                            fontFamily: "Source Sans Pro",
                                        }}
                                    >
                                        Weak
                                    </span>
                                </Checkbox>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <h6 className="mb-3 text-uppercase">Sillages</h6>

                            <div>
                                <Checkbox>
                                    <span
                                        style={{
                                            fontFamily: "Source Sans Pro",
                                        }}
                                    >
                                        Moderate
                                    </span>
                                </Checkbox>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <h6 className="mb-3 text-uppercase">Seasons</h6>

                            <div>
                                <Checkbox>
                                    <span
                                        style={{
                                            fontFamily: "Source Sans Pro",
                                        }}
                                    >
                                        Autumn
                                    </span>
                                </Checkbox>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <h6 className="text-uppercase mb-3">Attached pictures</h6>

                    <Row gutter={[16, 16]}>
                        <Col lg={12}>
                            <img
                                src="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                className="img-fluid"
                                alt=""
                            />
                        </Col>
                        <Col lg={12}>
                            <img
                                src="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                className="img-fluid"
                                alt=""
                            />
                        </Col>
                        <Col lg={12}>
                            <img
                                src="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                className="img-fluid"
                                alt=""
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default UserStory;
