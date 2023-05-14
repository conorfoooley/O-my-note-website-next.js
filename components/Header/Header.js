import React, {useState} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import {Button, Drawer, Dropdown, Menu} from 'antd'
import classNames from 'classnames'
import {Link as ScrollLink} from 'react-scroll'


import Logo from '../../assets/images/logo.svg'
import logoSmall from '../../assets/images/logosmal.svg'
// import Background from '../../assets/images/header.svg'
import {MenuOutlined} from "@ant-design/icons";
import LanguageSelector from '../LanguageSelector';

const menu = (
    <Menu>
        <Menu.Item>
            <ScrollLink
                to="omn-description"
                offset={-80}
                spy={true}
                smooth={true}
                duration={500}
            >
                <Button
                    onClick={e =>{ e.preventDefault()
                    Router.push("/#omn-description")
                    }}
                    style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                    shape='link'
                >
                    OMИ
                </Button>
            </ScrollLink>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <ScrollLink
                to="ada-description"
                offset={-80}
                spy={true}
                smooth={true}
                duration={500}
            >
                <Button
                    onClick={e => {e.preventDefault()
                    Router.push('/#ada-description')
                    }}
                    style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                    shape='link'
                >
                    ADA
                </Button>
            </ScrollLink>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <ScrollLink
                to="deepnose-description"
                offset={-80}
                spy={true}
                smooth={true}
                duration={500}
            >
                <Button
                    onClick={e => {e.preventDefault()
                    Router.push('/#deepnose-description')
                    }}
                    style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                    shape='link'
                >
                    DeepNoze
                </Button>
            </ScrollLink>
        </Menu.Item>

    </Menu>
);


const Header = (small) => {

    const headerClass = classNames({'header-content': true, 'signed-off-header-content-small': small})
    const imageClass = classNames({'logo': small})

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <div id="header-content"
                 className={headerClass + ' logoDisplay'} /* style={{ backgroundColor: "#F6F1EB" }} */>

                <div className=' header-container'>
                    <div>
                        <Button
                            onClick={() => {
                                Router.push('/demo_request')
                            }}
                            style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                            shape='link'
                        >
                            Request a demo
                        </Button>

                        <Button
                            style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                            shape='link'
                            onClick={() => {
                                Router.push('/login')
                            }}

                        >
                            Login
                        </Button>
                    </div>
                    <div  >
                        <div  onClick={()=> Router.push('/')}>
                            <img
                                onClick={()=> Router.push('/')}
                                id={"header-logo"}
                                src={Logo}
                                width='267'
                                height='60'
                                className={imageClass + ' logoDisplay'}
                                style={{
                                    cursor: 'pointer'
                                }}
                            />

                            <Button
                                onClick={() => {
                                    Router.push('/')
                                }}
                                className={imageClass + ' logoDisplaySmall'}

                                style={{
                                    width: 'auto',
                                    fontFamily: 'Montserrat',
                                    color: '#1f2a56',
                                    fontWeight: 600,
                                    fontSize: 16
                                }}
                                shape='link'
                            >
                                Home
                            </Button>

                        </div>
                    </div>
                    <div>

                        <Dropdown overlay={menu}>
                            <Button
                                onClick={e => e.preventDefault()}
                                style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                                shape='link'
                            >
                                Products
                            </Button>
                        </Dropdown>
                        <Button
                            onClick={() => {
                                Router.push('/about')
                            }}
                            style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                            shape='link'
                        >
                            About Us
                        </Button>
                        <LanguageSelector />
                    </div>
                </div>


            </div>



            <div  className={'backgroundMobile'} style={{    position:'fixed' ,  width:'100%'}}>

                <img
                    onClick={()=> Router.push('/')}

                    style={{
                        width: 50,
                        height: 50,
                        margin: 5
                    }}
                    src={logoSmall} alt=""/>


                <MenuOutlined
                    style={{
                        float: "right", fontSize: 22,

                        marginRight: 10,
                        marginTop: 10
                    }}
                    onClick={showDrawer}/>

                <Drawer
                    title={<img
                        id={"header-logo"}
                        src={Logo}
                        width='267'
                        height='60'
                        className={imageClass}
                        style={{
                            cursor: 'pointer'
                        }}
                    />
                    }
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Button
                            onClick={() => {
                                Router.push('/')
                            }}
                            className={imageClass + ' logoDisplaySmall'}

                            style={{
                                width: 'auto',
                                fontFamily: 'Montserrat',
                                color: '#1f2a56',
                                fontWeight: 600,
                                fontSize: 16
                            }}
                            shape='link'
                        >
                            Home
                        </Button>

                        <Dropdown overlay={menu}>
                            <Button
                                onClick={e => e.preventDefault()}
                                style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                                shape='link'
                            >
                                Products
                            </Button>
                        </Dropdown>


                        <Button
                            onClick={() => {
                                Router.push('/demo_request')
                            }}
                            style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                            shape='link'
                        >
                            Request a demo
                        </Button>
                        <Button
                            onClick={() => {
                                Router.push('/about')
                            }}
                            style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                            shape='link'
                        >
                            About Us
                        </Button>
                    </div>
                </Drawer>
            </div>
        </>
    )
}

export default Header