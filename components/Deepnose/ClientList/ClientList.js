import React, { Component } from "react";

import { Card, Button, Modal, Spin } from "antd";

import {
    LeftOutlined,
    RightOutlined,
    ArrowRightOutlined,
    CloseOutlined,
    MailOutlined,
    EditOutlined,
} from "@ant-design/icons";
import ClientItem from "./ClientItem";
import Manually from "./NewClient/Manually";
import Invite from "./NewClient/Invite";
import { connect } from "react-redux";
import { getCookies } from "cookies-next";
import {
    createClientModal,
    getClientsAction,
    getClientsPaginateAction,
} from "../../../actions/clients";

class ClientList extends Component {
    constructor(props) {
        super();
        this.state = {
            clients: [],

            clientAddType: "",
            // newClientModal: props.newClient,
            newClientInviteMail: "",
        };
    }

    componentDidMount() {
        this.props.getClients(getCookies(null, "authToken"));
    }

    render() {
        // console.log(this.state);
        // console.log(this.props);

        return (
            <Card className="client-list-container">
                <div className="client-list-titlebar">
                    <h3>Client list</h3>

                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        className="site-btn-primary client-add-btn"
                        // onClick={() => this.setState({ newClientModal: true })}
                        onClick={() => this.props.toggleClientModal(true)}
                    >
                        <span>ADD NEW</span>
                        <span className="client-add-btn-icon">
                            <ArrowRightOutlined />
                        </span>
                    </Button>

                    <Modal
                        title={false}
                        visible={this.props.newClient}
                        closable={false}
                        okButtonProps={{
                            style: { display: "none" },
                        }}
                        cancelButtonProps={{
                            style: { display: "none" },
                        }}
                        centered
                        className="new-client-modal"
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            {this.state.clientAddType == "manual" ? (
                                <h3>Enter client manually</h3>
                            ) : (
                                <h3>Add New Client</h3>
                            )}

                            <Button
                                shape="circle"
                                size="large"
                                className="new-client-close-btn"
                                onClick={() => {
                                    this.setState({
                                        clientAddType: "",
                                    });
                                    this.props.toggleClientModal(false);
                                }}
                            >
                                <CloseOutlined />
                            </Button>
                        </div>

                        {this.state.clientAddType == "invite" ? (
                            <Invite />
                        ) : this.state.clientAddType == "manual" ? (
                            <Manually />
                        ) : (
                            <>
                                <div className="d-flex justify-content-around align-items-center my-5">
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
                                            <MailOutlined />
                                        </Button>
                                        <h6>Invite by email</h6>
                                    </div>

                                    <div className="text-center">
                                        <Button
                                            size="large"
                                            shape="circle"
                                            className="client-create-btn mb-3"
                                            onClick={() =>
                                                this.setState({
                                                    clientAddType: "manual",
                                                })
                                            }
                                        >
                                            <EditOutlined />
                                        </Button>
                                        <h6>Enter client manually</h6>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <Button
                                        type="primary"
                                        shape="round"
                                        size="large"
                                        className="client-confirm-btn"
                                    >
                                        <span>Confirm</span>
                                        <ArrowRightOutlined />
                                    </Button>
                                </div>
                            </>
                        )}
                    </Modal>
                </div>

                <div className="table-responsive">
                    <table className="table client-table">
                        <thead>
                            <tr>
                                <th width="10%">FIRST NAME</th>
                                <th width="10%">LAST NAME</th>
                                <th width="30%">EMAIL</th>
                                <th width="40%">DATE OF REGISTRATION</th>
                                <th width="10%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-5"
                                    >
                                        <Spin size="large" />
                                    </td>
                                </tr>
                            ) : (
                                this.props.clients &&
                                this.props.clients.map((client, i) => (
                                    <ClientItem key={i} client={client} />
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="1">
                                    <Button
                                        type="outline"
                                        shape="circle"
                                        size="large"
                                        className="client-list-control-btn"
                                        disabled={
                                            this.props.prev ? false : true
                                        }
                                        onClick={() =>
                                            this.props.getClientPaginate(
                                                getCookies(null, "authToken"),
                                                this.props.prev
                                            )
                                        }
                                    >
                                        <span>
                                            <LeftOutlined />
                                        </span>
                                    </Button>
                                </td>
                                <td colSpan="3">
                                    <h6 className="text-center">
                                        {!this.props.loading && (
                                            <>
                                                Show 1 -{" "}
                                                {this.props.clients.length} from{" "}
                                                {this.props.count}
                                            </>
                                        )}
                                    </h6>
                                </td>
                                <td colSpan="1" className="text-right">
                                    <Button
                                        type="outline"
                                        shape="circle"
                                        size="large"
                                        className="client-list-control-btn"
                                        disabled={
                                            this.props.next ? false : true
                                        }
                                        onClick={() =>
                                            this.props.getClientPaginate(
                                                getCookies(null, "authToken"),
                                                this.props.next
                                            )
                                        }
                                    >
                                        <span>
                                            <RightOutlined />
                                        </span>
                                    </Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients.clients,
        loading: state.clients.loading,
        newClient: state.clients.newClient,
        next: state.clients.next,
        prev: state.clients.prev,
        count: state.clients.count,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClients: (token) => dispatch(getClientsAction(token)),
        getClientPaginate: (token, url) =>
            dispatch(getClientsPaginateAction(token, url)),
        toggleClientModal: (data) => dispatch(createClientModal(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
