import React from "react"
import { Modal, Button } from 'antd'
import Separator from '../Separator/Separator'
import { ArrowRightOutlined, CloseCircleOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';


export default class ModalAddClient extends React.Component {

    constructor(props) {
        super()
        this.state = {
            visible: false
        }
    }
    render() {
        const { visible } = this.state
        return (<div>
            <Button
                onClick={() => { this.setState({ visible: true }) }}
                shape='round'
                htmlType="submit"
                style={{
                    backgroundColor: '#1F2A56',
                    color: "#fff",
                    fontSize: 12,
                    border: 'none',
                    height: 48,
                    width: 152
                }} >
                ADD NEW <ArrowRightOutlined />
            </Button>
            < Modal
                title={null}
                visible={visible}
                footer={null}
                closable={false}
                style={{ borderRadius: '2%' }}
                width={574}
                maskClosable={true}
            >
                <div className='client-list-header' style={{ padding: 0 }}>
                    <h2 className='client-list-title' >Add new client</h2>
                    <Separator size='small' />
                    <CloseButton onClick={() => { this.setState({ visible: false }) }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 60 }} >
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 120,
                                width: 120,
                                border: 'solid 1px #cfb992',
                                backgroundColor: '#f6f1eb',
                                borderRadius: '50%',
                                marginRight: 40
                            }} >

                            <MailOutlined style={{ color: "#cfb992", fontSize: 40 }} />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 10 }}>Invite by email</div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 120,
                                width: 120,
                                border: 'solid 1px #e4e4e4',
                                backgroundColor: '#fff',
                                borderRadius: '50%'
                            }} >
                            <EditOutlined style={{ color: "#000", fontSize: 40 }} />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 10 }}>Enter client manually</div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 60 }}>
                    <Button
                        onClick={() => { this.setState({ visible: false }) }}
                        shape='round'
                        htmlType="submit"
                        style={{ backgroundColor: '#1F2A56', color: "#fff", fontSize: 12, border: 'none', height: 48, width: 152 }} >
                        ADD NEW <ArrowRightOutlined />
                    </Button>
                </div>
            </Modal >
        </div>
        )
    }
}
