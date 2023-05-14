import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import cookie from 'js-cookie';
import { Form, Input, Button, Select, Checkbox } from "antd";
import SideStickyMenu from '../components/SideStickyMenu/SideStickyMenu'
const { Option } = Select;

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { requestDemo, newsletterSignUp } from '../actions/public'

import cap1 from '../assets/images/indeximages/cap4.jpg'
import Link from 'next/link'


const DemoRequest = (props) => {
    const [terms, setTerms] = useState(false)
    const [newsletter, setNewsletter] = useState(false)
    const [nda, setNda] = useState(false)
    useEffect(() => {
        const x = cookie.get()
        console.log(x)
    }, []);

    const onFinish = values => {
        if(nda){
            var formData = new FormData();
            for (var key in values) {
                formData.set(key, values[key]);
            }
            formData.set('personalData', terms)
            props.requestDemo(
                formData,
                () => alert('demo request done')
            )
            if (newsletter) {
                var emailFormData = new FormData()
                emailFormData.set('email', values.email)
                props.newsletterSignUp(emailFormData, () => alert('subscribed to newsletter'))
            }
        }
        if(!nda){
            alert('You have to accept the nda')
        }
    }

    return (
        <div>
            <Header small={true} />
            <div style={{ paddingTop: '5%', backgroundColor: '#F6F1EB' }}>
                <section id="demos">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 text-center">
                                <div className="whyomn-content">
                                    <p>OMИ solution is everything you need to undrestand the fragrance trends. — backed by a support team that helps you grow. With OMИ, you’ll be able to have a 360° on Fragrance market and a lot more.
                                            See for yourself! Fill out the form to schedule a free demo customized for your specific needs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contact-us">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 ">
                                <Form onFinish={onFinish}>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form">
                                                <label htmlFor="#">First Name <span>*</span></label>
                                                <Form.Item name="firstName" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                    <Input type="text" className="form-control" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form">
                                                <label htmlFor="#">Last Name <span>*</span></label>
                                                <Form.Item name="lastName" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                    <Input type="text" name="lname" className="form-control" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form">
                                                <label htmlFor="#">Work Email <span>*</span></label>
                                                <Form.Item name="email" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                    <Input type="email" name="email" className="form-control" />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form">
                                                <label htmlFor="#">Would you define yourself as <span>*</span></label>
                                                <Form.Item name="type" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                    <Select
                                                        name='type'
                                                        bordered={false}
                                                        size={"large"}
                                                        defaultValue="none"
                                                        style={{
                                                            width: '100%',
                                                            border: '2px solid #f5eade',
                                                            color: '#2b2b2b',
                                                            boxShadow: 'none',
                                                            borderRadius: '5px'
                                                        }}>
                                                        <Option value="none">Please Select </Option>
                                                        <Option value="perfumer">Perfumer</Option>
                                                        <Option value="company">Company</Option>
                                                        <Option value="student">student</Option>
                                                        <Option value="school">School</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form gtr">
                                                <label htmlFor="#">Company Name</label>
                                                <Form.Item name="company" style={{ marginBottom: 0 }}>
                                                    <Input type="text" name="company" className="form-control" />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form">
                                                <label htmlFor="#">Phone Number</label>
                                                <Form.Item name="phone" style={{ marginBottom: 0 }}>
                                                    <Input type="tel" name="phone" className="form-control" />
                                                </ Form.Item>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form ">
                                                <label htmlFor="#">How did you hear about us? <span>*</span></label>
                                                <Form.Item name="social" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                    <Select name="social"
                                                        bordered={false}
                                                        size={"large"}
                                                        defaultValue="none"
                                                        style={{
                                                            width: '100%',
                                                            border: '2px solid #f5eade',
                                                            color: '#2b2b2b',
                                                            boxShadow: 'none',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        <Option value="none">Please Select </Option>
                                                        <Option value="website">Website</Option>
                                                        <Option value="social-media">Social Media</Option>
                                                        <Option value="contact">Contact</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="section-form gtr">
                                                <label htmlFor="#">Please select in which field your company mainly works in:<span>*</span></label>
                                                <Form.Item name="field" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                    <Select name="field"
                                                        bordered={false}
                                                        size={"large"}
                                                        defaultValue="none"
                                                        style={{
                                                            width: '100%',
                                                            border: '2px solid #f5eade',
                                                            color: '#2b2b2b',
                                                            boxShadow: 'none',
                                                            borderRadius: '5px'
                                                        }}>
                                                        <Option value="none">Please Select </Option>
                                                        <Option value="beauty-tech">beauty tech</Option>
                                                        <Option value="luxury">Luxury</Option>
                                                        <Option value="retail">Retail</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-6" style={{ marginTop: 25 }}>
                                            <div className="section-form gtr">
                                                <label htmlFor="#">Message</label>
                                                <Form.Item name="message" style={{ marginBottom: 0 }}>
                                                    <Input.TextArea name="messege" id="massege" cols="30" rows="10" ></Input.TextArea>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="condition">
                                                <label>
                                                    <label className="containerh"><h5>Sign Up For Newsletter.</h5>
                                                        <p>In order to provide you the requested content, we need to store and process your personal data. If you consent to us storing your personal data for this purpose, check this.</p>
                                                        <Checkbox
                                                            name='newsletter'
                                                            checked={newsletter}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '0',
                                                                left: '0',
                                                            }}
                                                            onChange={e => setNewsletter(e.target.checked)}
                                                        />
                                                    </label>
                                                    <label className="containerh"><h5>I agree to allow OMИ to store and process my personal data.</h5>

                                                        <Checkbox
                                                            name='terms'
                                                            checked={terms}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '0',
                                                                left: '0',
                                                            }}
                                                            onChange={e => {
                                                                setTerms(e.target.checked)
                                                            }}
                                                        />
                                                    </label>
                                                    <label className="containerh"><h5>I have read, understood and agree to be bound by your Non-disclosure Agreement. <p><a href="./nda" target="_blank"> (Read more here) </a></p> </h5>
                                                        <Checkbox 
                                                            name='nda'
                                                            checked={nda}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '0',
                                                                left: '0',
                                                            }}
                                                            onChange={e => {
                                                                setNda(e.target.checked)                         
                                                            }}
                                                        />
                                                    </label>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="submit-btn">
                                                <Button shape='round' htmlType="submit" >Get Contacted By A Consultant</Button>
                                            </div>
                                        </div>
                                    </div>


                                </Form>
                            </div>

                        </div>
                    </div>
                </section>

            </div>

            <Footer />
            <SideStickyMenu />
        </div>
    )
}

DemoRequest.getInitialProps = () => {

    return {}
}

const mapDispatchToProps = {
    requestDemo: requestDemo,
    newsletterSignUp: newsletterSignUp
}

export default connect(null, mapDispatchToProps)(DemoRequest) 