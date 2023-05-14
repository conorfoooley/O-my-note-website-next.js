import React, { useState, useEffect } from "react";
import { privateRoute } from "../components/privateRoute";
import { connect } from "react-redux";
import { Button, List, Input } from "antd";
import { useRouter } from "next/router";
import {
    EditOutlined,
    CloseOutlined,
    RightOutlined,
    UploadOutlined,
    PaperClipOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import { Link as ScrollLink, Element } from "react-scroll";
import SignedInHeader from "../components/SignedInHeader/SignedInHeader";
import SignedInFooter from "../components/SignedInFooter/SignedInFooter";
import Separator from "../components/Separator/Separator";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import { updateUserProfile, getUserProfile } from "../actions/auth";
import { getCookies } from "cookies-next";
import { AuthToken } from "../services/auth_token";
import ProductHeader from "../components/SignedInHeader/ProductHeader";

class Profile extends React.Component {
    static getInitialProps(ctx) {
        return { ctx };
    }

    constructor(props) {
        super(props);
        this.state = {
            address1: "",
            address2: "",
            city: "",
            companyName: "",
            country: "",
            description: "",
            years: "",
            zipCode: "",
            videoUrl: "",
            imageUrl: "",
            image: "",
            imageName: "upload a image ..",
            file: "",
            fileName: "upload a video ..",
            editMode: "",
            loading: true,
        };
    }

    componentDidMount() {
        // this.props.getUserProfileFn(this.props.ctx.token, (res) => {
        this.fetchUserProfile();
    }

    fetchUserProfile = () => {
        this.props.getUserProfileFn(getCookies(null, "authToken"), (res) => {
            // console.log(res["image"]);
            // console.log(res.user.id);
            // console.log(res.user.image);
            res
                ? this.setState((state) => {
                      return {
                        //   ...state,
                        //   address1: res.user.address1,
                        //   address2: res.user.address2,
                        //   city: res.user.city,
                        //   companyName: res.user.companyName,
                        //   country: res.user.country,
                        //   description: res.user.description,
                        //   years: res.user.years_of_experience,
                        //   zipCode: res.user.zipcode,
                        //   videoUrl: res.user.video_url,
                        //   imageUrl: res.user.image,
                        //   loading: false,
                        ...state,
                          address1: res.address1,
                          address2: res.address2,
                          city: res.city,
                          companyName: res.companyName,
                          country: res.country,
                          description: res.description,
                          years: res.years_of_experience,
                          zipCode: res.zipcode,
                          videoUrl: res.video_url,
                          imageUrl: res.image,
                          loading: false,
                      };
                  })
                : null;
        });
    };

    onChangeHandler = (event) => {
        if (event.target.id == "image-input") {
            this.setState({
                image: event.target.files[0],
                imageName: event.target.files[0].name,
            });
            // console.log(this.state.image, this.state.imageName);
        } else {
            this.setState({
                file: event.target.files[0],
                fileName: event.target.files[0].name,
            });
        }
    };

    render() {
        // console.log(this.state);

        return (
            <>
                {/* <SignedInHeader profileImage={this.state.imageUrl} /> */}
                <ProductHeader profileImage={this.state.imageUrl} />
                <div style={{ paddingTop: "7%" }}>
                    <div style={{ display: "flex", height: "100%" }}>
                        <div
                            style={{
                                flex: 0.35,
                                height: "100%",
                                backgroundColor: "#FBFAF9",
                                borderRight: "solid 1px #f0f0f0",
                            }}
                        >
                            <div
                                style={{
                                    width: 250,
                                    backgroundColor: "white",
                                    float: "right",
                                    margin: "75px",
                                    padding: 20,
                                    boxShadow:
                                        "0px 30px 50px 0px rgba(41, 41, 41, 0.15)",
                                    borderRadius: "5px",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <h3>Profile</h3>
                                    {this.state.editMode ? (
                                        <p>Editing..</p>
                                    ) : (
                                        <Button
                                            type="link"
                                            onClick={() =>
                                                this.setState({
                                                    editMode: true,
                                                })
                                            }
                                            style={{
                                                fontSize: 12,
                                                height: 48,
                                                width: "22%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontFamily: "Montserrat",
                                                color: "#1F2A56",
                                            }}
                                        >
                                            Edit
                                            <EditOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    marginLeft: "5px",
                                                }}
                                            />
                                        </Button>
                                    )}
                                </div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {
                                            title: "About yourself",
                                            link: "user-description",
                                        },
                                        {
                                            title: "Years of experience",
                                            link: "user-years",
                                        },
                                        {
                                            title: "Perfumery address",
                                            link: "user-address",
                                        },
                                        {
                                            title: "License",
                                            link: "user-license",
                                        },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            style={{ cursor: "pointer" }}
                                        >
                                            <ScrollLink
                                                to={item.link}
                                                offset={-80}
                                                spy={true}
                                                smooth={true}
                                                duration={500}
                                            >
                                                <Button
                                                    style={{
                                                        float: "left",
                                                        color: "#cfb992",
                                                        paddingLeft: 0,
                                                        fontSize: 16,
                                                    }}
                                                    shape="link"
                                                >
                                                    <span
                                                        style={{
                                                            textDecoration:
                                                                "underline",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </span>
                                                </Button>
                                            </ScrollLink>
                                            <RightOutlined
                                                style={{
                                                    float: "right",
                                                    color: "#cfb992",
                                                }}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                flex: 0.65,
                                height: "100%",
                                backgroundColor: "#fff",
                                paddingBottom: 50,
                                paddingTop: 40,
                            }}
                        >
                            {this.state.editMode ? (
                                <div
                                    style={{
                                        paddingLeft: 58,
                                        paddingRight: 58,
                                    }}
                                >
                                    <div
                                        className="client-list-header"
                                        style={{
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            width: "100%",
                                        }}
                                    >
                                        <h2
                                            className="client-list-title"
                                            style={{
                                                whiteSpace: "nowrap",
                                                marginRight: 10,
                                            }}
                                        >
                                            About yourself
                                        </h2>
                                        <Separator size="full" />
                                    </div>
                                    <div>
                                        <div className="section-form">
                                            <label
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12,
                                                }}
                                            >
                                                DESCRIBE YOURSELF
                                            </label>
                                            <textarea
                                                name="description"
                                                onChange={(e) =>
                                                    this.setState({
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Start typing here ..."
                                                required
                                                value={this.state.description}
                                            >
                                                {/* {description} */}
                                            </textarea>
                                            {/* Upload Image */}
                                            <label
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12,
                                                }}
                                            >
                                                UPLOAD PROFILE IMAGE
                                            </label>
                                            <label
                                                id="upload-image"
                                                htmlFor="image-input"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "space-around",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    height: 300,
                                                    border: "solid 1px #f0f0f0",
                                                    borderRadius: "5px",
                                                    backgroundColor: "#FBFAF9",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        borderRadius: "50%",
                                                        width: 100,
                                                        height: 100,
                                                        lineHeight: "100px",
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        textAlign: "center",
                                                        background: "#fff",
                                                    }}
                                                >
                                                    <UploadOutlined
                                                        style={{
                                                            fontSize: 40,
                                                            color: "gray",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3
                                                        style={{ fontSize: 28 }}
                                                    >
                                                        Click or drag file to
                                                        this area to upload
                                                    </h3>
                                                </div>
                                                <input
                                                    id="image-input"
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={
                                                        this.onChangeHandler
                                                    }
                                                    style={{ display: "none" }}
                                                />
                                            </label>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "flex-start",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    height: 40,
                                                    border: "solid 1px #f0f0f0",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <PaperClipOutlined
                                                    style={{
                                                        fontSize: 12,
                                                        padding: 10,
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {this.state.imageName}
                                                </p>
                                            </div>

                                            {/* Upload Video */}
                                            <label
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12,
                                                }}
                                            >
                                                UPLOAD VIDEO
                                            </label>
                                            <label
                                                id="upload-video"
                                                htmlFor="file-input"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "space-around",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    height: 300,
                                                    border: "solid 1px #f0f0f0",
                                                    borderRadius: "5px",
                                                    backgroundColor: "#FBFAF9",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        borderRadius: "50%",
                                                        width: 100,
                                                        height: 100,
                                                        lineHeight: "100px",
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        textAlign: "center",
                                                        background: "#fff",
                                                    }}
                                                >
                                                    <UploadOutlined
                                                        style={{
                                                            fontSize: 40,
                                                            color: "gray",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3
                                                        style={{ fontSize: 28 }}
                                                    >
                                                        Click or drag file to
                                                        this area to upload
                                                    </h3>
                                                </div>
                                                <input
                                                    id="file-input"
                                                    type="file"
                                                    name="file"
                                                    accept="video/mp4,video/x-m4v,video/*"
                                                    onChange={
                                                        this.onChangeHandler
                                                    }
                                                    style={{ display: "none" }}
                                                />
                                            </label>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "flex-start",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    height: 40,
                                                    border: "solid 1px #f0f0f0",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <PaperClipOutlined
                                                    style={{
                                                        fontSize: 12,
                                                        padding: 10,
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {this.state.fileName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="client-list-header"
                                            style={{
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <h2
                                                className="client-list-title"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    marginRight: 10,
                                                }}
                                            >
                                                Years of experience
                                            </h2>
                                            <Separator size="full" />
                                        </div>
                                        <div className="profile-section-form">
                                            <label
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12,
                                                }}
                                            >
                                                YEARS OF EXPERIENCE
                                            </label>
                                            <div
                                                style={{ position: "relative" }}
                                            >
                                                <Input
                                                    /* type='number' */
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        float: "left",
                                                        width: "100%",
                                                        height: 40,
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        borderRadius: "5px",
                                                        zIndex: 2,
                                                    }}
                                                    value={this.state.years}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            years:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="Years of experience"
                                                    type={"number"}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        right: 0,
                                                        top: 0,
                                                        backgroundColor:
                                                            "#fafafa",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        height: 40,
                                                        flexDirection: "row",
                                                        borderTopRightRadius:
                                                            "5px",
                                                        borderBottomRightRadius:
                                                            "5px",
                                                        zIndex: 0,
                                                    }}
                                                >
                                                    <div
                                                        onClick={() => {
                                                            console.log(
                                                                "clicked"
                                                            );
                                                        }}
                                                        style={{
                                                            cursor: "pointer",
                                                            zIndex: 10,
                                                            fontSize: 20,
                                                            textAlign: "center",
                                                            height: "100%",
                                                            width: 40,
                                                            border:
                                                                "solid 1px #f0f0f0",
                                                        }}
                                                    >
                                                        <MinusCircleOutlined />
                                                    </div>
                                                    <div
                                                        style={{
                                                            cursor: "pointer",
                                                            zIndex: 10,
                                                            fontSize: 20,
                                                            textAlign: "center",
                                                            height: "100%",
                                                            width: 40,
                                                            border:
                                                                "solid 1px transparent",
                                                        }}
                                                    >
                                                        <PlusCircleOutlined />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-section-form">
                                        <div
                                            className="client-list-header"
                                            style={{
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <h2
                                                className="client-list-title"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    marginRight: 10,
                                                }}
                                            >
                                                Perfumery address
                                            </h2>
                                            <Separator size="full" />
                                        </div>
                                        <label
                                            style={{
                                                fontFamily: "Montserrat",
                                                fontSize: 12,
                                            }}
                                        >
                                            COMPANY NAME
                                        </label>
                                        <Input
                                            style={{
                                                fontFamily: "Montserrat",
                                                fontSize: 12,
                                                float: "left",
                                                width: "100%",
                                                height: 40,
                                                border: "solid 1px #f0f0f0",
                                                borderRadius: "5px",
                                                zIndex: 2,
                                            }}
                                            placeholder="Company name"
                                            value={this.state.companyName}
                                            onChange={(e) =>
                                                this.setState({
                                                    companyName: e.target.value,
                                                })
                                            }
                                        />
                                        <div>
                                            <div
                                                style={{
                                                    width: "48%",
                                                    float: "left",
                                                }}
                                            >
                                                <label
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    ADDRESS LINE 1
                                                </label>

                                                <Input
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        float: "left",
                                                        width: "100%",
                                                        height: 40,
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        borderRadius: "5px",
                                                        zIndex: 2,
                                                    }}
                                                    placeholder="Address line 1"
                                                    value={this.state.address1}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            address1:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "48%",
                                                    float: "right",
                                                }}
                                            >
                                                <label
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    ADDRESS LINE 2
                                                </label>

                                                <Input
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        float: "left",
                                                        width: "100%",
                                                        height: 40,
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        borderRadius: "5px",
                                                        zIndex: 2,
                                                    }}
                                                    placeholder="Address line 2"
                                                    value={this.state.address2}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            address2:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: "inline-flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "30%",
                                                }}
                                            >
                                                <label
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    CITY
                                                </label>

                                                <Input
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        float: "left",
                                                        width: "100%",
                                                        height: 40,
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        borderRadius: "5px",
                                                        zIndex: 2,
                                                    }}
                                                    placeholder="City"
                                                    value={this.state.city}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            city:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "14%",
                                                }}
                                            >
                                                <label
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    ZIP CODE
                                                </label>

                                                <Input
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        float: "left",
                                                        width: "100%",
                                                        height: 40,
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        borderRadius: "5px",
                                                        zIndex: 2,
                                                    }}
                                                    placeholder="Zip Code"
                                                    value={this.state.zipCode}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            zipCode:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "48%",
                                                }}
                                            >
                                                <label
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    COUNTRY
                                                </label>

                                                <Input
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        float: "left",
                                                        width: "100%",
                                                        height: 40,
                                                        border:
                                                            "solid 1px #f0f0f0",
                                                        borderRadius: "5px",
                                                        zIndex: 2,
                                                    }}
                                                    placeholder="Country"
                                                    value={this.state.country}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            country:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                type="link"
                                                onClick={() =>
                                                    this.setState({
                                                        editMode: false,
                                                    })
                                                }
                                                style={{
                                                    fontSize: 12,
                                                    height: 48,
                                                    width: "22%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    float: "left",
                                                    fontFamily: "Montserrat",
                                                    color: "#D94646",
                                                    marginTop: 50,
                                                }}
                                            >
                                                CANCEL
                                                <CloseOutlined
                                                    style={{
                                                        fontSize: "14px",
                                                        marginLeft: "5px",
                                                    }}
                                                />
                                            </Button>

                                            <Button
                                                shape="round"
                                                htmlType="submit"
                                                onClick={() => {
                                                    var formData = new FormData();

                                                    if (this.state.file)
                                                        formData.append(
                                                            "video_url",
                                                            this.state.file
                                                        );
                                                    if (this.state.image)
                                                        formData.append(
                                                            "image",
                                                            this.state.image
                                                        );
                                                    if (this.state.address1)
                                                        formData.set(
                                                            "address_line1",
                                                            this.state.address1
                                                        );
                                                    if (this.state.address2)
                                                        formData.set(
                                                            "address_line2",
                                                            this.state.address2
                                                        );
                                                    if (this.state.companyName)
                                                        formData.set(
                                                            "company_name",
                                                            this.state
                                                                .companyName
                                                        );
                                                    if (this.state.city)
                                                        formData.set(
                                                            "city",
                                                            this.state.city
                                                        );
                                                    if (this.state.country)
                                                        formData.set(
                                                            "country",
                                                            this.state.country
                                                        );
                                                    if (this.state.description)
                                                        formData.set(
                                                            "description",
                                                            this.state
                                                                .description
                                                        );
                                                    if (this.state.years)
                                                        formData.set(
                                                            "years_of_experience",
                                                            this.state.years
                                                        );
                                                    if (this.state.zipCode)
                                                        formData.set(
                                                            "zipcode",
                                                            this.state.zipCode
                                                        );

                                                    if (
                                                        formData.keys().next()
                                                            .value
                                                    ) {
                                                        this.props.updateUserProfileFn(
                                                            formData,
                                                            this.props.user.id,
                                                            this.props.ctx
                                                                .token,
                                                            () => {
                                                                this.setState({
                                                                    editMode: false,
                                                                    loading: false,
                                                                });

                                                                this.fetchUserProfile();

                                                                // fetchUserData();
                                                                // window.location.reload();
                                                                // console.log(props);
                                                                // router.push("/ada");
                                                            }
                                                        );
                                                    } else
                                                        this.setState({
                                                            editMode: false,
                                                        });
                                                }}
                                                style={{
                                                    fontSize: 12,
                                                    height: 48,
                                                    width: "22%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    float: "right",
                                                    fontFamily: "Montserrat",
                                                    backgroundColor: "#1F2A56",
                                                    color: "#fff",
                                                    marginTop: 50,
                                                }}
                                            >
                                                SAVE CHANGES
                                                <CheckOutlined
                                                    style={{
                                                        fontSize: "16px",
                                                        marginLeft: "5px",
                                                    }}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : this.state.loading ? (
                                <div
                                    style={{
                                        paddingLeft: 58,
                                        paddingRight: 58,
                                    }}
                                >
                                    <h3 style={{ textAlign: "center" }}>
                                        Loading....
                                    </h3>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        paddingLeft: 58,
                                        paddingRight: 58,
                                    }}
                                >
                                    <Element
                                        name="user-description"
                                        className="element"
                                    >
                                        <div
                                            className="client-list-header"
                                            style={{
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <h2
                                                className="client-list-title"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    marginRight: 10,
                                                }}
                                            >
                                                About yourself
                                            </h2>
                                            <Separator size="full" />
                                        </div>
                                    </Element>
                                    <div>
                                        <div className="section-form">
                                            <label
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12,
                                                }}
                                            >
                                                DESCRIPTION
                                            </label>
                                            <p>{this.state.description}</p>
                                            <label
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12,
                                                    marginTop: 20,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                PROFILE IMAGE
                                            </label>
                                            {this.state.imageUrl ? (
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            this.state.imageUrl
                                                        }
                                                        alt="Profile"
                                                        width="50%"
                                                    />
                                                </div>
                                            ) : null}

                                            <label
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12,
                                                    marginTop: 20,
                                                }}
                                            >
                                                VIDEO
                                            </label>
                                            <div
                                                id="video-player"
                                                style={{
                                                    width: "100%",
                                                    border: "solid 1px #f0f0f0",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <VideoPlayer
                                                    URL={this.state.videoUrl}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Element
                                                name="user-years"
                                                className="element"
                                            >
                                                <div
                                                    className="client-list-header"
                                                    style={{
                                                        paddingLeft: 0,
                                                        paddingRight: 0,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <h2
                                                        className="client-list-title"
                                                        style={{
                                                            whiteSpace:
                                                                "nowrap",
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        Years of experience
                                                    </h2>
                                                    <Separator size="full" />
                                                </div>
                                            </Element>
                                            <div className="profile-section-form">
                                                <label
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    YEARS OF EXPERIENCE
                                                </label>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Input
                                                        style={{
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: 12,
                                                            float: "left",
                                                            width: "100%",
                                                            height: 40,
                                                            border:
                                                                "solid 1px #f0f0f0",
                                                            borderRadius: "5px",
                                                            zIndex: 2,
                                                        }}
                                                        value={this.state.years}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-section-form">
                                            <Element
                                                name="user-address"
                                                className="element"
                                            >
                                                <div
                                                    className="client-list-header"
                                                    style={{
                                                        paddingLeft: 0,
                                                        paddingRight: 0,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <h2
                                                        className="client-list-title"
                                                        style={{
                                                            whiteSpace:
                                                                "nowrap",
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        Perfumery address
                                                    </h2>
                                                    <Separator size="full" />
                                                </div>
                                            </Element>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    COMPANY NAME :
                                                </h4>
                                                <p>{this.state.companyName}</p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    ADDRESS :
                                                </h4>
                                                <p>
                                                    {this.state.address1},{" "}
                                                    {this.state.address2}
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    ZIP CODE :
                                                </h4>
                                                <p>{this.state.zipCode}</p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    CITY :
                                                </h4>
                                                <p>{this.state.city}</p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    COUNTRY :
                                                </h4>
                                                <p>{this.state.country}</p>
                                            </div>
                                        </div>
                                        <div className="profile-section-form">
                                            <Element
                                                name="user-license"
                                                className="element"
                                            >
                                                <div
                                                    className="client-list-header"
                                                    style={{
                                                        paddingLeft: 0,
                                                        paddingRight: 0,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <h2
                                                        className="client-list-title"
                                                        style={{
                                                            whiteSpace:
                                                                "nowrap",
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        License
                                                    </h2>
                                                    <Separator size="full" />
                                                </div>
                                            </Element>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: 12,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    LICENSE TYPE :
                                                </h4>
                                                <p>
                                                    {/* {this.props &&
                                                        this.props.user &&
                                                        this.props.user.package.toUpperCase()} */}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <SignedInFooter />
            </>
        );
    }
}

// const Profile = (props) => {
//     const router = useRouter();
//     const [address1, setAddress1] = useState("");
//     const [address2, setAddress2] = useState("");
//     const [city, setCity] = useState("");
//     const [companyName, setCompanyName] = useState("");
//     const [country, setCountry] = useState("");
//     const [description, setDescription] = useState("");
//     const [years, setYears] = useState(0);
//     const [zipCode, setZipCode] = useState(0);
//     const [videoUrl, setVideoUrl] = useState("");
//     const [imageUrl, setImageUrl] = useState("");

//     const [image, setImage] = useState(null);
//     const [imageName, setImageName] = useState("upload a image ..");
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState("upload a video ..");
//     const [editMode, setEditMode] = useState(false);

//     const [loading, setLoading] = useState(true);

//     const [user, setUser] = useState({});
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         fetchUserData();

//         // console.log(user);
//     }, []);

//     const fetchUserData = async () => {
//         // await props.getUserProfile(props.ctx.token, () => {});
//         const getUser = await props.getUserProfileFn(
//             getCookies(null, "authToken"),
//             (res) => {
//                 console.log(res);
//             }
//         );

//         console.log(getUser);

//         setTimeout(() => {
//             if (props && props.user) {
//                 const {
//                     address_line1,
//                     address_line2,
//                     city,
//                     company_name,
//                     country,
//                     description,
//                     years_of_experience,
//                     zipcode,
//                     video_url,
//                     image,
//                 } = props.user;
//                 setAddress1(address_line1);
//                 setAddress2(address_line2);
//                 setCity(city);
//                 setCompanyName(company_name);
//                 setCountry(country);
//                 setDescription(description);
//                 setYears(years_of_experience);
//                 setZipCode(zipcode);
//                 setImageUrl(image);
//                 setVideoUrl(video_url);
//                 console.log("updated");

//                 setLoading(false);
//             }
//         }, 2000);
//     };

//     const onChangeHandler = (event) => {
//         if (event.target.id == "image-input") {
//             setImage(event.target.files[0]);
//             setImageName(event.target.files[0].name);
//         } else {
//             setFile(event.target.files[0]);
//             setFileName(event.target.files[0].name);
//         }
//     };

//     return (
//         <>
//             <SignedInHeader />
//             <div style={{ paddingTop: "7%" }}>
//                 <div style={{ display: "flex", height: "100%" }}>
//                     <div
//                         style={{
//                             flex: 0.35,
//                             height: "100%",
//                             backgroundColor: "#FBFAF9",
//                             borderRight: "solid 1px #f0f0f0",
//                         }}
//                     >
//                         <div
//                             style={{
//                                 width: 250,
//                                 backgroundColor: "white",
//                                 float: "right",
//                                 margin: "75px",
//                                 padding: 20,
//                                 boxShadow:
//                                     "0px 30px 50px 0px rgba(41, 41, 41, 0.15)",
//                                 borderRadius: "5px",
//                                 position: "relative",
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     width: "100%",
//                                     display: "flex",
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                 }}
//                             >
//                                 <h3>Profile</h3>
//                                 {editMode ? (
//                                     <p>Editing..</p>
//                                 ) : (
//                                     <Button
//                                         type="link"
//                                         onClick={() => setEditMode(true)}
//                                         style={{
//                                             fontSize: 12,
//                                             height: 48,
//                                             width: "22%",
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             alignItems: "center",
//                                             fontFamily: "Montserrat",
//                                             color: "#1F2A56",
//                                         }}
//                                     >
//                                         Edit
//                                         <EditOutlined
//                                             style={{
//                                                 fontSize: "16px",
//                                                 marginLeft: "5px",
//                                             }}
//                                         />
//                                     </Button>
//                                 )}
//                             </div>
//                             <List
//                                 itemLayout="horizontal"
//                                 dataSource={[
//                                     {
//                                         title: "About yourself",
//                                         link: "user-description",
//                                     },
//                                     {
//                                         title: "Years of experience",
//                                         link: "user-years",
//                                     },
//                                     {
//                                         title: "Perfumery address",
//                                         link: "user-address",
//                                     },
//                                     { title: "License", link: "user-license" },
//                                 ]}
//                                 renderItem={(item) => (
//                                     <List.Item style={{ cursor: "pointer" }}>
//                                         <ScrollLink
//                                             to={item.link}
//                                             offset={-80}
//                                             spy={true}
//                                             smooth={true}
//                                             duration={500}
//                                         >
//                                             <Button
//                                                 style={{
//                                                     /*       color: 'gray',*/
//                                                     float: "left",
//                                                     color: "#cfb992",
//                                                     paddingLeft: 0,
//                                                     fontSize: 16,
//                                                 }}
//                                                 shape="link"
//                                             >
//                                                 <span
//                                                     style={{
//                                                         textDecoration:
//                                                             "underline",
//                                                     }}
//                                                 >
//                                                     {item.title}
//                                                 </span>
//                                             </Button>
//                                         </ScrollLink>
//                                         <RightOutlined
//                                             style={{
//                                                 float: "right",
//                                                 color: "#cfb992",
//                                             }}
//                                         />
//                                     </List.Item>
//                                 )}
//                             />
//                         </div>
//                     </div>

//                     <div
//                         style={{
//                             flex: 0.65,
//                             height: "100%",
//                             backgroundColor: "#fff",
//                             paddingBottom: 50,
//                             paddingTop: 40,
//                         }}
//                     >
//                         {editMode ? (
//                             <div style={{ paddingLeft: 58, paddingRight: 58 }}>
//                                 <div
//                                     className="client-list-header"
//                                     style={{
//                                         paddingLeft: 0,
//                                         paddingRight: 0,
//                                         width: "100%",
//                                     }}
//                                 >
//                                     <h2
//                                         className="client-list-title"
//                                         style={{
//                                             whiteSpace: "nowrap",
//                                             marginRight: 10,
//                                         }}
//                                     >
//                                         About yourself
//                                     </h2>
//                                     <Separator size="full" />
//                                 </div>
//                                 <div>
//                                     <div className="section-form">
//                                         <label
//                                             style={{
//                                                 fontFamily: "Montserrat",
//                                                 fontSize: 12,
//                                             }}
//                                         >
//                                             DESCRIBE YOURSELF
//                                         </label>
//                                         <textarea
//                                             name="description"
//                                             onChange={(e) =>
//                                                 setDescription(e.target.value)
//                                             }
//                                             placeholder="Start typing here ..."
//                                             required
//                                             value={description}
//                                         >
//                                             {/* {description} */}
//                                         </textarea>
//                                         {/* Upload Image */}
//                                         <label
//                                             style={{
//                                                 fontFamily: "Montserrat",
//                                                 fontSize: 12,
//                                             }}
//                                         >
//                                             UPLOAD PROFILE IMAGE
//                                         </label>
//                                         <label
//                                             id="upload-image"
//                                             htmlFor="image-input"
//                                             style={{
//                                                 display: "flex",
//                                                 flexDirection: "column",
//                                                 justifyContent: "space-around",
//                                                 alignItems: "center",
//                                                 width: "100%",
//                                                 height: 300,
//                                                 border: "solid 1px #f0f0f0",
//                                                 borderRadius: "5px",
//                                                 backgroundColor: "#FBFAF9",
//                                                 cursor: "pointer",
//                                             }}
//                                         >
//                                             <div
//                                                 style={{
//                                                     borderRadius: "50%",
//                                                     width: 100,
//                                                     height: 100,
//                                                     lineHeight: "100px",
//                                                     border: "solid 1px #f0f0f0",
//                                                     textAlign: "center",
//                                                     background: "#fff",
//                                                 }}
//                                             >
//                                                 <UploadOutlined
//                                                     style={{
//                                                         fontSize: 40,
//                                                         color: "gray",
//                                                     }}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <h3 style={{ fontSize: 28 }}>
//                                                     Click or drag file to this
//                                                     area to upload
//                                                 </h3>
//                                             </div>
//                                             <input
//                                                 id="image-input"
//                                                 type="file"
//                                                 name="image"
//                                                 accept="image/*"
//                                                 onChange={onChangeHandler}
//                                                 style={{ display: "none" }}
//                                             />
//                                         </label>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 flexDirection: "row",
//                                                 justifyContent: "flex-start",
//                                                 alignItems: "center",
//                                                 width: "100%",
//                                                 height: 40,
//                                                 border: "solid 1px #f0f0f0",
//                                                 borderRadius: "5px",
//                                             }}
//                                         >
//                                             <PaperClipOutlined
//                                                 style={{
//                                                     fontSize: 12,
//                                                     padding: 10,
//                                                 }}
//                                             />
//                                             <p
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 {imageName}
//                                             </p>
//                                         </div>

//                                         {/* Upload Video */}
//                                         <label
//                                             style={{
//                                                 fontFamily: "Montserrat",
//                                                 fontSize: 12,
//                                             }}
//                                         >
//                                             UPLOAD VIDEO
//                                         </label>
//                                         <label
//                                             id="upload-video"
//                                             htmlFor="file-input"
//                                             style={{
//                                                 display: "flex",
//                                                 flexDirection: "column",
//                                                 justifyContent: "space-around",
//                                                 alignItems: "center",
//                                                 width: "100%",
//                                                 height: 300,
//                                                 border: "solid 1px #f0f0f0",
//                                                 borderRadius: "5px",
//                                                 backgroundColor: "#FBFAF9",
//                                                 cursor: "pointer",
//                                             }}
//                                         >
//                                             <div
//                                                 style={{
//                                                     borderRadius: "50%",
//                                                     width: 100,
//                                                     height: 100,
//                                                     lineHeight: "100px",
//                                                     border: "solid 1px #f0f0f0",
//                                                     textAlign: "center",
//                                                     background: "#fff",
//                                                 }}
//                                             >
//                                                 <UploadOutlined
//                                                     style={{
//                                                         fontSize: 40,
//                                                         color: "gray",
//                                                     }}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <h3 style={{ fontSize: 28 }}>
//                                                     Click or drag file to this
//                                                     area to upload
//                                                 </h3>
//                                             </div>
//                                             <input
//                                                 id="file-input"
//                                                 type="file"
//                                                 name="file"
//                                                 accept="video/mp4,video/x-m4v,video/*"
//                                                 onChange={onChangeHandler}
//                                                 style={{ display: "none" }}
//                                             />
//                                         </label>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 flexDirection: "row",
//                                                 justifyContent: "flex-start",
//                                                 alignItems: "center",
//                                                 width: "100%",
//                                                 height: 40,
//                                                 border: "solid 1px #f0f0f0",
//                                                 borderRadius: "5px",
//                                             }}
//                                         >
//                                             <PaperClipOutlined
//                                                 style={{
//                                                     fontSize: 12,
//                                                     padding: 10,
//                                                 }}
//                                             />
//                                             <p
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 {fileName}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div
//                                         className="client-list-header"
//                                         style={{
//                                             paddingLeft: 0,
//                                             paddingRight: 0,
//                                             width: "100%",
//                                         }}
//                                     >
//                                         <h2
//                                             className="client-list-title"
//                                             style={{
//                                                 whiteSpace: "nowrap",
//                                                 marginRight: 10,
//                                             }}
//                                         >
//                                             Years of experience
//                                         </h2>
//                                         <Separator size="full" />
//                                     </div>
//                                     <div className="profile-section-form">
//                                         <label
//                                             style={{
//                                                 fontFamily: "Montserrat",
//                                                 fontSize: 12,
//                                             }}
//                                         >
//                                             YEARS OF EXPERIENCE
//                                         </label>
//                                         <div style={{ position: "relative" }}>
//                                             <Input
//                                                 /* type='number' */
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     float: "left",
//                                                     width: "100%",
//                                                     height: 40,
//                                                     border: "solid 1px #f0f0f0",
//                                                     borderRadius: "5px",
//                                                     zIndex: 2,
//                                                 }}
//                                                 value={years}
//                                                 onChange={(e) =>
//                                                     setYears(e.target.value)
//                                                 }
//                                                 placeholder="Years of experience"
//                                                 type={"number"}
//                                             />
//                                             <div
//                                                 style={{
//                                                     position: "absolute",
//                                                     right: 0,
//                                                     top: 0,
//                                                     backgroundColor: "#fafafa",
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     height: 40,
//                                                     flexDirection: "row",
//                                                     borderTopRightRadius: "5px",
//                                                     borderBottomRightRadius:
//                                                         "5px",
//                                                     zIndex: 0,
//                                                 }}
//                                             >
//                                                 <div
//                                                     onClick={() => {
//                                                         console.log("clicked");
//                                                     }}
//                                                     style={{
//                                                         cursor: "pointer",
//                                                         zIndex: 10,
//                                                         fontSize: 20,
//                                                         textAlign: "center",
//                                                         height: "100%",
//                                                         width: 40,
//                                                         border:
//                                                             "solid 1px #f0f0f0",
//                                                     }}
//                                                 >
//                                                     <MinusCircleOutlined />
//                                                 </div>
//                                                 <div
//                                                     style={{
//                                                         cursor: "pointer",
//                                                         zIndex: 10,
//                                                         fontSize: 20,
//                                                         textAlign: "center",
//                                                         height: "100%",
//                                                         width: 40,
//                                                         border:
//                                                             "solid 1px transparent",
//                                                     }}
//                                                 >
//                                                     <PlusCircleOutlined />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="profile-section-form">
//                                     <div
//                                         className="client-list-header"
//                                         style={{
//                                             paddingLeft: 0,
//                                             paddingRight: 0,
//                                             width: "100%",
//                                         }}
//                                     >
//                                         <h2
//                                             className="client-list-title"
//                                             style={{
//                                                 whiteSpace: "nowrap",
//                                                 marginRight: 10,
//                                             }}
//                                         >
//                                             Perfumery address
//                                         </h2>
//                                         <Separator size="full" />
//                                     </div>
//                                     <label
//                                         style={{
//                                             fontFamily: "Montserrat",
//                                             fontSize: 12,
//                                         }}
//                                     >
//                                         COMPANY NAME
//                                     </label>
//                                     <Input
//                                         style={{
//                                             fontFamily: "Montserrat",
//                                             fontSize: 12,
//                                             float: "left",
//                                             width: "100%",
//                                             height: 40,
//                                             border: "solid 1px #f0f0f0",
//                                             borderRadius: "5px",
//                                             zIndex: 2,
//                                         }}
//                                         placeholder="Company name"
//                                         value={companyName}
//                                         onChange={(e) =>
//                                             setCompanyName(e.target.value)
//                                         }
//                                     />
//                                     <div>
//                                         <div
//                                             style={{
//                                                 width: "48%",
//                                                 float: "left",
//                                             }}
//                                         >
//                                             <label
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 ADDRESS LINE 1
//                                             </label>

//                                             <Input
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     float: "left",
//                                                     width: "100%",
//                                                     height: 40,
//                                                     border: "solid 1px #f0f0f0",
//                                                     borderRadius: "5px",
//                                                     zIndex: 2,
//                                                 }}
//                                                 placeholder="Address line 1"
//                                                 value={address1}
//                                                 onChange={(e) =>
//                                                     setAddress1(e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                         <div
//                                             style={{
//                                                 width: "48%",
//                                                 float: "right",
//                                             }}
//                                         >
//                                             <label
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 ADDRESS LINE 2
//                                             </label>

//                                             <Input
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     float: "left",
//                                                     width: "100%",
//                                                     height: 40,
//                                                     border: "solid 1px #f0f0f0",
//                                                     borderRadius: "5px",
//                                                     zIndex: 2,
//                                                 }}
//                                                 placeholder="Address line 2"
//                                                 value={address2}
//                                                 onChange={(e) =>
//                                                     setAddress2(e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                     <div
//                                         style={{
//                                             display: "inline-flex",
//                                             width: "100%",
//                                             justifyContent: "space-between",
//                                         }}
//                                     >
//                                         <div
//                                             style={{
//                                                 width: "30%",
//                                             }}
//                                         >
//                                             <label
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 CITY
//                                             </label>

//                                             <Input
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     float: "left",
//                                                     width: "100%",
//                                                     height: 40,
//                                                     border: "solid 1px #f0f0f0",
//                                                     borderRadius: "5px",
//                                                     zIndex: 2,
//                                                 }}
//                                                 placeholder="City"
//                                                 value={city}
//                                                 onChange={(e) =>
//                                                     setCity(e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                         <div
//                                             style={{
//                                                 width: "14%",
//                                             }}
//                                         >
//                                             <label
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 ZIP CODE
//                                             </label>

//                                             <Input
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     float: "left",
//                                                     width: "100%",
//                                                     height: 40,
//                                                     border: "solid 1px #f0f0f0",
//                                                     borderRadius: "5px",
//                                                     zIndex: 2,
//                                                 }}
//                                                 placeholder="Zip Code"
//                                                 value={zipCode}
//                                                 onChange={(e) =>
//                                                     setZipCode(e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                         <div
//                                             style={{
//                                                 width: "48%",
//                                             }}
//                                         >
//                                             <label
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 COUNTRY
//                                             </label>

//                                             <Input
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     float: "left",
//                                                     width: "100%",
//                                                     height: 40,
//                                                     border: "solid 1px #f0f0f0",
//                                                     borderRadius: "5px",
//                                                     zIndex: 2,
//                                                 }}
//                                                 placeholder="Country"
//                                                 value={country}
//                                                 onChange={(e) =>
//                                                     setCountry(e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <Button
//                                             type="link"
//                                             onClick={() => setEditMode(false)}
//                                             style={{
//                                                 fontSize: 12,
//                                                 height: 48,
//                                                 width: "22%",
//                                                 display: "flex",
//                                                 justifyContent: "center",
//                                                 float: "left",
//                                                 fontFamily: "Montserrat",
//                                                 color: "#D94646",
//                                                 marginTop: 50,
//                                             }}
//                                         >
//                                             CANCEL
//                                             <CloseOutlined
//                                                 style={{
//                                                     fontSize: "14px",
//                                                     marginLeft: "5px",
//                                                 }}
//                                             />
//                                         </Button>

//                                         <Button
//                                             shape="round"
//                                             htmlType="submit"
//                                             onClick={() => {
//                                                 var formData = new FormData();

//                                                 if (file)
//                                                     formData.append(
//                                                         "video_url",
//                                                         file
//                                                     );
//                                                 if (image)
//                                                     formData.append(
//                                                         "image",
//                                                         image
//                                                     );
//                                                 if (address1)
//                                                     formData.set(
//                                                         "address_line1",
//                                                         address1
//                                                     );
//                                                 if (address2)
//                                                     formData.set(
//                                                         "address_line2",
//                                                         address2
//                                                     );
//                                                 if (companyName)
//                                                     formData.set(
//                                                         "company_name",
//                                                         companyName
//                                                     );
//                                                 if (city)
//                                                     formData.set("city", city);
//                                                 if (country)
//                                                     formData.set(
//                                                         "country",
//                                                         country
//                                                     );
//                                                 if (description)
//                                                     formData.set(
//                                                         "description",
//                                                         description
//                                                     );
//                                                 if (years)
//                                                     formData.set(
//                                                         "years_of_experience",
//                                                         years
//                                                     );
//                                                 if (zipCode)
//                                                     formData.set(
//                                                         "zipcode",
//                                                         zipCode
//                                                     );

//                                                 // console.log(
//                                                 //     formData.keys().next().value
//                                                 // );
//                                                 // console.log(props.user);
//                                                 if (
//                                                     formData.keys().next().value
//                                                 ) {
//                                                     props.updateUserProfileFn(
//                                                         formData,
//                                                         props.user.id,
//                                                         props.ctx.token,
//                                                         () => {
//                                                             setEditMode(false);
//                                                             setLoading(true);
//                                                             fetchUserData();
//                                                             // window.location.reload();
//                                                             // console.log(props);
//                                                             // router.push("/ada");
//                                                         }
//                                                     );
//                                                 } else setEditMode(false);
//                                             }}
//                                             style={{
//                                                 fontSize: 12,
//                                                 height: 48,
//                                                 width: "22%",
//                                                 display: "flex",
//                                                 justifyContent: "center",
//                                                 alignItems: "center",
//                                                 float: "right",
//                                                 fontFamily: "Montserrat",
//                                                 backgroundColor: "#1F2A56",
//                                                 color: "#fff",
//                                                 marginTop: 50,
//                                             }}
//                                         >
//                                             SAVE CHANGES
//                                             <CheckOutlined
//                                                 style={{
//                                                     fontSize: "16px",
//                                                     marginLeft: "5px",
//                                                 }}
//                                             />
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : loading ? (
//                             <div style={{ paddingLeft: 58, paddingRight: 58 }}>
//                                 <h3 style={{ textAlign: "center" }}>
//                                     Loading....
//                                 </h3>
//                             </div>
//                         ) : (
//                             <div style={{ paddingLeft: 58, paddingRight: 58 }}>
//                                 <Element
//                                     name="user-description"
//                                     className="element"
//                                 >
//                                     <div
//                                         className="client-list-header"
//                                         style={{
//                                             paddingLeft: 0,
//                                             paddingRight: 0,
//                                             width: "100%",
//                                         }}
//                                     >
//                                         <h2
//                                             className="client-list-title"
//                                             style={{
//                                                 whiteSpace: "nowrap",
//                                                 marginRight: 10,
//                                             }}
//                                         >
//                                             About yourself
//                                         </h2>
//                                         <Separator size="full" />
//                                     </div>
//                                 </Element>
//                                 <div>
//                                     <div className="section-form">
//                                         <label
//                                             style={{
//                                                 fontFamily: "Montserrat",
//                                                 fontSize: 12,
//                                             }}
//                                         >
//                                             DESCRIPTION
//                                         </label>
//                                         <p>{description}</p>
//                                         <label
//                                             style={{
//                                                 fontFamily: "Montserrat",
//                                                 fontSize: 12,
//                                                 marginTop: 20,
//                                                 marginBottom: 20,
//                                             }}
//                                         >
//                                             PROFILE IMAGE
//                                         </label>
//                                         {imageUrl ? (
//                                             <div
//                                                 style={{ textAlign: "center" }}
//                                             >
//                                                 <img
//                                                     src={imageUrl}
//                                                     alt="Profile"
//                                                     width="50%"
//                                                 />
//                                             </div>
//                                         ) : null}

//                                         <label
//                                             style={{
//                                                 fontFamily: "Montserrat",
//                                                 fontSize: 12,
//                                                 marginTop: 20,
//                                             }}
//                                         >
//                                             VIDEO
//                                         </label>
//                                         <div
//                                             id="video-player"
//                                             style={{
//                                                 width: "100%",
//                                                 border: "solid 1px #f0f0f0",
//                                                 borderRadius: "5px",
//                                             }}
//                                         >
//                                             <VideoPlayer URL={videoUrl} />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <Element
//                                             name="user-years"
//                                             className="element"
//                                         >
//                                             <div
//                                                 className="client-list-header"
//                                                 style={{
//                                                     paddingLeft: 0,
//                                                     paddingRight: 0,
//                                                     width: "100%",
//                                                 }}
//                                             >
//                                                 <h2
//                                                     className="client-list-title"
//                                                     style={{
//                                                         whiteSpace: "nowrap",
//                                                         marginRight: 10,
//                                                     }}
//                                                 >
//                                                     Years of experience
//                                                 </h2>
//                                                 <Separator size="full" />
//                                             </div>
//                                         </Element>
//                                         <div className="profile-section-form">
//                                             <label
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                 }}
//                                             >
//                                                 YEARS OF EXPERIENCE
//                                             </label>
//                                             <div
//                                                 style={{ position: "relative" }}
//                                             >
//                                                 <Input
//                                                     style={{
//                                                         fontFamily:
//                                                             "Montserrat",
//                                                         fontSize: 12,
//                                                         float: "left",
//                                                         width: "100%",
//                                                         height: 40,
//                                                         border:
//                                                             "solid 1px #f0f0f0",
//                                                         borderRadius: "5px",
//                                                         zIndex: 2,
//                                                     }}
//                                                     value={years}
//                                                     disabled
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="profile-section-form">
//                                         <Element
//                                             name="user-address"
//                                             className="element"
//                                         >
//                                             <div
//                                                 className="client-list-header"
//                                                 style={{
//                                                     paddingLeft: 0,
//                                                     paddingRight: 0,
//                                                     width: "100%",
//                                                 }}
//                                             >
//                                                 <h2
//                                                     className="client-list-title"
//                                                     style={{
//                                                         whiteSpace: "nowrap",
//                                                         marginRight: 10,
//                                                     }}
//                                                 >
//                                                     Perfumery address
//                                                 </h2>
//                                                 <Separator size="full" />
//                                             </div>
//                                         </Element>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                             }}
//                                         >
//                                             <h4
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     marginRight: 5,
//                                                 }}
//                                             >
//                                                 COMPANY NAME :
//                                             </h4>
//                                             <p>{companyName}</p>
//                                         </div>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                             }}
//                                         >
//                                             <h4
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     marginRight: 5,
//                                                 }}
//                                             >
//                                                 ADDRESS :
//                                             </h4>
//                                             <p>
//                                                 {address1}, {address2}
//                                             </p>
//                                         </div>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                             }}
//                                         >
//                                             <h4
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     marginRight: 5,
//                                                 }}
//                                             >
//                                                 ZIP CODE :
//                                             </h4>
//                                             <p>{zipCode}</p>
//                                         </div>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                             }}
//                                         >
//                                             <h4
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     marginRight: 5,
//                                                 }}
//                                             >
//                                                 CITY :
//                                             </h4>
//                                             <p>{city}</p>
//                                         </div>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                             }}
//                                         >
//                                             <h4
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     marginRight: 5,
//                                                 }}
//                                             >
//                                                 COUNTRY :
//                                             </h4>
//                                             <p>{country}</p>
//                                         </div>
//                                     </div>
//                                     <div className="profile-section-form">
//                                         <Element
//                                             name="user-license"
//                                             className="element"
//                                         >
//                                             <div
//                                                 className="client-list-header"
//                                                 style={{
//                                                     paddingLeft: 0,
//                                                     paddingRight: 0,
//                                                     width: "100%",
//                                                 }}
//                                             >
//                                                 <h2
//                                                     className="client-list-title"
//                                                     style={{
//                                                         whiteSpace: "nowrap",
//                                                         marginRight: 10,
//                                                     }}
//                                                 >
//                                                     License
//                                                 </h2>
//                                                 <Separator size="full" />
//                                             </div>
//                                         </Element>
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                             }}
//                                         >
//                                             <h4
//                                                 style={{
//                                                     fontFamily: "Montserrat",
//                                                     fontSize: 12,
//                                                     marginRight: 5,
//                                                 }}
//                                             >
//                                                 LICENSE TYPE :
//                                             </h4>
//                                             <p>
//                                                 {props &&
//                                                     props.user &&
//                                                     props.user.package.toUpperCase()}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <SignedInFooter />
//         </>
//     );
// };

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfileFn: (token, fn) => dispatch(getUserProfile(token, fn)),
        updateUserProfileFn: (data, id, token, fn) =>
            dispatch(updateUserProfile(data, id, token, fn)),
    };
};

// Profile.getInitialProps = async (ctx) => {
//     return { ctx };
// };

export default privateRoute(
    connect(mapStateToProps, mapDispatchToProps)(Profile)
);
