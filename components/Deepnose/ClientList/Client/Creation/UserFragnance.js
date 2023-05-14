import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Avatar } from "antd";
// import Avatar from "antd/lib/avatar/avatar";
import React from "react";

import NoteImage from "../../../../../assets/images/fakeNotePhoto.jpg";

const UserFragnance = () => {
    return (
        <Card className="bg-transparent border-0">
            <Row justify="space-between" align="center" className="mb-5">
                <Col lg={16}>
                    <h3>Fragnance Work Area</h3>
                </Col>

                <Col lg={8}>
                    <div className="text-right">
                        <Button
                            type="default"
                            shape="round"
                            style={{ height: "40px" }}
                        >
                            SEE INITIAL PREDICTIONS
                        </Button>
                    </div>
                </Col>
            </Row>

            <div className="source-font-wrapper">
                <h6 className="mb-2">ADD NOTE TO MODEL</h6>
                <Card className="mb-4">
                    <Row align="middle" gutter={16}>
                        <Col lg={4}>
                            <Card shape="round" className="chip">
                                <Row justify="center" align="middle">
                                    <Col lg={12}>
                                        <Avatar size={64} src={NoteImage} />
                                    </Col>
                                    <Col lg={12}>
                                        <span style={{ fontWeight: "600" }}>
                                            Patchouli
                                        </span>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card shape="round" className="chip">
                                <Row justify="center" align="middle">
                                    <Col lg={12}>
                                        <Avatar size={64} src={NoteImage} />
                                    </Col>
                                    <Col lg={12}>
                                        <span style={{ fontWeight: "600" }}>
                                            Patchouli
                                        </span>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg={3}>
                            <Button type="default" shape="round">
                                <span className="btn-icon mr-2">
                                    <PlusOutlined />
                                </span>

                                <span style={{ fontFamily: "Source Sans Pro" }}>
                                    Add Note
                                </span>
                            </Button>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={16}>
                    <Col lg={12}>
                        <div className="pyramid">
                            <div className="zone zone-1">
                                <div className="mb-3">
                                    <Avatar
                                        size={38}
                                        src={NoteImage}
                                        className="mr-1"
                                    />
                                    <Avatar size={38} src={NoteImage} />
                                </div>
                                <h6 className="text-uppercase">Top Notes</h6>
                            </div>
                            <div className="zone zone-2">
                                <div className="mb-3">
                                    <Avatar size={64} src={NoteImage} />
                                </div>
                                <h6 className="text-uppercase">Middle Notes</h6>
                            </div>
                            <div className="zone zone-3">
                                <div className="mb-3">
                                    <Avatar
                                        size={64}
                                        src={NoteImage}
                                        className="mr-1"
                                    />
                                    <Avatar
                                        size={64}
                                        src={NoteImage}
                                        className="mr-1"
                                    />
                                    <Avatar size={64} src={NoteImage} />
                                </div>
                                <h6 className="text-uppercase">Base Notes</h6>
                            </div>
                        </div>
                    </Col>

                    <Col lg={12}>
                        <h6 className="mb-3">ACCORDS</h6>

                        <Row align="middle" gutter={16}>
                            <Col lg={8}>
                                <Card shape="round" className="chip">
                                    <Row justify="center" align="middle">
                                        <Col lg={12}>
                                            <Avatar size={64} src={NoteImage} />
                                        </Col>
                                        <Col lg={12}>
                                            <span style={{ fontWeight: "600" }}>
                                                Patchouli
                                            </span>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col lg={8}>
                                <Card shape="round" className="chip">
                                    <Row justify="center" align="middle">
                                        <Col lg={12}>
                                            <Avatar size={64} src={NoteImage} />
                                        </Col>
                                        <Col lg={12}>
                                            <span style={{ fontWeight: "600" }}>
                                                Patchouli
                                            </span>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default UserFragnance;
