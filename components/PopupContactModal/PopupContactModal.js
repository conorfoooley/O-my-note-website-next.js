import React, { useState, useImperativeHandle } from "react";
import { Modal, Button, Form, Input } from "antd";
import Router from "next/router";
import Separator from '../Separator/Separator'
import { ArrowRightOutlined, } from '@ant-design/icons';
import CloseButton from '../CloseButton/CloseButton'
import Logo from '../../assets/images/logo.svg'

const PopupContactModal = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => ({

        openModal() {
            setVisible(true)
        }

    }));


    return <div >

        <Modal
            title={null}
            visible={visible}
            footer={null}
            closable={false}
            width={774}
            onCancel={() => setVisible(false)}
            maskClosable={true}
            style={{ borderRadius: 20 }}
            centered
        >

            <div className="" style={{    borderRadius: 20}}>
                <div className="flexColumn">
                    <section className="contactusmain">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div>
                                        <div className='client-list-header' style={{ padding: 0, justifyContent: 'flex-end' }}>

                                            <CloseButton onClick={() => setVisible(false)} />
                                        </div>
                                        <div style={{ height: 250, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <div className={'container-rightside-text'} style={{ flex: 3 }}>
                                                <img src={Logo} alt="#" />
                                            </div>
                                            <div style={{ flex: 5, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', textAlign: 'center' }}>
                                                <div>
                                                    <h1>Interested in OMИ ?</h1>
                                                    <p>Request a demo </p>
                                                </div>
                                                <Button
                                                    shape='round'
                                                    onClick={() => Router.push('/demo_request')}
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
                                                    }} >
                                                  <p className={'container-rightside-text'} style={{margin: 0}}>Request a demo</p>    <ArrowRightOutlined style={{ fontSize: '25px', marginLeft: '15px' }} />
                                                </Button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>

            </div>


        </Modal>

    </div>

})


export default PopupContactModal
