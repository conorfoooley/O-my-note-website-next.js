import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import { Form, Input, Button } from "antd";

import { recoverPassword } from '../actions/auth'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'




class ForgotPassword extends PureComponent {

    static getInitialProps() {

        return {}
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    onFinish = values => {
        this.props.recoverPassword(values.email, () => { Router.push('/login') })
    }

    render() {

        return (
            <div>
                <Header />
                <div style={{ height: 600, paddingTop: 150, backgroundColor: 'white' }}>
                    <div style={{ display: 'block', paddingTop: 50, height: '100%' }} >
                        <div style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                            <h1>Reset Password</h1>
                            <h4>Please follow the instructions sent to your email adress</h4>
                            <Form
                                onFinish={this.onFinish}
                            >
                                <Form.Item name="email" rules={[{ required: true }]}>
                                    <Input
                                        placeholder="Email"
                                    />
                                </Form.Item>
                                <div>
                                    <Button style={{ width: '100%' }} shape='round' htmlType="submit" >Send</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapDispatchToProps = {
    recoverPassword: recoverPassword
}

export default connect(null, mapDispatchToProps)(ForgotPassword)
