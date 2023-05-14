import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../../../actions/auth";

import { privateRoute } from "../../../../components/privateRoute";
import SignInHeaderSingle from "../../../../components/SignInHeaderSingle/SignInHeaderSingle";
import SignedInFooter from "../../../../components/SignedInFooter/SignedInFooter";
import ClientInfo from "../../../../components/Deepnose/ClientList/Client/Appointment/ClientInfo";
import AppointSchedule from "../../../../components/Deepnose/ClientList/Client/Appointment/AppointSchedule";

class AppointUser extends Component {
    static getInitialProps(ctx) {
        return { ctx };
    }
    constructor(props) {
        super();
        this.state = {
            profileImage: "",
        };
    }
    componentDidMount() {
        this.props.getUserProfile(this.props.ctx.token, (res) => {
            res ? this.setState({ profileImage: res.user.image }) : null;
        });
    }

    render() {
        return (
            <div className="deepnose-wrapper" style={{ position: "relative" }}>
                {/* Logo & Menu Bar */}
                <SignInHeaderSingle profileImage={this.state.profileImage} />

                {/* Main Content */}
                <div className="deepnose-content">
                    <div className="container">
                        {/* Appoint User Info */}
                        <ClientInfo profileImage={this.state.profileImage} />

                        {/* Appoint Schedule */}
                        <AppointSchedule />

                        {/* footer */}
                        <SignedInFooter />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    getUserProfile: getUserProfile,
};

export default privateRoute(connect(null, mapDispatchToProps)(AppointUser));
