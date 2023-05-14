import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import { Form, Input, Button } from "antd";
import Header from '../../../../components/Header/Header'

import { confirmPasswordReset } from '../../../../actions/auth'


class Index extends PureComponent {

    static getInitialProps() {

        return {}
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    onFinish = values => {
        const { uid, token } = this.props.router.query;
        this.props.confirmPasswordReset(
            values.password,
            values.password2,
            uid,
            token,
            () => { console.log('done !') 
            alert('Password updated successfully !')
        }
        )
    }

    render() {

        return (
            <div>
                <Header />
                <div style={{ height: 600, paddingTop: 150, backgroundColor: 'white' }}>
                    <div style={{ display: 'block', paddingTop: 50, height: '100%' }} >
                        <div style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                            <h1>Reset Password</h1>
                            <Form
                                onFinish={this.onFinish}
                                size='large'
                            >
                                <Form.Item name="password" rules={[{ required: true }]}>
                                    <Input.Password
                                        placeholder="new password"
                                    />
                                </Form.Item>
                                <Form.Item name="password2" rules={[{ required: true }]}>
                                    <Input.Password
                                        placeholder="confirm password"
                                    />
                                </Form.Item>
                                <div style={{ marginTop: 20 }}>
                                    <Button style={{ width: '100%' }} shape='round' htmlType="submit" >Confirm</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    confirmPasswordReset: confirmPasswordReset
}


export default connect(null, mapDispatchToProps)(withRouter(Index))
