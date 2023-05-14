import React from "react";

import { Card, Button } from "antd";

import { DownOutlined, RightOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";

const ClientItem = ({ client }) => {
    const [compositionView, setCompositionView] = useState(false);

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
        <>
            <tr>
                <td>{client.first_name}</td>
                <td>{client.last_name}</td>
                <td>{client.email}</td>
                <td>{client.creation_date}</td>
                <td className="text-right">
                    <Button
                        type="link"
                        className="client_show_btn"
                        onClick={() => setCompositionView(!compositionView)}
                    >
                        <span>
                            {compositionView ? "Show less" : "Show more"}
                        </span>
                        <span className="show_icon">
                            {compositionView ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </span>
                    </Button>
                </td>
            </tr>

            {compositionView && (
                <tr className="inner-table">
                    <td colSpan="5">
                        <Card className="inner-card">
                            <h3 className="mb-3">Previous Compositions</h3>

                            <div className="table-responsive">
                                <table className="table client-table">
                                    <thead>
                                        <tr>
                                            <th width="15%">DATE</th>
                                            <th width="20%">
                                                COMPOSITION NAME
                                            </th>
                                            <th width="15%">CREATED BY</th>
                                            <th width="10%">STATUS</th>
                                            <th width="40%"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {client.compositors &&
                                            client.compositors.map(
                                                (compositor, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            {compositor.date}
                                                        </td>
                                                        <td>
                                                            {compositor.name}
                                                        </td>
                                                        <td>
                                                            {
                                                                compositor.created_by
                                                            }
                                                        </td>
                                                        <td>
                                                            {statusCompositor(
                                                                compositor.status
                                                            )}
                                                        </td>
                                                        <td className="text-right">
                                                            <Button
                                                                type="link"
                                                                className="client_show_btn"
                                                            >
                                                                <span>
                                                                    Show
                                                                    creation
                                                                </span>
                                                                <span className="show_icon">
                                                                    <RightOutlined />
                                                                </span>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </td>
                </tr>
            )}
        </>
    );
};

export default ClientItem;
