import React, {useEffect, useState} from "react";

import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {connect} from "react-redux";

const ToastMessage = ({message}) => {
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        setDisplay(message ? true : false);
    }, [message]);

    // console.log(message);
    return (
        <>
            {display && (
                <div
                    className={
                        message.includes("already")
                            ? "site-toast toast-error"
                            : "site-toast toast-success"
                    }
                >
                    <div className="close-toast">
                        <Button
                            type="link"
                            className="p-0"
                            onClick={() => setDisplay(false)}
                        >
                            <CloseOutlined/>
                        </Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div
                            className={
                                message.includes("already")
                                    ? "toast-icon text-center toast-icon-danger"
                                    : "toast-icon text-center toast-icon-success"
                            }
                        >
                            {message.includes("already") ? (
                                <CloseOutlined/>
                            ) : (
                                <CheckOutlined/>
                            )}
                        </div>
                        <div className="toast-info">
                            <h6>{message.includes("already") ? "ERROR" : "SUCCESS"}</h6>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        message: state.clients.message,
    };
};

export default connect(mapStateToProps, null)(ToastMessage);
