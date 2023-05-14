import React from "react";
import Router from "next/router";
import { Menu } from "antd";
import {
    LogoutOutlined,
    MailOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";

const DropdownMenu = (
    <Menu>
        <Menu.Item>
            <div
                style={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => Router.push("/profile")}
            >
                <a
                    style={{
                        fontFamily: "Montserrat",
                        color: "rgba(0, 0, 0, 0.65)",
                    }}
                    rel="noopener noreferrer"
                >
                    Profile
                </a>
                <UserOutlined />
            </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                    target="_blank"
                    style={{
                        fontFamily: "Montserrat",
                        color: "rgba(0, 0, 0, 0.65)",
                    }}
                    rel="noopener noreferrer"
                >
                    Settings
                </a>
                <SettingOutlined />
            </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                    target="_blank"
                    style={{
                        fontFamily: "Montserrat",
                        color: "rgba(0, 0, 0, 0.65)",
                    }}
                    onClick={() => {
                        contactModal.current.openModal();
                    }}
                    rel="noopener noreferrer"
                >
                    Contact
                </a>
                <MailOutlined />
            </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <div
                onClick={() => {
                    props.logout(props.token, () => {
                        Router.push("/");
                    });
                }}
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <a
                    target="_blank"
                    style={{ fontFamily: "Montserrat", color: "#D94646" }}
                >
                    Logout
                </a>
                <LogoutOutlined />
            </div>
        </Menu.Item>
    </Menu>
);

export default DropdownMenu;
