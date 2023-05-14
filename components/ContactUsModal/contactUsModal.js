import React, { useState, useImperativeHandle } from "react";
import { connect } from 'react-redux'
import { Modal, Button, Form, Input } from "antd";
import Separator from '../Separator/Separator'
import { ArrowRightOutlined, } from '@ant-design/icons';
import CloseButton from '../CloseButton/CloseButton'


const ContactUsModal = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => ({

        openModal() {
            setVisible(true)
        }

    }));

    const onFinish = values => {
        var formData = new FormData();
        for (var key in values) {
            formData.set(key, values[key]);
        }
        props.contactUs(
            formData,
            () => alert('contact request sent')
        )
    }


    return <div >

        <Modal
            title={null}
            visible={visible}
            footer={null}
            closable={false}
            width={574}
            onCancel={() => setVisible(false)}
            maskClosable={true}
            style={{ borderRadius: '2%' }}
            centered
        >

            <div className="">
                <div className="flexColumn">
                    <section className="contactusmain">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div>
                                        <div className='client-list-header' style={{ padding: 0 }}>
                                            <h2 className='client-list-title' >Contact Us</h2>
                                            <Separator />
                                            <CloseButton onClick={() => setVisible(false)} />
                                        </div>

                                        <Form action="#" id="contact" onFinish={onFinish}>
                                            <div className="row">
                                                <div style={{ width: '48%' }}>
                                                    <label htmlFor="#"><em>Name</em></label>
                                                    <Form.Item name="name" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                        <Input style={{ padding: '6.5px 11px' }}
                                                            placeholder="Your Name"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div style={{ width: '48%' }}>
                                                    <label htmlFor="#"><em>Last Name</em></label>
                                                    <Form.Item name="lastName" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                        <Input style={{ padding: '6.5px 11px' }}
                                                            placeholder="Last Name"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div style={{ width: '48%' }}>
                                                    <label htmlFor="#"><em>Email</em></label>
                                                    <Form.Item name="email" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                        <Input style={{ padding: '6.5px 11px' }}
                                                            placeholder="Email Address"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div style={{ width: '48%' }} >
                                                    <label htmlFor="#"><em>Phone</em></label>
                                                    <Form.Item name="phone" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                                        <Input style={{ padding: '6.5px 11px' }}
                                                            placeholder="Phone Number"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 section-form">
                                                    <Form.Item name="message" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
                                                        <Input.TextArea name="message" placeholder="Write Your Message" ></Input.TextArea>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <Button
                                                        shape='round'
                                                        htmlType="submit"
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
                                                   <p className={'container-rightside-text'}> Send Message</p>      <ArrowRightOutlined style={{ fontSize: '25px', marginLeft: '15px' }} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form>
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

export default ContactUsModal
