import { RightOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React from "react";

const PreviousComposition = () => {
    const statusCompositor = (status) => (
        <Button
            type="primary"
            shape="round"
            className={
                status.toLowerCase() == "delivered"
                    ? "status-deliver"
                    : status.toLowerCase() == "sent"
                    ? "status-sent"
                    : status.toLowerCase() == "pending"
                    ? "status-pending"
                    : "status-cancel"
            }
        >
            {status}
        </Button>
    );

    return (
        <Card className="bg-transparent border-0">
            <Row justify="space-between" align="middle" className="mb-4">
                <Col lg={18}>
                    <h3 className="mb-3">Previous Compositions</h3>
                </Col>
                <Col lg={6} className="text-right">
                    <Button type="default" shape="circle" size="large">
                        <span className="btn-icon">
                            <UpOutlined />
                        </span>
                    </Button>
                </Col>
            </Row>

            <div className="table-responsive">
                <table className="table previous-com-table border">
                    <thead>
                        <tr>
                            <th width="15%">DATE</th>
                            <th width="20%">COMPOSITION NAME</th>
                            <th width="15%">CREATED BY</th>
                            <th width="10%">STATUS</th>
                            <th width="40%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>06 Jun 2020</td>
                            <td>Etiam Elit</td>
                            <td>Perfumer</td>
                            <td>{statusCompositor("Delivered")}</td>
                            <td className="text-right">
                                <Button type="link" className="client_show_btn">
                                    <span>Show creation</span>
                                    <span className="show_icon">
                                        <RightOutlined />
                                    </span>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default PreviousComposition;
