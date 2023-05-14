import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SideStickyMenu from '../components/SideStickyMenu/SideStickyMenu'

const Privacy = (props) => {
    const handleScroll = (e) => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header-content").classList.add("signed-off-header-content-small");
            document.getElementById("header-logo").classList.add("logo");
        } else {
            document.getElementById("header-content").classList.remove("signed-off-header-content-small");
            document.getElementById("header-logo").classList.remove("logo");
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Header />
            <div style={{ paddingTop: '15%', backgroundColor: '#F6F1EB' }}>
                <section id="terms">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 text-center">
                                <div >
                                    <h1>Privacy policy</h1>
                                    <div className="terms-and-conditions" >
                                        <p><em>Last updated: Mai 4, 2020</em><br />
                                            Omynote (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the https://www.omynote.io website (the &quot;Service&quot;).<br />
                                            This page informs you of our policies regarding the collection, use and disclosure of information when you use our Service.<br />
                                            We will not use or share your information with anyone except as described in this Privacy Policy.<br />
                                            We use this information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at https://www.omynote.io<br />
                                            <h5>1. Information Collection And Use</h5>
                                            You are informed that during your visits to the Service, some data can be collected to:<br />
                                            <ul>
                                                <li>provide relevant reports</li>
                                                <li>improve the quality of the Service</li>
                                                <li>provide you with suitable features, information and content</li>
                                                <li>memorize data so you do not have to enter it again during your visit or during your next visits to the Service</li>
                                                <li>ensure, improve, test and control the efficiency of our Service</li>
                                                <li>develop and test new products and features</li>
                                                <li>monitor different indicators (including total number of visitors, attendance and demographic patterns)</li>
                                                <li>diagnose or solve technical problems.</li>
                                            </ul>
                                            The Service provides you with the collection and processing of non-personal and personal information in compliance with the privacy in accordance with the French law n ° 78-17 of January 6, 1978 relating to data processing, files and freedoms.<br />
                                            Under the terms of the French Data Protection Act of January 6, 1978, you have the right by writing to the email address: contact@omynote.io.<br />
                                            Log Data and similar technologies<br />
                                            We may collect information that your browser sends whenever you visit our Service (&quot;Log Data&quot;).<br />
                                            This Log Data may include information such as your device&#39;s Internet Protocol (&quot;IP&quot;) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics, the number of clicks perform and how you interacts with the Service links, domain names, landing pages, pages visited, device identifiers and other such data.<br />

                                            This information can help us provide relevant reports and contents, and improve the quality of the Service.<br />
                                            Some aspects of the Service may not work properly if the use or availability of device identifiers is hindered or disabled.<br />
                                            We collect and use this analytics data with other information from other users. They
                                            do not therefore allow to identify particular users.<br />
                                            In addition, we may use third party services that collect, monitor and analyse this type
                                            of information in order to measure traffic, evaluate usage patterns on the Service and
                                            increase our Service&#39;s functionality. These third-party service providers have their
                                            own privacy policies addressing how they use such information.<br />
                                            Cookies and similar technologies<br />
                                            You are informed that during your visits to the Service, a cookie can be installed
                                            automatically on your software of navigation. Other similar technologies (pixels, web
                                            beacon, local storage, etc.) can be also used to gather information about how you
                                            use the Service and to provide you with suitable features.<br />
                                            Cookies are small files temporarily stored on the hard disk of your computer or device
                                            by your browser and are necessary for the use of the Service. Cookies do not contain
                                            personal information and cannot be used to identify anyone. A cookie contains a
                                            unique identifier, generated randomly and therefore anonymous. Some cookies
                                            expire at the end of the user’s visit, others remain.<br />
                                            By browsing the Service, you accept them.<br />
                                            You can instruct your browser to refuse all cookies or to indicate when a cookie is
                                            being sent. You can also use the privacy mode from your browser to disable cookies.
                                            However, if you do not accept cookies, you may not be able to use some portions of
                                            our Service.<br />
                                            Personal information<br />
                                            You may freely visit the Service anonymously and without being required to provide
                                            us with any personally identifiable information. However, certain services, requests
                                            and features do require that you provide us with some personally identifiable
                                            information (including, but not limited to, name, address, email) as more particularly
                                            described below; availing yourself of any of these services, requests and features is
                                            voluntary. Personally, identifiable information is data that can be used to identify or
                                            contact you. Please note that we may use the personally identifiable information we
                                            collect through any of the services, requests and features listed below for general
                                            marketing and business purposes. Please do not send confidential information to us
                                            directly through the Service or any other services, or by email to any of the contact
                                            email addresses listed on the Service.<br />
                                            Careers<br />
                                            We post certain career opportunities on the Service. If you are interested in learning
                                            more about any of these opportunities, we provide you a link to email us, and our
                                            third party service provider will collect your email address and any other information
                                            required such as name, mailing address, and your resume and share that information
                                            with us. We use this information to contact you to review or pursue your candidacy.<br />
                                            Contact Us / Get in touch<br />
                                            If you contact us through the contact form option on the Service, we will ask that you
                                            provide certain personally identifiable information, including your name, company you
                                            work for and email address, and you will have the option to provide additional
                                            personally identifiable information. We will use the information you provide to contact
                                            you and to respond to any requests.<br />
                                            Blogs<br />
                                            We provide you the ability to subscribe to our blogs. You will be required to provide
                                            your name or alias and email address.<br />
                                            Events<br />
                                            We provide information related to events that we periodically host. If you are
                                            interested in attending one of Omynote’s events, we will ask you to provide an email
                                            address and other contact information so that we can reserve your seat and follow up
                                            with you.<br />
                                            <h5>2. Information collection sharing</h5>
                                            We undertake not to rent or resell this information collected to external third parties.<br />
                                            <h5>3. Compliance with laws</h5>
                                            We will disclose this information where required to do so by law or subpoena or if we
                                            believe that such action is necessary to comply with the law and the reasonable
                                            requests of law enforcement or to protect the security or integrity of our Service.<br />
                                            <h5>4. Storage of collected information</h5>
                                            This information may be transferred to — and maintained on — computers located
                                            outside of your state, province, country, or other governmental jurisdiction where the
                                            data protection laws may differ than those from your jurisdiction.<br />
                                            If you are located outside France and choose to provide information to us, please
                                            note that we transfer the information to France and process it there.<br />
                                            Your consent to this Privacy Policy followed by your submission of such information
                                            represents your agreement to that transfer.<br />
                                            <h5>5. Security</h5>
                                            The security of this information is important to us, but remember that no method of
                                            transmission over the Internet, or method of electronic storage is 100% secure. While
                                            we strive to use commercially acceptable means to protect your information, we
                                            cannot guarantee its absolute security.<br />
                                            <h5>6. Links to other sites</h5>
                                            Our Service may contain links to other sites that are not operated by us. If you click
                                            on a third-party link, you will be directed to that third party&#39;s site. We strongly advise
                                            you to review the Privacy Policy of every site you visit.<br />
                                            We have no control over, and assume no responsibility for the content, privacy
                                            policies or practices of any third-party sites or services.<br />
                                            <h5>7. Children&#39;s Privacy</h5>
                                            Our Service does not address anyone under the age of 13 (&quot;Children&quot;).<br />
                                            We do not knowingly collect personally identifiable information from children under
                                            13. If you are a parent or guardian and you are aware that your Children has

                                            provided us with Personal Information, please contact us. If we become aware that
                                            we have collected Personal Information from a child under age 13 without verification
                                            of parental consent, we take steps to remove that information from our servers.<br />
                                            <h5>8. Changes to this Privacy Policy</h5>
                                            We may update our Privacy Policy from time to time. We will notify you of any
                                            changes by posting the new Privacy Policy on this page.<br />
                                            You are advised to review this Privacy Policy periodically for any changes. Changes
                                            to this Privacy Policy are effective when they are posted on this page.<br />
                                            <h5>9. Contact us</h5>
                                            If you have any questions about this Privacy Policy, please contact us to
                                            info@omynote.io<br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            <SideStickyMenu />
        </>
    )
}

export default Privacy