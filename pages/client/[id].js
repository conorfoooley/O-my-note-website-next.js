import React from "react"
import Head from "next/head"
import { Divider } from 'antd'
import SignedHeader from '../../components/SignedInHeader/SignedInHeader'
import FloatCard from '../../components/FloatCard/FloatCard'

import logo from '../../assets/images/logo.svg'

import userVector from '../../assets/images/feather-user.svg'

import profilePhoto from '../../assets/images/fakeProfilePhoto.jpg'

import att1 from '../../assets/images/att-img1.jpg'

import att2 from '../../assets/images/att-img2.jpg'

import att3 from '../../assets/images/att-img3.jpg'

import grid from '../../assets/images/feather-grid.svg'
import checkboxSelected from '../../assets/images/checkbox-selected.svg'
import edit from '../../assets/images/edit.svg'

function Client(props) {

    return <>
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:bold,100,200,300" rel="stylesheet" />

            <link href="https://fonts.googleapis.com/css?family=SourceSansPro:Regular,100,200,300" rel="stylesheet" />

        </Head>
        <div style={{ position: 'relative', height: '100%' }}>
            <SignedHeader title='Jenny B. Machuca' />
            <div style={{ height: '55%' }}>

                <FloatCard>
                    <div className={'floatCardContent'}>
                        <div className={'flexRow'}>
                            <div className={'bigText'}>Jenny B. Machuca</div>
                            <hr style={{
                                width: '55%',
                                alignSelf: 'center',
                                borderColor: '#f6f1eb'
                            }} />
                        </div>
                        <div className={'flexRow smallText'}
                            style={{ justifyContent: 'space-between', paddingRight: '15%' }}>
                            <div>
                                <div className={'smallTitle'}>AGE</div>
                                <div>32 <img style={{ width: 16 }} src={edit} alt="" /></div>
                            </div>
                            <div>
                                <div className={'smallTitle'}>GENDER</div>
                                <div className={'smallText'}>Female<img style={{ width: 16 }} src={edit} alt="" /></div>
                            </div>
                            <div>
                                <div className={'smallTitle'}>INTERESTED IN In</div>
                                <div>Who cares<img style={{ width: 16 }} src={edit} alt="" /></div>
                            </div>
                            <div>
                                <div className={'smallTitle'}>ALERGIES</div>
                                <div>none<img style={{ width: 16 }} src={edit} alt="" /></div>
                            </div>
                        </div>
                        <div className={'flexRow smallText'}
                            style={{ justifyContent: 'space-between', paddingRight: '15%' }}>
                            <div style={{ flex: 1 }}>
                                <div className={'smallTitle'}>ADDRESS</div>
                                <div>51 Rue de la République , 69004 LYON <img style={{ width: 16 }} src={edit} alt="" />
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className={'smallTitle'}>EMAIL</div>
                                <div>monique.chandelle@gmail.com<img style={{ width: 16 }} src={edit} alt="" /></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '50%' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={profilePhoto} alt="" />
                    </div>
                </FloatCard>
            </div>
            <div className={'flexColumn'} style={{ position: 'relative', margin: '0% 15% 0 15% ' }}>
                <div className={'flexRow bigText'}>
                    Jenny B. Machuca
                    <hr style={{
                        alignSelf: 'center',
                        borderColor: '#f6f1eb', width: '70%'
                    }} />
                </div>
                < div style={{ marginTop: 30 }} className={'flexRow'}>
                    <div style={{ flexBasis: '70%' }}>
                        <div>
                            <span className={'smallTitle'}>Tell us about you</span><br />
                            <span className={'smallText'}>Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</span>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <span className={'smallTitle'}>how do you want to smell</span><br />
                            <span className={'smallText'}>Donec id elit non mi porta gravida at eget metus.</span>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <span className={'smallTitle'}>specific memories or feeling your perfume should bring back, in one word</span><br />
                            <span className={'smallText'}>Sed posuere consectetur est at lobortis.</span> <br />
                        </div>
                        <div style={{ marginTop: 20, justifyContent: 'space-between', width: '80%' }} className={'flexRow'}>

                            <div>
                                <span className={'smallTitle'}>Longevity</span>
                                <div><img src={checkboxSelected} alt="" style={{ marginRight: 5 }} /><span>Week</span></div>
                            </div>
                            <div>
                                <span className={'smallTitle'}>Sillages</span>
                                <div><img src={checkboxSelected} alt="" style={{ marginRight: 5 }} /><span>Moderate</span></div>

                            </div>
                            <div>
                                <span className={'smallTitle'}>Seasons</span>
                                <div><img src={checkboxSelected} alt="" style={{ marginRight: 5 }} /><span>Autumn</span></div>
                            </div>

                        </div>

                    </div>
                    <div style={{ flexBasis: '30%' }} className={'smallTitle'}>Attached pictures
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <img src={att1} style={{ width: '50%', padding: 5, objectFit: 'contain' }} alt="" />
                            <img src={att2} style={{ width: '50%', padding: 5, }} alt="" />
                            <img src={att3} style={{ width: '50%', padding: 5, objectFit: 'contain' }} alt="" />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </>
}

export default Client