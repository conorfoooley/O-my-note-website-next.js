import React, { useRef } from 'react'
import Router from 'next/router'
import { Button, Select, Form } from 'antd'
import { FacebookFilled, LinkedinFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons';
import ContactUsModal from "../ContactUsModal/contactUsModal";
import { connect } from 'react-redux'
import { contactUs, newsletterSignUp } from '../../actions/public'

import Bordr from '../../assets/images/bordr.png'

const { Option } = Select

const Footer = (props) => {
    const contactModal = useRef(null);

    const onFinish = value => {
        var emailFormData = new FormData()
        emailFormData.set('email', value)
        props.newsletterSignUp(emailFormData, () => alert('subscribed to newsletter'))

    }

    return (
        <footer>
            <ContactUsModal ref={contactModal} contactUs={props.contactUs} />

            <div className="container ">
                <div className="row centerElements">
                    <div className="col-md-3 col-sm-12">
                        <div className="footerleftmenu">
                            <ul>
                                <li><a href="about">Our Story</a></li>
                                <li><a href="#">Events</a></li>
                                <li><a href="#">Partnership</a></li>
                                <li><a href="#" data-toggle="modal" data-target="#exampleModal" onClick={() => { contactModal.current.openModal() }}>Contact us</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="terms">Legal Information</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="row  justify-content-center">
                            <div className="col-md-12">
                                <div className="instagram-item ">
                                    <a href="https://www.instagram.com/omynote/" target="_blank" ><span style={{ verticalAlign: 'text-bottom' }}><InstagramFilled /></span> Our Instragram Feed</a>
                                    <h4>Newsletter Subscribe</h4>
                                    <div className="form-group fmr">
                                        <form action="#" onSubmit={e => onFinish(e.target[0].value)}>
                                            <input type="email" className="form-control" placeholder="Enter Your Email" />
                                            <input type="submit" value="submit" className="submitbtn" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className="keep">
                            <h4>Keep In Touch!</h4>
                            <p style={{ marginBottom: 20 }}><a href="mailto:info@omynote.io"> Email: info@omynote.io</a> </p>
                            <p><em>UK</em></p>
                            <p>170a Gloucester Terrace, London, W2 6HN</p>
                            <p style={{ marginBottom: 20 }}> <a href="tel:+44(0)7918 904633">Phone: +44(0)7918 904633</a></p>

                            <p style={{ marginTop: '10px' }} ><em>PARIS</em></p>
                            <p>66, Avenue des champs, Elysées, Paris</p>
                            <p> <a href="tel:+33 6227 86069">Phone: +33 6227 86069</a></p>

                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="footer-social">
                                <ul style={{    display: 'flex'}}>
                                    <li >
                                        <Select defaultValue="english" className='selectBoi' bordered={false}>
                                            <Option style={{ fontFamily: "Cormorant Garamond" }} value="english">English</Option>
                                            <Option style={{ fontFamily: "Cormorant Garamond" }} value="french">French</Option>
                                        </Select>
                                    </li>
                                    <li ><a href="https://www.facebook.com/sammeg.meg.31" target="_blank" style={{ display: 'table' }}><FacebookFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                                    <li ><a href="https://www.linkedin.com/company/omynote/" target="_blank" style={{ display: 'table' }}><LinkedinFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                                    <li ><a href="https://www.instagram.com/omynote/" target="_blank" style={{ display: 'table' }}><InstagramFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                                    <li ><a href="https://www.youtube.com/channel/UCITBrX4QnQwqW5EAlognMsg" target="_blank" style={{ display: 'table' }}><YoutubeFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 text-right">
                            <div className="rightsidefooter">
                                <ul>
                                    <li><p>&copy; O My Note 2019.</p></li>
                                    <li><Button type='link' style={{ color: '#e3e3e3', fontFamily: "Cormorant Garamond" }} onClick={() => { Router.push('/privacy_policy') }} >Privacy</Button> </li>
                                    <li><img src={Bordr} alt="" /> </li>
                                    <li><Button type='link' style={{ color: '#e3e3e3', fontFamily: "Cormorant Garamond" }} onClick={() => { Router.push('/terms') }} >Terms & Conditions</Button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const mapDispatchToProps = {
    contactUs: contactUs,
    newsletterSignUp: newsletterSignUp
}

export default connect(null, mapDispatchToProps)(Footer)
