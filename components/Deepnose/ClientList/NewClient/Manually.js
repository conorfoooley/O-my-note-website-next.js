import React, { useEffect, useState } from "react";

import { Button, Input, DatePicker, Select, Spin } from "antd";

import { ArrowRightOutlined, LeftOutlined } from "@ant-design/icons";
import { getCookies } from "cookies-next";
import Axios from "axios";
import {
    addClientAction,
    createClientModal,
} from "../../../../actions/clients";
import { connect } from "react-redux";

const Manually = (props) => {
    const { Option } = Select;

    const [stepper, setStepper] = useState("first");

    const [countries, setCountries] = useState({});

    const [clientData, setClientData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: "",
        gender: "",
        interested_in: "",
        allergies: "",
        address: "",
        address_2: "",
        city: "",
        zip_code: "",
        country: "",
    });

    useEffect(() => {
        Axios.get(`https://react.ohmynote.com/api/ada2/creation`, {
            headers: {
                Authorization: `Token ${getCookies(null, "authToken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => setCountries(res.data.countries))
            .catch((e) => console.log("Creations", e));
    }, []);

    const createClient = () => {
        setStepper("first");
        // console.log(clientData);
        props.addClient(getCookies(null, "authToken"), clientData);

        if (Object.keys(props.client).length > 0) {
            setClientData({
                first_name: "",
                last_name: "",
                email: "",
                date_of_birth: "",
                gender: "",
                interested_in: "",
                allergies: "",
                address: "",
                address_2: "",
                city: "",
                zip_code: "",
                country: "",
            });

            props.toggleClientModal(false);
        }
    };

    return (
        <>
            <div className="manual-client-steps my-4">
                <ul className="d-flex justify-content-around py-3">
                    <li className={stepper === "first" ? "active" : ""}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Button
                                type="primary"
                                shape="circle"
                                className="step-counter"
                                size="large"
                            >
                                <span>1</span>
                            </Button>

                            <div className="ml-3">
                                <h6 className="mb-2 stepper-title">
                                    PERSONAL DATA
                                </h6>
                                <h6 className="stepper-subtitle">
                                    Information
                                </h6>
                            </div>
                        </div>
                    </li>

                    <li className={stepper === "second" ? "active" : ""}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Button
                                type="primary"
                                shape="circle"
                                className="step-counter"
                                size="large"
                            >
                                <span>2</span>
                            </Button>

                            <div className="ml-3">
                                <h6 className="mb-2 stepper-title">
                                    SHIPPING ADDRESS
                                </h6>
                                <h6 className="stepper-subtitle">
                                    Address data
                                </h6>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            {props.loading ? (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="manual-client-form-wrapper">
                    {stepper === "first" ? (
                        <div className="manual-client-form-first-page">
                            <div className="item-row">
                                <div className="item-col">
                                    <h6>NAME</h6>
                                    <Input
                                        placeholder="First Name"
                                        value={clientData.first_name}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                first_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="item-col">
                                    <h6>SURNAME</h6>
                                    <Input
                                        placeholder="Surname"
                                        value={clientData.last_name}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                last_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="item-col">
                                    <h6>EMAIL ADDRESS</h6>
                                    <Input
                                        placeholder="Email address"
                                        value={clientData.email}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="item-col">
                                    <h6>DATE OF BIRTH</h6>
                                    <DatePicker
                                        placeholder="Select date"
                                        // value={clientData.date_of_birth}
                                        onChange={(date, dateString) =>
                                            setClientData({
                                                ...clientData,
                                                date_of_birth: dateString,
                                            })
                                        }
                                    />
                                </div>
                                <div className="item-col full-width mb-4">
                                    <h6>GENDER</h6>

                                    <div className="radio-wrapper">
                                        <div
                                            className={
                                                clientData.gender == "male"
                                                    ? "gender-radio active"
                                                    : "gender-radio"
                                            }
                                        >
                                            <input
                                                type="radio"
                                                value="male"
                                                name="gender"
                                                onChange={(e) =>
                                                    setClientData({
                                                        ...clientData,
                                                        gender: e.target.value,
                                                    })
                                                }
                                            />
                                            <h6>MALE</h6>
                                        </div>

                                        <div
                                            className={
                                                clientData.gender == "female"
                                                    ? "gender-radio active"
                                                    : "gender-radio"
                                            }
                                        >
                                            <input
                                                type="radio"
                                                value="female"
                                                name="gender"
                                                onChange={(e) =>
                                                    setClientData({
                                                        ...clientData,
                                                        gender: e.target.value,
                                                    })
                                                }
                                            />
                                            <h6>FEMALE</h6>
                                        </div>

                                        <div
                                            className={
                                                clientData.gender == "other"
                                                    ? "gender-radio active"
                                                    : "gender-radio"
                                            }
                                        >
                                            <input
                                                type="radio"
                                                value="other"
                                                name="gender"
                                                onChange={(e) =>
                                                    setClientData({
                                                        ...clientData,
                                                        gender: e.target.value,
                                                    })
                                                }
                                            />
                                            <h6>OTHER</h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="item-col full-width mb-4">
                                    <h6>INTERESTED IN</h6>

                                    <div className="radio-wrapper">
                                        <div
                                            className={
                                                clientData.interested_in ==
                                                "men"
                                                    ? "gender-radio active"
                                                    : "gender-radio"
                                            }
                                        >
                                            <input
                                                type="radio"
                                                value="men"
                                                name="interested"
                                                onChange={(e) =>
                                                    setClientData({
                                                        ...clientData,
                                                        interested_in:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <h6>MEN</h6>
                                        </div>

                                        <div
                                            className={
                                                clientData.interested_in ==
                                                "women"
                                                    ? "gender-radio active"
                                                    : "gender-radio"
                                            }
                                        >
                                            <input
                                                type="radio"
                                                value="women"
                                                name="interested"
                                                onChange={(e) =>
                                                    setClientData({
                                                        ...clientData,
                                                        interested_in:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <h6>WOMEN</h6>
                                        </div>

                                        <div
                                            className={
                                                clientData.interested_in ==
                                                "who_cares"
                                                    ? "gender-radio active"
                                                    : "gender-radio"
                                            }
                                        >
                                            <input
                                                type="radio"
                                                value="who_cares"
                                                name="interested"
                                                onChange={(e) =>
                                                    setClientData({
                                                        ...clientData,
                                                        interested_in:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <h6>WHO CARES</h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="item-col full-width">
                                    <h6>Allergies</h6>
                                    <Input
                                        placeholder="Allergies"
                                        value={clientData.allergies}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                allergies: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="text-right">
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    className="client-confirm-btn"
                                    onClick={() => setStepper("second")}
                                >
                                    <span>Next</span>
                                    <ArrowRightOutlined />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="manual-client-form-first-page">
                            <div className="item-row">
                                <div className="item-col">
                                    <h6>ADDRESS LINE 1</h6>
                                    <Input
                                        placeholder="Address line 1"
                                        value={clientData.address}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="item-col">
                                    <h6>ADDRESS LINE 2</h6>
                                    <Input
                                        placeholder="Address line 2"
                                        value={clientData.address_2}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                address_2: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="item-col">
                                    <h6>CITY</h6>
                                    <Input
                                        placeholder="City"
                                        value={clientData.city}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                city: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="item-col">
                                    <h6>ZIP CODE</h6>
                                    <Input
                                        placeholder="Zip Code"
                                        value={clientData.zip_code}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                zip_code: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="item-col full-width mb-4">
                                    <h6>COUNTRY</h6>

                                    <Select
                                        showSearch
                                        placeholder="Select country"
                                        optionFilterProp="children"
                                        className="country-select"
                                        onSelect={(e) =>
                                            setClientData({
                                                ...clientData,
                                                country: e,
                                            })
                                        }
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        {Object.keys(countries).map(
                                            (country, i) => (
                                                <Option value={country} key={i}>
                                                    {countries[country]}
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </div>
                            </div>

                            <div
                                className={
                                    stepper === "first"
                                        ? "text-right"
                                        : "d-flex justify-content-between align-items-center"
                                }
                            >
                                {stepper === "second" && (
                                    <>
                                        <Button
                                            type="link"
                                            shape="round"
                                            size="large"
                                            className="client-back-btn"
                                            onClick={() => setStepper("first")}
                                        >
                                            <LeftOutlined />
                                            <span>Back</span>
                                        </Button>

                                        <Button
                                            type="primary"
                                            shape="round"
                                            size="large"
                                            className="client-confirm-btn"
                                            onClick={createClient}
                                        >
                                            <span>Create</span>
                                            <ArrowRightOutlined />
                                        </Button>
                                    </>
                                )}

                                {stepper === "first" && (
                                    <Button
                                        type="primary"
                                        shape="round"
                                        size="large"
                                        className="client-confirm-btn"
                                        onClick={() => setStepper("second")}
                                    >
                                        <span>Next</span>
                                        <ArrowRightOutlined />
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.clients.loading,
        client: state.clients.client,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addClient: (token, data) => dispatch(addClientAction(token, data)),
        toggleClientModal: (data) => dispatch(createClientModal(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manually);
