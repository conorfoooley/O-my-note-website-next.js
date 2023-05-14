import React, {useState} from "react";

import {Button, Input, Spin} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {createClientModal, inviteClientAction,} from "../../../../actions/clients";
import {getCookies} from "cookies-next";

const Invite = (props) => {
    const [clientData, setClientData] = useState({
        email: "",
        first_name: "",
        last_name: "",
    });

    const [errFirstName, setErrFirstName] = useState("");
    const [errLastName, setErrLastName] = useState("");
    const [errEmail, setErrEmail] = useState("");

    // console.log(clientData);

    const submitInvite = async () => {

        if (clientData.first_name === "") {
            setErrFirstName("Please enter your first name...");
        } else if (clientData.last_name === "") {
            setErrLastName("Please enter your last name...");
        } else if (clientData.email === "") {
            setErrEmail("Please enter your email...");
        } else if (!(clientData.email).includes("@")) {
            setErrEmail("Please enter valid email...");
        } else {
            setErrFirstName("");
            setErrLastName("");
            setErrEmail("");

            await props.inviteClient(getCookies(null, "authToken"), clientData);

            // if (props.status == "ok" || props.status == "KO") {
            //     await setClientData({
            //         email: "",
            //         first_name: "",
            //         last_name: "",
            //     });
            //     await props.toggleClientModal(false);
            // }

            await setClientData({
                email: "",
                first_name: "",
                last_name: "",
            });
            await props.toggleClientModal(false);
        }
    };

    return (
        <>
            {props.loading ? (
                <div className="text-center my-5">
                    <Spin size="large"/>
                </div>
            ) : (
                <>
                    <div className="mt-3 mb-1">
                        <h6
                            className="mb-2 font-weight-bold"
                            style={{
                                fontFamily: "Source Sans Pro",
                            }}
                        >
                            FIRST NAME
                        </h6>
                        {errFirstName && (
                            <p className="text-danger font-weight-bold small mb-1">
                                {errFirstName}
                            </p>
                        )}
                        <Input
                            placeholder="First Name"
                            className="invite-client-input"
                            value={clientData.first_name}
                            onChange={(e) =>
                                setClientData({...clientData, first_name: e.target.value})
                            }
                        />
                    </div>
                    <div className="mb-1">
                        <h6
                            className="mb-2 font-weight-bold"
                            style={{
                                fontFamily: "Source Sans Pro",
                            }}
                        >
                            LAST NAME
                        </h6>
                        {errLastName && (
                            <p className="text-danger font-weight-bold small mb-1">
                                {errLastName}
                            </p>
                        )}
                        <Input
                            placeholder="Last Name"
                            className="invite-client-input"
                            value={clientData.last_name}
                            onChange={(e) =>
                                setClientData({...clientData, last_name: e.target.value})
                            }
                        />
                    </div>
                    <div className="mb-1">
                        <h6
                            className="mb-2 font-weight-bold"
                            style={{
                                fontFamily: "Source Sans Pro",
                            }}
                        >
                            EMAIL
                        </h6>
                        {errEmail && (
                            <p className="text-danger font-weight-bold small mb-1">
                                {errEmail}
                            </p>
                        )}
                        <Input
                            placeholder="Email Address"
                            className="invite-client-input"
                            value={clientData.email}
                            onChange={(e) =>
                                setClientData({...clientData, email: e.target.value})
                            }
                        />
                    </div>

                    <div className="text-right">
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            className="client-confirm-btn"
                            onClick={submitInvite}
                        >
                            <span>Invite</span>
                            <ArrowRightOutlined/>
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.clients.loading,
        status: state.clients.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleClientModal: (data) => dispatch(createClientModal(data)),
        inviteClient: (token, data) => dispatch(inviteClientAction(token, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
