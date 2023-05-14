import React, { useState, useRef } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";
import logo from "../../assets/images/logo.svg";
import featureGrid from "../../assets/images/feather-grid.svg";
import featureTarget from "../../assets/images/feather-target.svg";
import userVector from "../../assets/images/feather-user.svg";
import { AutoComplete, Dropdown, Input, Menu, Spin } from "antd";
import {
    CreditCardOutlined,
    LogoutOutlined,
    MailOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { searchAll } from "../../api";
import { getCookies } from "cookies-next";
import { logout, getUserProfile } from "../../actions/auth";
import { contactUs } from "../../actions/public";
import ContactUsModal from "../ContactUsModal/contactUsModal";
import { useEffect } from "react";

const renderItem = ({ images, name, id, type, title, image }) => {
   console.log(image);
    return {

        value: name,
        label: (
            <div
                key={id}
                onClick={() =>
                    type === "note"
                        ? Router.push("/ada/note/" + id)
                        : type === "brand"
                        ? Router.push("/ada/brand/" + id)
                        : Router.push("/ada/perfume/" + id)
                }
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Montserrat",
                }}
            >
                {name}{title}
                <span>
                    <img
                        src={image}
                        style={{ width: 40, heigth: 40, borderRadius: 20 }}
                        alt=""
                    />
                </span>
            </div>
        ),
    };
};

const SignedInHeader = (props) => {
    const router = useRouter();
    // console.log(router);
    // const { pid } = router.query;
    // console.log(props.profileImage);

    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        await props.getUserProfile(getCookies(null, "authToken"), () => {});

        // if (props && props.user) {
        //     const { image } = props.user;
        //     setUserImage(image);
        //     console.log("updated");
        // }
    };

    const renderTitle = (title, type) => {
        return (
            <>
                <span
                    className={"flexRow"}
                    style={{ justifyContent: "space-between" }}
                >
                    <div
                        style={{
                            fontFamily: "Cormorant Garamond",
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </div>
                    <a
                        onClick={() => Router.push("/ada/search/" + type)}
                        style={{ float: "right" }}
                    >
                        more
                    </a>
                </span>
            </>
        );
    };

    const [searchItem, setSearchItem] = useState(null);

    const [loading, setLoading] = useState(false);

    const [resultOptions, setResultOptions] = useState([
        {
            label: renderTitle("product", "product"),
            options: [],
        },
        {
            label: renderTitle("note", "note"),
            options: [],
        },
        // {
        //     label: renderTitle("brand", "brand"),
        //     options: [],
        // },
    ]);

    const menu = (
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
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
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

    const search = async (item) => {
        setLoading(true);
        console.log(getCookies(null, "authToken"), item);
        const res = await searchAll({
            searchTerm: item,
            token: getCookies(null, "authToken"),
        });
        console.log(res, "resultat")
        // let brandOp = [];
        let perfumeOp = [];
        let noteOp = [];

        // res &&
        //     res.brand &&
        //     res.brand.map((item, index) => {
        //         if (index > 5) return;
        //         brandOp.push(renderItem(item));
        //     });
        res &&
            res.note &&
            res.note.map((item, index) => {
                if (index > 5) return;
                noteOp.push(renderItem(item));
            });
        res &&
            res.parfume &&
            res.parfume.map((item, index) => {
                if (index > 5) return;
                perfumeOp.push(renderItem(item));
            });
        setResultOptions([
            {
                label: renderTitle("Notes", "note"),
                options: noteOp,
            },
            {
                label: renderTitle("Perfume", "perfume"),
                options: perfumeOp,
            },
            // {
            //     label: renderTitle("Brand", "brand"),
            //     options: brandOp,
            // },
        ]);

        setLoading(false);
        console.log(res);
    };

    const { searchBar } = props;
    const contactModal = useRef(null);

    return (
        <div
            id="header-content"
            className={"header-content"}
            style={{
                position: "relative",
                backgroundColor: "#ffffff",
                height: "auto",
            }}
        >
            <div className={"top-menu"}>
                <div className={"leftItemsMenu"}>
                    <Link href={{ pathname: "/ada" }}>
                        <a>
                            <img
                                id="header-logo"
                                className="logo"
                                src={logo}
                                style={{ marginRight: 40, cursor: "pointer" }}
                            />
                        </a>
                    </Link>
                    {/* <Link href="/ada">
                        <img
                            id="header-logo"
                            className="logo"
                            src={logo}
                            style={{ marginRight: 40, cursor: "pointer" }}
                        />
                    </Link> */}
                    {/*         <div><a style={{ color: '#ead7b6' }} onClick={() => Router.push('/search')} >Dashboard ></a> <span>{title}</span></div>
                     */}{" "}
                </div>

                <div
                    style={{
                        width: "30%",
                    }}
                >
                    {searchBar === false ? null : (
                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={500}
                            style={{ width: "100%" }}
                            loading={false}
                            options={resultOptions}
                            notFoundContent={" no data "}
                        >
                            <Input.Search
                                style={{
                                    width: "100%",
                                    height: 48,
                                    alignItems: "center",
                                    fontFamily: "auto",
                                }}
                                // placeholder="Search perfumes, brands, notes..."
                                placeholder="Search products..."
                                allowClear
                                type="search"
                                loading={loading}
                                onChange={(e) => {
                                    setSearchItem(e.target.value);
                                    search(e.target.value);
                                    console.log("change");
                                }}
                                onSearch={() => {
                                    console.log("search");
                                }}
                            />
                        </AutoComplete>
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
                                    router.pathname === "/ada-p"
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
                                    router.pathname === "/ada-n"
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
                                    router.pathname === "/deepnose"
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

                    {/* <div className={"menuBtn"}>
                        <Link href={{ pathname: "/ada-p" }}>
                            <a>ADA-P</a>
                        </Link>
                    </div>
                    <div className={"menuBtn"}>
                        <Link href={{ pathname: "/ada-n" }}>
                            <a>ADA-N</a>
                        </Link>
                    </div> */}

                    {/* <div className={"menuBtn"}>
                        {" "}
                        {props.type === 1 ? "ADA2" : "ADA1"}
                    </div> */}

                    <Dropdown
                        overlay={menu}
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
            <ContactUsModal ref={contactModal} contactUs={props.contactUs} />
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

SignedInHeader.getInitialProps = async (ctx) => {
    return { ctx };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInHeader);
