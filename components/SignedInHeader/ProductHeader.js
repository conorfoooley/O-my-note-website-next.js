import React, { useState, useEffect, useContext, useRef } from "react";
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
import { searchProduct } from "../../api";
import { getCookies } from "cookies-next";
import { logout, getUserProfile } from "../../actions/auth";
import { contactUs } from "../../actions/public";
import ContactUsModal from "../ContactUsModal/contactUsModal";
import { AppContext } from '../../Context/AppContext';
import { URI } from "../../constants/uri";

const ProductHeader = (props) => {
    const [searchItem, setSearchItem] = useState(null);
    const renderItem = (product) => {
        return {
            value: product.product,
            label: (
                <div
                    key={product.id}
                    onClick={() =>
                        // type === "note"
                        //     ? Router.push("/ada/note/" + id)
                        //     : type === "brand"
                        //     ? Router.push("/ada/brand/" + id)
                        //     : Router.push("/ada/perfume/" + id)
                        setSearchItem(product.product)
                    }
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Montserrat",
                    }}
                >
                    {product.product}
                    <span>
                        <img
                            src={URI+product.image}
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            alt=""
                        />
                    </span>
                </div>
            ),
        };
    };
    console.log("searchItem",searchItem);
    const router = useRouter();
    // console.log(router);
    // const { pid } = router.query;
    // console.log(props.profileImage);

    const [userImage, setUserImage] = useState("");
    const {products, setProducts} = useContext(AppContext);
    const {totalPages_, setTotalPages_} = useContext(AppContext);

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

    const renderTitle = (title) => {
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
                    {/* <a
                        onClick={() => Router.push("/ada/search/" + type)}
                        style={{ float: "right" }}
                    >
                        more
                    </a> */}
                </span>
            </>
        );
    };

    const [loading, setLoading] = useState(false);

    const [resultOptions, setResultOptions] = useState([
        {
            label: renderTitle("product"),
            options: [],
        },
        // {
        //     label: renderTitle("note", "note"),
        //     options: [],
        // },
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
        const res = await searchProduct(getCookies(null, "authToken"),item);
        setProducts(res.products);
        setTotalPages_(res.pages);
        let productOption = [];
        res.products &&
            res.products.map((item, index) => {
                if (index > 5) return;
                productOption.push(renderItem(item));
            });
        setResultOptions([
            {
                label: renderTitle("product"),
                options: productOption,
            },
        ]);
        setLoading(false);
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
                    <Link href={{ pathname: "/dashboard/dashboard" }}>
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
                                placeholder="Search products..."
                                allowClear
                                type="search"
                                loading={loading}
                                onChange={(e) => {
                                    setSearchItem(e.target.value);
                                    search(e.target.value);
                                }}
                                onSearch={() => {
                                    search(searchItem);
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
                            // borderRadius: "22px",
                            // borderWidth: "2px",
                            // borderStyle: "solid",
                            // borderColor: "#e8ddd0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            padding: "5px",
                            // boxSizing: "border-box",
                            marginRight: "10px",
                        }}
                    >
                    </div>
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

ProductHeader.getInitialProps = async (ctx) => {
    return { ctx };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductHeader);
