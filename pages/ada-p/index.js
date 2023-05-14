import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { Button, Input } from "antd";
import { searchInAll } from "../../actions/notes";

import { ArrowRightOutlined } from "@ant-design/icons";
import { getNotes, getPerfumes, getBrands } from "../../actions/notes";
import { getUserProfile } from "../../actions/auth";

import { privateRoute } from "../../components/privateRoute";
import Separator from "../../components/Separator/Separator";
import SignedInHeader from "../../components/SignedInHeader/SignedInHeader";
import SignedInFooter from "../../components/SignedInFooter/SignedInFooter";
import FloatCard from "../../components/FloatCard/FloatCard";
import Carousel from "../../components/Carousel/Carousel";
import SeachCardGroup from "../../components/SearchCardGroup/SearchCardGroup";

class Search extends PureComponent {
    static getInitialProps(ctx) {
        return { ctx };
    }

    constructor(props) {
        super();
        this.state = {
            notes: [],
            perfumes: [],
            brands: [],
            items: [],
            searchTerm: "",
            profileImage: "",
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        // this.props.getNotes(0, 20, this.props.ctx.token, (res) => {
        //     res ? this.setState({ notes: res }) : null;
        // });
        this.props.getPerfumes(0, 20, this.props.ctx.token, (res) => {
            res ? this.setState({ perfumes: res }) : null;
        });
        // this.props.getBrands(0, 20, this.props.ctx.token, (res) => {
        //     res ? this.setState({ brands: res }) : null;
        // });
        this.props.getUserProfile(this.props.ctx.token, (res) => {
            res ? this.setState({ profileImage: res.user.image }) : null;
        });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll(e) {
        if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
        ) {
            document
                .getElementById("header-content")
                .classList.add("header-content-small");
            document.getElementById("header-logo").classList.add("logo");
        } else {
            document
                .getElementById("header-content")
                .classList.remove("header-content-small");
            document.getElementById("header-logo").classList.remove("logo");
        }
    }

    submitSearch = (term) => {
        this.props.searchInAll(term, this.props.ctx.token, (hits) => {
            this.setState(
                {
                    searchActive: true,
                    items: hits,
                },
                () => {
                    console.log(this.state.items);
                }
            );
        });
    };

    render() {
        const {
            notes,
            perfumes,
            brands,
            items,
            searchActive,
            searchTerm,
        } = this.state;

        // console.log(perfumes);

        return (
            <div>
                <SignedInHeader
                    title="Search"
                    token={this.props.ctx.token}
                    profileImage={this.state.profileImage}
                />
                <div style={{ height: "55%" }}>
                    {/*         <FloatCard style={{ width: '50%', left: '24%' }}   >
                        <div style={{
                            width: '100%'
                        }} >
                            <h2 className='client-list-title' >Search fragrance</h2>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: '20px'
                            }} >
                                <Input
                                    style={{ width: '80%', height: 48, alignItems: 'center' }}
                                    placeholder='Search perfumes, brands, notes...'
                                    allowClear
                                    type='search'
                                    onChange={(e) => {
                                        this.setState({ searchTerm: e.target.value })
                                        if (e.type === 'click') {
                                            this.setState({
                                                searchActive: false
                                            })
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => { this.submitSearch(searchTerm) }}
                                    shape='round'
                                    htmlType="submit"
                                    style={{
                                        backgroundColor: '#1F2A56',
                                        color: "#fff",
                                        fontSize: 12,
                                        border: 'none',
                                        height: 48,
                                        width: 152,
                                        marginLeft: 20
                                    }} >
                                    Search <ArrowRightOutlined />
                                </Button>
                            </div>
                        </div>
                    </FloatCard>
            */}
                </div>

                {!searchActive ? (
                    <>
                        {/* <div
                            className="client-list-header"
                            style={{ paddingTop: "25%" }}
                        >
                            <h2 className="client-list-title">
                                Note - Top Searched
                            </h2>
                            <Separator />
                            <Button
                                onClick={() => {
                                    Router.push("/ada/search/note");
                                }}
                                type="link"
                                htmlType="submit"
                                style={{
                                    color: "#1d1e1e",
                                    fontSize: 12,
                                    border: "none",
                                    fontWeight: "600",
                                    height: 48,
                                    width: 152,
                                }}
                            >
                                VIEW ALL <ArrowRightOutlined />
                            </Button>
                        </div>
                        <Carousel cards={notes.results} /> */}
                        <div
                            className="client-list-header"
                            // style={{ paddingTop: "25%" }}
                        >
                            <h2 className="client-list-title">Perfumes</h2>
                            <Separator />
                            <Button
                                onClick={() => {
                                    Router.push("/ada/search/perfume");
                                }}
                                type="link"
                                htmlType="submit"
                                style={{
                                    color: "#1d1e1e",
                                    fontSize: 12,
                                    border: "none",
                                    fontWeight: "600",
                                    height: 48,
                                    width: 152,
                                }}
                            >
                                VIEW ALL <ArrowRightOutlined />
                            </Button>
                        </div>
                        <Carousel cards={perfumes.results} />
                        {/* <div className="client-list-header">
                            <h2 className="client-list-title">
                                Brand - Top Searched
                            </h2>
                            <Separator />
                            <Button
                                onClick={() => {
                                    Router.push("/ada/search/brand");
                                }}
                                type="link"
                                htmlType="submit"
                                style={{
                                    color: "#1d1e1e",
                                    fontSize: 12,
                                    border: "none",
                                    fontWeight: "600",
                                    height: 48,
                                    width: 152,
                                }}
                            >
                                VIEW ALL <ArrowRightOutlined />
                            </Button>
                        </div>
                        <Carousel cards={brands.results} /> */}
                    </>
                ) : null}
                {searchActive ? (
                    <>
                        {items.note ? (
                            <>
                                <div
                                    className="client-list-header"
                                    style={{ paddingTop: "25%" }}
                                >
                                    <h2
                                        className="client-list-title"
                                        style={{ width: "20%" }}
                                    >
                                        {" "}
                                        Notes
                                    </h2>
                                    <Separator />
                                    <Button
                                        onClick={() => {
                                            Router.push({
                                                pathname: "/ada/search/note",
                                                query: {
                                                    searchTerm: this.state
                                                        .searchTerm,
                                                },
                                            });
                                        }}
                                        type="link"
                                        htmlType="submit"
                                        style={{
                                            color: "#1d1e1e",
                                            fontSize: 12,
                                            border: "none",
                                            fontWeight: "600",
                                            height: 48,
                                            width: 152,
                                        }}
                                    >
                                        VIEW ALL <ArrowRightOutlined />
                                    </Button>
                                </div>
                                <Carousel cards={items.note} />
                            </>
                        ) : null}
                        {items.parfume ? (
                            <>
                                <div className="client-list-header">
                                    <h2
                                        className="client-list-title"
                                        style={{ width: "20%" }}
                                    >
                                        {" "}
                                        Perfumes
                                    </h2>
                                    <Separator />
                                    <Button
                                        onClick={() => {
                                            Router.push({
                                                pathname: "/ada/search/perfume",
                                                query: {
                                                    searchTerm: this.state
                                                        .searchTerm,
                                                },
                                            });
                                        }}
                                        type="link"
                                        htmlType="submit"
                                        style={{
                                            color: "#1d1e1e",
                                            fontSize: 12,
                                            border: "none",
                                            fontWeight: "600",
                                            height: 48,
                                            width: 152,
                                        }}
                                    >
                                        VIEW ALL <ArrowRightOutlined />
                                    </Button>
                                </div>
                                <Carousel cards={items.parfume} />
                            </>
                        ) : null}
                        {items.brand ? (
                            <>
                                <div className="client-list-header">
                                    <h2
                                        className="client-list-title"
                                        style={{ width: "20%" }}
                                    >
                                        {" "}
                                        Brands
                                    </h2>
                                    <Separator />
                                    <Button
                                        onClick={() => {
                                            Router.push({
                                                pathname: "/ada/search/brand",
                                                query: {
                                                    searchTerm: this.state
                                                        .searchTerm,
                                                },
                                            });
                                        }}
                                        type="link"
                                        htmlType="submit"
                                        style={{
                                            color: "#1d1e1e",
                                            fontSize: 12,
                                            border: "none",
                                            fontWeight: "600",
                                            height: 48,
                                            width: 152,
                                        }}
                                    >
                                        VIEW ALL <ArrowRightOutlined />
                                    </Button>
                                </div>
                                <Carousel cards={items.brand} />
                            </>
                        ) : null}
                    </>
                ) : null}

                <SignedInFooter />
            </div>
        );
    }
}

const mapDispatchToProps = {
    getNotes: getNotes,
    getPerfumes: getPerfumes,
    getBrands: getBrands,
    searchInAll: searchInAll,
    getUserProfile: getUserProfile,
};

export default privateRoute(connect(null, mapDispatchToProps)(Search));
