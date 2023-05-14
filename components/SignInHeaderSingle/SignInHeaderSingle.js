import React, { useState, useRef, useEffect } from "react";
// import Router from "next/router";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";
import logo from "../../assets/images/logo.svg";
import featureGrid from "../../assets/images/feather-grid.svg";
import featureTarget from "../../assets/images/feather-target.svg";
import userVector from "../../assets/images/feather-user.svg";
import { Dropdown } from "antd";

// import { searchAll } from "../../api";
import { getCookies } from "cookies-next";
import { logout, getUserProfile } from "../../actions/auth";
import { contactUs } from "../../actions/public";
import ContactUsModal from "../ContactUsModal/contactUsModal";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const SignInHeaderSingle = (props) => {
    const router = useRouter();

    // console.log(props);
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        await props.getUserProfile(getCookies(null, "authToken"), () => {});
    };

    const contactModal = useRef(null);

    return (
        <div className="signInSingleHeaderWrapper">
            <div className="signInSingleHeader">
                <div className={"top-menu"}>
                    <div className={"leftItemsMenu"}>
                        <Link href={{ pathname: "/ada" }}>
                            <a>
                                <img
                                    id="header-logo"
                                    className="logo"
                                    src={logo}
                                    style={{
                                        marginRight: 40,
                                        cursor: "pointer",
                                    }}
                                />
                            </a>
                        </Link>

                        {props.itemName && (
                            <nav className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link
                                        href={
                                            router.pathname.includes(
                                                "/perfume/"
                                            )
                                                ? { pathname: "/ada-p" }
                                                : { pathname: "/ada-n" }
                                        }
                                    >
                                        <a>
                                            {router.pathname.includes(
                                                "/perfume/"
                                            )
                                                ? "ADA-P"
                                                : "APD-N"}
                                        </a>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    {props.itemName}
                                </li>
                            </nav>
                        )}
                    </div>

                    <div className={"rightItemsMenu"}>
                        <div
                            style={{
                                width: "365px",
                                height: "44px",
                                borderRadius: "22px",
                                borderWidth: "2px",
                                borderStyle: "solid",
                                borderColor: "#e8ddd0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                padding: "5px",
                                boxSizing: "border-box",
                                marginRight: "10px",
                            }}
                        >
                            <Link href={{ pathname: "/ada-p" }}>
                                <a
                                    className={
                                        router.pathname === "/ada-p" ||
                                        router.pathname.includes("/perfume/")
                                            ? "navActive"
                                            : null
                                    }
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        fontStretch: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 1.67,
                                        letterSpacing: "normal",
                                        color: "#000",
                                        flex: 1,
                                        height: "100%",
                                        textAlign: "center",
                                        borderRadius: "15px",
                                        paddingTop: "4px",
                                    }}
                                >
                                    ADA-P{" "}
                                    <img
                                        style={{
                                            width: "15px",
                                            textAlign: "right",
                                            marginLeft: "5px",
                                        }}
                                        src={featureGrid}
                                        alt=""
                                    />
                                </a>
                            </Link>
                            <Link href={{ pathname: "/ada-n" }}>
                                <a
                                    className={
                                        router.pathname === "/ada-n" ||
                                        router.pathname.includes("/note/")
                                            ? "navActive"
                                            : null
                                    }
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        fontStretch: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 1.67,
                                        letterSpacing: "normal",
                                        color: "#000",
                                        flex: 1,
                                        height: "100%",
                                        textAlign: "center",
                                        borderRadius: "15px",
                                        paddingTop: "4px",
                                    }}
                                >
                                    ADA-N{" "}
                                    <img
                                        style={{
                                            width: "15px",
                                            textAlign: "right",
                                            marginLeft: "5px",
                                        }}
                                        src={featureTarget}
                                        alt=""
                                    />
                                </a>
                            </Link>
                            <Link href={{ pathname: "/deepnose" }}>
                                <a
                                    className={
                                        router.pathname === "/deepnose" ||
                                        router.pathname.includes("/deepnose/")
                                            ? "navActive"
                                            : null
                                        // router.pathname === "/deepnose"
                                        //     ? "navActive"
                                        //     : null
                                    }
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        fontStretch: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 1.67,
                                        letterSpacing: "normal",
                                        color: "#000",
                                        flex: 1,
                                        height: "100%",
                                        textAlign: "center",
                                        borderRadius: "15px",
                                        paddingTop: "4px",
                                    }}
                                >
                                    DEEPNOSE{" "}
                                    <img
                                        style={{
                                            width: "15px",
                                            textAlign: "right",
                                            marginLeft: "5px",
                                        }}
                                        src={featureTarget}
                                        alt=""
                                    />
                                </a>
                            </Link>
                        </div>

                        <Dropdown
                            overlay={DropdownMenu}
                            trigger={["click"]}
                            overlayStyle={{ width: 200 }}
                        >
                            <div className={"userIcon"}>
                                {props.profileImage ? (
                                    <img src={props.profileImage} alt="" />
                                ) : (
                                    <img src={userVector} alt="" />
                                )}
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <ContactUsModal
                    ref={contactModal}
                    contactUs={props.contactUs}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = {
    logout: logout,
    contactUs: contactUs,
    getUserProfile: getUserProfile,
};

SignInHeaderSingle.getInitialProps = async (ctx) => {
    return { ctx };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInHeaderSingle);
