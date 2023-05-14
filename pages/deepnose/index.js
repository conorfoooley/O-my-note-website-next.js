import React, {Component} from "react";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/auth";

import {privateRoute} from "../../components/privateRoute";
import SignInHeaderSingle from "../../components/SignInHeaderSingle/SignInHeaderSingle";
import SignedInFooter from "../../components/SignedInFooter/SignedInFooter";

import ClientList from "../../components/Deepnose/ClientList/ClientList";
import MyCalender from "../../components/Deepnose/Calender/MyCalender";
import ToastMessage from "../../components/Deepnose/Toast/ToastMessage";

class Deepnose extends Component {
    static getInitialProps(ctx) {
        return {ctx};
    }

    constructor(props) {
        super(props);
        this.state = {
            profileImage: "",
        };
    }

    componentDidMount() {
        this.props.getUserProfile(this.props.ctx.token, (res) => {
            res ? this.setState({profileImage: res.user.image}) : null;
        });
    }

    render() {
        return (
            <div className="deepnose-wrapper" style={{position: "relative"}}>
                {/* Logo & Menu Bar */}
                <SignInHeaderSingle profileImage={this.state.profileImage}/>

                {/* Main Content */}
                <div className="deepnose-content">
                    <div className="container">
                        {/* Client List */}
                        <ClientList/>

                        {/* Your Calender */}
                        <MyCalender/>

                        {/* footer */}
                        <SignedInFooter/>
                    </div>
                </div>

                <ToastMessage/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.clients.client,
    };
};

const mapDispatchToProps = {
    getUserProfile: getUserProfile,
};

export default privateRoute(
    connect(mapStateToProps, mapDispatchToProps)(Deepnose)
);
