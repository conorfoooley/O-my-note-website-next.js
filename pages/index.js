import React, {PureComponent,useContext,useState,useEffect} from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SideStickyMenu from '../components/SideStickyMenu/SideStickyMenu'
import PopupContactModal from '../components/PopupContactModal/PopupContactModal'
import {Button, Carousel} from "antd";
import {ArrowRightOutlined, ConsoleSqlOutlined,} from '@ant-design/icons';
import Router from 'next/router'

import PredictiveModels from '../assets/images/predictive-models.svg'
import Parfume from '../assets/images/parfume.svg'
import Innovation from '../assets/images/innovation.svg'
import CustomerService from '../assets/images/customer-service.svg'
import Garde2 from '../assets/images/garde2.jpg'
import cap1 from '../assets/images/indeximages/cap4.jpg'
import cap2 from '../assets/images/indeximages/cap3.jpg'
import cap3 from '../assets/images/indeximages/cap2.jpg'
import cap4 from '../assets/images/indeximages/cap1.jpg'
import playstore from '../assets/images/indeximages/GooglePlay.png'
import appstore from '../assets/images/indeximages/AppStore.png';
import {Element} from 'react-scroll'
import { AppContext } from '../Context/AppContext';


const popupModal = React.createRef();
const contentStyle = {
    height: '400px',
    lineHeight: '160px',
    textAlign: 'center',
};
const Index = () => {
        const { dictionary } = useContext(AppContext);
        const timestamp = +new Date;
        const iframe_url = `https://web.omynote.io/timestamp?=${timestamp}`;
        return (
            <div>
                <Header small={true}/>
                <PopupContactModal ref={popupModal}/>
                <div style={{textAlign: '-webkit-center', backgroundColor: '#F6F1EB'}}>
                    <section>
                        <div className="container" style={{paddingBottom: 100,paddingTop: 165}}>
                            <div className="row flex-sm-row-reverse flex-md-row flex-lg-row">
                                <div className="col-md-6 col-sm-12 d-none d-md-block d-lg-block" style={{paddingTop: 40}} >
                                    <iframe style={{
                                      width: '100%',
                                      maxWidth: 390,
                                      height: 605,
                                      border: 0,
                                      borderRadius: 20,
                                      overflow: 'hidden',
                                    }} allow="camera; microphone;" src={iframe_url}></iframe>

                                </div>
                                <div className="col-md-6 col-sm-12 container-leftside-text">
                                    <div className="lefiside-text" style={{fontSize: 22, paddingTop:10}}>
                                        <h2 style={{fontWeight: 'bold'}}>{dictionary&&dictionary.headertitle1}</h2>
                                        <h2 style={{fontWeight: 'bold'}}>{dictionary&&dictionary.headertitle2}</h2>
                                        <h2 style={{fontWeight: 'bold'}}>{dictionary&&dictionary.headertitle3}</h2>
                                        <p>
                                          <br/>
                                          <h2 style={{fontWeight: 'bold'}}>{dictionary&&dictionary.step1title}</h2>
                                          {dictionary&&dictionary.step1text1}
                                          <h2 style={{fontWeight: 'bold'}}>{dictionary&&dictionary.step2title}</h2>
                                          {dictionary&&dictionary.step2text}
                                          <h2 style={{fontWeight: 'bold'}}>{dictionary&&dictionary.step3title}</h2>
                                          {dictionary&&dictionary.step3text1} <br/>{dictionary&&dictionary.step3text2}
                                        </p>
                                        <p style={{display: 'none'}}>
                                            OMИ is a cutting-edge artificial-intelligence,
                                            Fragrance-dedicated company. <br/> Our purpose is to easily connect
                                            customers with
                                            their emotions and make the fragrance experiences authentic and IN TUNE with
                                            today’s customer needs.
                                            <br/>
                                            Your perfume will respond to your emotional needs.
                                            <br/>
                                            Please note: this is a beta version, please join our community and share
                                            your feedback. <br/> The final version will include more amazing
                                            functionalities.
                                        </p>

                                    </div>
                                    <div className="row">
                                        <a className="col-sm-12" href="https://apps.apple.com/us/app/o-my-note-perfume-advisor/id1561737457" target="_blank">
                                            <img src={appstore} alt="" style={{
                                            width: '100%',
                                            maxWidth: '203px',
                                            }} />
                                        </a>
                                        <a className="col-sm-12" href="https://play.google.com/store/apps/details?id=io.omynote" target="_blank" style={{marginTop:10}}>
                                            <img src={playstore} alt="" width="203" height="68"/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 d-lg-none d-md-none d-sm-block" style={{paddingBottom: 100}} >

                                  <iframe style={{
                                    width: '100%',
                                    maxWidth: 390,
                                    height: 605,
                                    border: 0,
                                    // display: 'table',
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                    // marginTop: 80,
                                  }} allow="camera; microphone;" src={iframe_url}></iframe>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="banner" className="banner-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 container-leftside-text">
                                    <div className="lefiside-text" style={{fontSize: 22}}>
                                        <h1>It's all about emotions </h1>
                                        <p>
                                            OMИ is a cutting-edge artificial-intelligence, Fragrance-dedicated company,
                                            that will revolutionize the customer experience in both retail and online.
                                            Our purpose is to easily connect customers with their emotions and make
                                            the fragrance experiences authentic and IN TUNE with today’s market and
                                            customer needs.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 container-rightside-text">
                                    <div className="rightside-text">
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="ourebestoffer">
                        <div className="container">
                            <div className="row" style={{width: "110%"}}>
                                <div style={{marginTop: 90}} className="col-md-6 col-sm-12">
                                    <div className="leftoffer">
                                        <h3>Our Best Offers</h3>
                                        <Element name="omn-description" id="omn-description" className="element">
                                            <h4 style={{fontSize: 29, marginBottom: 15}}>OMИ</h4>
                                        </Element>
                                        <p style={{marginBottom: '10px'}}>
                                            More than 40000 fragrances in the market, how can customers choose the right
                                            one at the right moment? You don't need to be a fragrance enthusiast or
                                            expert anymore, Our intelligent solution will help you find the right
                                            match. <br/>
                                            All you need is to tell us your story, our multimodal algorithm is
                                            able to predict your expected smell!
                                            <br/>
                                            We can even match you with the best
                                            fragrance creator to design your unique scent.
                                            This solution is designed to disrupt the Fragrance experience
                                            to be the first P2C 'perfumer to customer' offer.
                                        </p>

                                        <Element name="ada-description" id="ada-description" className="element">
                                            <h4 style={{fontSize: 29, marginBottom: 15}}>Advanced Analytics</h4>
                                        </Element>
                                        <p style={{marginBottom: '10px'}}> We offer a 360° view of the FINE Fragrance
                                            market, from the customer's perspective, in real time! OMИ brings an
                                            innovative model to grow your business by exploiting heterogeneous data and
                                            providing you with the necessary insights to gain competitive advantage. We
                                            will predict olfactive notes trends. We will allow you to monitor the
                                            performances of your products, their positioning, your clients, competitors
                                            and much more.</p>
                                        <Element name="deepnose-description" id="deepnose-description" className="element">
                                            <h4 style={{fontSize: 29, marginBottom: 15}}>DeepNoze</h4>
                                        </Element>
                                        <p style={{marginBottom: '10px'}}> This under patent solution will help you to
                                            connect with your customers and will facilitate the olfactive dialog with
                                            them in real time. <br/>
                                            Will be launched soon!</p>

                                    </div>
                                </div>


                                <div className="col-md-6 col-sm-12" style={{alignSelf: "center"}}>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="whois">
                                                <a href="about">
                                                    <div className="who">
                                                        <img src={Parfume} width={50}/>
                                                        <h4>Who Is OMИ</h4>
                                                        <p style={{marginBottom: '10px'}}> The first cutting edge
                                                            technology platform dedicated to fragrance creation. </p>
                                                        <p> We will equip our artists with latest technology insights in
                                                            real time!</p>

                                                    </div>
                                                </a>

                                                <a href="OMИ-prediction">
                                                    <div className="prediction">

                                                        <img src={PredictiveModels} width={50}/>
                                                        <h4>Predictions</h4>
                                                        <p style={{marginBottom: '10px'}}>Predict novel notes
                                                            combinations.</p>
                                                        <p>Predict market Trends.</p>

                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="innovation">
                                                <a href="OMИ-Forecasting">
                                                    <div className="innovative">
                                                        <img src={Innovation} width={50}/>
                                                        <h4>Innovation</h4>
                                                        <p style={{marginBottom: '10px'}}>Forecast Fragrance trends
                                                            using real time data instead of surveys.</p>
                                                        <p>A new customer experience where technology, customer and
                                                            artists progress together.</p>

                                                    </div>
                                                </a>
                                                <a href="about">
                                                    <div className="support">
                                                        <img src={CustomerService} width={50}/>
                                                        <h4>24/7 Hours Support</h4>
                                                        <p>Our team is available to support you.</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>
                    <section id="whyomynote">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 container-rightside-text"
                                     style={{position: 'relative'}}>
                                    <div className="video_play">
                                        <a className="video-play-button youtube-video"
                                            href="https://www.youtube.com/watch?v=AtgUvaJP4Cc" target="_blank"
                                        > <span></span> </a>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12" style={{maxWidth: '45%'}}>
                                    <div className="right-whymy">
                                        <h2>Why O My Note?</h2>
                                        <p>We are not doing any recommendations, our purpose is the help tailor the
                                            offer to the customers in real time.</p>
                                        <p>Our solution provides 360° view of the fragrance market to bridge the gap
                                            between perfumers and customers.</p>
                                        <p>We are aware that perfume is related to emotions, this is why OMИ translate
                                            customer emotions into fragrance notes and provide these insights in real
                                            time.</p>
                                        <p> Facilitate the emotional dialog between perfume lovers and fragrance
                                            noses.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="schedule">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-10 ">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="leftdemo">
                                                <img src={Garde2} alt="#"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="schedledemo-content">
                                                <h3>Schedule A Demo</h3>
                                                <p>OMИ solution is everything you need to understand the fragrance
                                                    trends. — backed by a support team that helps you grow.</p>
                                                <p>See for yourself! Fill out the form to schedule a free demo
                                                    customized for your specific needs.</p>

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
                                                        width: '50%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        marginTop: '20px'
                                                    }}>
                                                    Click here <ArrowRightOutlined
                                                    style={{fontSize: '25px', marginLeft: '15px'}}/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
                <Footer/>
                <SideStickyMenu/>
            </div>
        )
}

export default Index
