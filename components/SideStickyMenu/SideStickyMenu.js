import React, { useRef } from 'react';
import { FacebookFilled, LinkedinFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons'
import ContactUsModal from "../ContactUsModal/contactUsModal";
import { connect } from 'react-redux'
import { contactUs } from '../../actions/public'

const SideStickyMenu = props => {
    const contactModal = useRef(null);
    return (
        <div className={'sticky-menu'} >
            <div style={{ position: 'relative' }}>
                <ul style={{ listStyle: 'none' }} >
                    <li className='sticky-menu-contact'>
                        <a onClick={() => {
                            contactModal.current.openModal()
                        }}>Contact Us</a>
                    </li>
                    <ContactUsModal ref={contactModal} contactUs={props.contactUs} />
                    <li className='sticky-menu-social' ><a href="https://www.facebook.com/OmynoteApp" target="_blank" style={{ display: 'table' }}><FacebookFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                    <li className='sticky-menu-social' > <a href="https://www.linkedin.com/company/omynote/" target="_blank" style={{ display: 'table' }}><LinkedinFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                    <li className='sticky-menu-social'><a href="https://www.instagram.com/omynote/" target="_blank" style={{ display: 'table' }}><InstagramFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                    <li className='sticky-menu-social'><a href="https://www.youtube.com/channel/UCITBrX4QnQwqW5EAlognMsg" target="_blank" style={{ display: 'table' }}><YoutubeFilled style={{ display: 'table-cell', verticalAlign: 'middle' }} /></a></li>
                </ul>
            </div>
        </div >
    )
}

const mapDispatchToProps = {
    contactUs: contactUs,
}

export default connect(null, mapDispatchToProps)(SideStickyMenu) 