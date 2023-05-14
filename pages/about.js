import React, {useEffect} from 'react'
import Router from 'next/router'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SideStickyMenu from '../components/SideStickyMenu/SideStickyMenu'
import Mouse from '../assets/images/temp_icons/mouse.png'
import CloudComputing from '../assets/images/temp_icons/cloud-computing.png'
import Document from '../assets/images/temp_icons/document.png'
import WorldWide from '../assets/images/temp_icons/worldwide.png'
import Add from '../assets/images/temp_icons/add.png'
import CoFounder from '../assets/images/temp_icons/co-founder.png'
import {Button} from "antd";
import {ArrowRightOutlined,} from '@ant-design/icons';
import bLogo from '../assets/images/they_talk_about_us/premium_beauty_logo.jpg'
import canvas8Logo from '../assets/images/they_talk_about_us/canvas8_logo.png'
import thLogo from '../assets/images/they_talk_about_us/trend-hunter_logo.png'
import lsnLogo from '../assets/images/they_talk_about_us/lsn_logo.png'
const About = (props) => {

    useEffect(() => {

    }, []);

    return (
        <>
            <Header small={true}/>
            <div style={{paddingTop: '5%', backgroundColor: '#F6F1EB'}}>
                <section id="terms">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 text-center">
                                <div style={{textAlignLast: 'center'}}>
                                    <h1 style={{textAlign: 'left'}}>Our Story</h1>
                                    <div className="terms-and-conditions">
                                        <section id="ourstory">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <div className="storycontetnt">
                                                            <div className="our">
                                                                {/*  <h3>Our Story</h3>
                                                                <img src={Titlebar} alt="#" /> */}
                                                            </div>
                                                            <p style={{
                                                                fontSize: '18px',
                                                                fontWeight: "bold",
                                                                textAlign :'center'
                                                            }}>
                                                                The very first platform where STATE-OF-THE-ART
                                                                ARTIFICIAL INTELLIGENCE is focused on the service of
                                                                Fragrance creation.
                                                                OMИ was founded in 2020 to digitize the Fragrance
                                                                experience in an authentic way where fragrance will play
                                                                its original role: respond to an emotional need.
                                                                The gap between fragrance industry and customer is huge
                                                                and still the offer far away from the customer
                                                                expectations.
                                                                We are leaving a data driven digital transformation so
                                                                why to not use data to bridge this gap? Why not tailor
                                                                the offer to the customer using different data
                                                                sources. <br/>
                                                                The main purpose of OMИ is to respond to the increased
                                                                demand of right, true and unique personalization.
                                                                Fragrance is about emotions, mystery and our focus is to
                                                                help facilitate this dialog between perfumers and
                                                                customers.
                                                                Sameh Said: “OMИ is the fruit of an HEC Executive
                                                                master, 12 years in artificial intelligence and a PHD in
                                                                computer vison”.
                                                                OMИ is: O MY NOTE to illustrate that the tailored
                                                                fragrance is possible and accessible to all.
                                                                “AI is made by humans, it can’t be smarter than us. I
                                                                believe, if scalability meets hyper-personalization, AI
                                                                will bring human creativity to unexpected levels” <br/>
                                                                We are proud of Our multi-cultural team. Engineers,
                                                                trainees, PHDs we work closely with our réputated
                                                                fragrance expert Joelle Lerioux.
                                                                We share the same values and put our efforts to
                                                                revolutionize the Fragrance experience.<br/>
                                                                <p
                                                                    style={{float: "right"}}> Dr. Sameh</p></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="container">
                                                <div className="row pb-5">
                                                    <div className="col-md-12">
                                                        <div className="foundertitle our">
                                                            <h3>The Team </h3>
                                                            <img src={Titlebar} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Sameh Megrhi</h6>
                                                            <p>PhD, HEC</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Raje Mouhibedin</h6>
                                                            <p>Architect </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* <div className="container">
                                                <div className="row pb-5">
                                                    <div className="col-md-12">
                                                        <div className="advisory our">
                                                            <h3>Our Advisory Board</h3>
                                                            <img src={Titlebar} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Joelle Lerioux</h6>
                                                            <p>Le parfum Français</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Shahzar Haider</h6>
                                                            <p>Curator</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </section>
                                    </div>
                                     
                                </div>
                                <div style={{textAlignLast: 'center'}}>
                                    <h1 style={{textAlign: 'left'}}>Our Values</h1>
                                    <div className="terms-and-conditions">
                                        <section id="ourstory">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <div className="storycontetnt">
                                                            <div className="our">
                                                                {/*  <h3>Our Story</h3>
                                                                <img src={Titlebar} alt="#" /> */}
                                                            </div>
                                                            <p style={{
                                                                fontSize: '18px',
                                                                fontWeight: "bold",
                                                                textAlign :'center'
                                                            }}>We want to give meaning to our efforts and have a
                                                                positive impact on society. We created our business plan
                                                                around strong ideas: environmental and social
                                                                responsibility. <br/> For social inclusion we created
                                                                the group“ women in analytics and data science”. The aim
                                                                of this initiative is not only to promote women
                                                                inclusion in the data science industry ( Women holding
                                                                Phd and working in data science are less than 6% in
                                                                2016). But also to put health and wellness as priority.
                                                                We are very active in term of events, meetups, talks
                                                                since 2017.

                                                                <br/>
                                                                Overstock is a waste for business and environment. Our
                                                                purpose is to provide our insights to avoid overstock
                                                                and save the environment.

                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            

                                            {/* <div className="container">
                                                <div className="row pb-5">
                                                    <div className="col-md-12">
                                                        <div className="foundertitle our">
                                                            <h3>The Team </h3>
                                                            <img src={Titlebar} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Sameh Megrhi</h6>
                                                            <p>PhD, HEC</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Raje Mouhibedin</h6>
                                                            <p>Architect </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* <div className="container">
                                                <div className="row pb-5">
                                                    <div className="col-md-12">
                                                        <div className="advisory our">
                                                            <h3>Our Advisory Board</h3>
                                                            <img src={Titlebar} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Joelle Lerioux</h6>
                                                            <p>Le parfum Français</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Shahzar Haider</h6>
                                                            <p>Curator</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="pic-item">
                                                            <img src={Pic} alt="#" />
                                                            <h6>Name Here</h6>
                                                            <p>Potion Here</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </section>
                                    </div>
                                </div>

                                <div style={{textAlignLast: 'center'}}>
                                    <h1 style={{textAlign: 'left'}}>They talk about us</h1>
                                        <a href="https://www.premiumbeautynews.com/en/o-my-note-the-perfume-app-focused,17412" target="_blank">
                                             <img src={bLogo} style={{paddingTop : "23px",height :"auto", width : "25%"}}/>
                                        </a> 
                                        <a href="https://www.canvas8.com/signals/2020/10/30/o-my-note.html?navPath=" target="_blank">
                                             <img src={canvas8Logo} style={{paddingTop : "23px", paddingLeft:"10px", height :"auto", width : "25%"}}/>
                                        </a> 
                                        <a href="https://www.trendhunter.com/trends/perfume-app" target="_blank" >
                                             <img src={thLogo} style={{paddingTop : "23px", paddingLeft:"10px", height :"auto", width : "25%"}}/>
                                        </a> 
                                        <a href="https://www.lsnglobal.com/markets/article/26254/fragrance-futures-market" target="_blank">
                                             <img src={lsnLogo} style={{paddingTop : "23x", paddingLeft:"10px", height :"auto", width : "25%"}}/>
                                        </a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="startedget">
                    <div className="container">
                    
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="gt-title">
                                    <h1>Get Started Now</h1>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="system-item">
                                    <div className="item-img"><img src={Mouse} alt="#"/></div>
                                    <p>Intuitive Platform With A Quick Set-up</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="system-item">
                                    <div className="item-img"><img src={CloudComputing} alt="#"/></div>
                                    <p>Personalized Data And Exclusive Insights</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="system-item">
                                    <div className="item-img"><img src={Document} alt="#"/></div>
                                    <p>Personalized Results</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="system-item">
                                    <div className="item-img"><img src={WorldWide} alt="#"/></div>
                                    <p>Worldwide Coverage</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="system-item">
                                    <div className="item-img"><img src={Add} alt="#"/></div>
                                    <p>Mobile-Friendly</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="system-item">
                                    <div className="item-img"><img src={CoFounder} alt="#"/></div>
                                    <p>A Team Of Experts Dedicated To You</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="getcontact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="get-title">
                                    <p>Want To Know More? Please Request A Demo</p>
                                    <Button
                                        onClick={() => {
                                            Router.push('/demo_request')
                                        }}
                                        shape='round'
                                        style={{
                                            backgroundColor: '#1F2A56',
                                            color: "#fff",
                                            fontSize: 18,
                                            border: 'none',
                                            height: 48,
                                            width: '30%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            marginTop: '20px'
                                        }}>
                                        <p className={'container-rightside-text'}>Get Contacted</p>
                                        <ArrowRightOutlined
                                            style={{fontSize: '25px', marginLeft: '15px'}}/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
            <SideStickyMenu/>
        </>
    )
}

export default About
