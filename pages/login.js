import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import { Form, Input, Button } from "antd";
import { ArrowRightOutlined, } from '@ant-design/icons';
import Link from 'next/link'
import SideStickyMenu from '../components/SideStickyMenu/SideStickyMenu'

import { login, getUserProfile } from '../actions/auth'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'




class Login extends PureComponent {

  static getInitialProps(ctx) {
    return {}
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }


  onFinish = values => {
    this.props.login(
      values.email,
      values.password,
      (token) => {
        this.props.getUserProfile(
          token,
          () => Router.push('/dashboard/dashboard')
        )
      })
  }

  render() {

    return (
      <div>
        <Header small={true} />
        <div style={{ paddingTop: '5%', paddingBottom: "10%", backgroundColor: '#FDFCF8' }}>
          <div style={{ display: 'block', height: '100%' }} >
            <div style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              <h1 style={{ textAlign: 'center', margin: '10%' }}>Login</h1>
              <Form
                onFinish={this.onFinish}
                size='large'
              >
                <label htmlFor="#"><em>Email</em></label>
                <Form.Item name="email" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <Input
                    placeholder="Email"
                  />
                </Form.Item>
                <label htmlFor="#"><em>Password</em></label>
                <Form.Item name="password" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <Input.Password
                    placeholder="Password"
                  />
                </Form.Item>
                <div style={{ marginTop: 20 }} >
                  <div className="submit-btn">
                    <Button
                      shape='round'
                      htmlType="submit"
                      style={{
                        fontSize: 20,
                        height: 48,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }} >
                      Login <ArrowRightOutlined style={{ fontSize: '25px', marginLeft: '15px' }} />
                    </Button>
                  </div>
                  <Link href="/forgot_password"  >
                    <Button style={{ float: 'right', marginTop: '10px' }} shape='link' >Forgot your password?</Button>
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <Footer />
        <SideStickyMenu />
      </div>
    )
  }
}

const mapDispatchToProps = {
  login: login,
  getUserProfile: getUserProfile
}

export default connect(null, mapDispatchToProps)(Login) 
