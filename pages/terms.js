import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SideStickyMenu from '../components/SideStickyMenu/SideStickyMenu'

const Terms = (props) => {
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
                                    <h1>Terms and Conditions</h1>
                                    <div className="terms-and-conditions" >
                                        <p><em>Last updated: Mai 4, 2020</em><br />
                                    The present general terms and conditions of use are intended to provide legal
                                    guidance on how to make the website available and to define the access&#39; conditions
                                    and use of services by the user.<br />
                                    These Terms and Conditions are available on the website under the heading &quot;Terms&quot;.</p>
                                        <h5>ARTICLE 1: LEGAL NOTICES</h5>
                                        <p>The Omynote.io website is published by Omynote, SAS with a share capital of
                                        15.100€, whose registered office is located at 66 avenue des champs Élysées,
                                        75008 Paris, France. The company is registered in the Paris Trade Register: B
                                        801 407 453 RCS PARIS. The company can be contacted by email at
                                    contact@Omynote.io. <br />Omynote’s website is hosted by Amazon Web Services.</p>
                                        <h5>ARTICLE 2: ACCESS AND PRESENTATION OF THE WEBSITE</h5>
                                        <p>The Omynote.io website allows to user a free access to the following services:<br />
                                            <ul>
                                                <li style={{ listStyle: 'inside' }} >Access to company presentation</li>
                                                <li style={{ listStyle: 'inside' }}>Access to product presentation</li>
                                                <li style={{ listStyle: 'inside' }}>Access to company news and events (press releases, articles, videos…)</li>
                                            </ul>
                                        The publisher implements the technical solutions at his disposal to allow access to the website free of charge, 24 hours a day, 7 days a week. However, he may at any time suspend, limit or interrupt access to the website or certain pages of it in order to proceed with updates, modifications of its content or any other action deemed necessary for the proper functioning of the website.<br /> These general terms and conditions apply to any declension or extension of the website on existing or future social and/or community networks.</p>
                                        <h5>ARTICLE 3: ACCEPTANCE OF TERMS OF USE</h5>
                                        <p>The access and the use of the website are subjected to the acceptance and the respect of the present general conditions of use.<br />The publisher reserves the right to modify, at any time and without notice, the website and the present terms and conditions, in particular to adapt to the evolutions of the website by the provision of new features or the deletion / modification of existing functionalities.<br />It is therefore advisable for the user to refer before any navigation to the latest version of the terms and conditions, accessible at any time on the website. In case of disagreement with the terms and conditions, no use of the website can be made by the user.</p>
                                        <h5>ARTICLE 4: WEBSITE MANAGEMENT</h5>
                                        <p>For the good management of the website, the publisher can at any time:
                                            <ul>
                                                <li style={{ listStyle: 'inside' }} >suspend, interrupt or restrict access to all or part of the website, reserve access to the website or certain parts of the website to a specific category of user</li>
                                                <li style={{ listStyle: 'inside' }}>remove any information that could disrupt its functioning or that contravenes national or international laws or the rules of Netiquette</li>
                                                <li style={{ listStyle: 'inside' }}>suspend the website in order to make updates.</li>

                                            </ul></p>
                                        <h5>ARTICLE 5: HYPERTEXT LINKS</h5>
                                        <p>The website may contain hypertext links to other websites on which Omynote does not exercise control. Despite the preliminary and regular checks carried out by the publisher, the latter declines all responsibility for the contents that can be found on these websites.<br /> The publisher authorizes the installation of hypertext links to any page or document of his website provided that the setting up of these links is not carried out for commercial or advertising purposes. In addition, the prior information of the publisher of the website is necessary before any hyperlinking.<br /> Websites which disclose information of an illicit, violent, polemical, pornographic, or xenophobic nature or which may affect the sensitivity of the greatest number are excluded from this authorization.<br />Finally, Omynote reserves the right to have a hypertext link to its website removed at any time if the website deems it not in conformity with its editorial policy.</p>
                                        <h5>ARTICLE 6: LIABILITY</h5>
                                        <p>The sources of the information disseminated on the Omynote.io website are deemed
                                        reliable but the website does not guarantee that it is free from defects, errors or
                                        omissions.<br />
                                        The information provided is for information purposes only and has no contractual
                                        value. Despite regular updates, the Omynote.io website cannot be held responsible
                                        for the modification of the administrative and legal provisions occurring after the
                                        publication. Similarly, the website cannot be held responsible for the use and
                                        interpretation of the information contained on the website.<br />
                                        The website Omynote.io cannot be held responsible for any viruses that could infect
                                        the computer or any computer equipment of the surfer, following use, access or
                                        downloading from this website.<br />
                                        The liability of the website cannot be committed in case of force majeure or the unpredictable and insurmountable fact of a third party.</p>
                                        <h5>ARTICLE 7: INTELLECTUAL PROPERTY</h5>
                                        <p>The trademarks, logos, signs and all the contents of the website (texts, images,
                                        sound…) are protected by the code of intellectual property and more particularly by
                                        the copyright.<br />
                                        The user must request the prior authorization of the website for any reproduction,
                                        publication, copy of the different contents. It undertakes to use the contents of the
                                        website in a strictly private framework, any use for commercial and advertising
                                        purposes is strictly prohibited.<br />
                                        Any total or partial representation of this website by any process whatsoever without
                                        the express authorization of the operator of the internal website would constitute an
                                        infringement punishable by article L335-2 and following of the French code of the
                                        intellectual property.<br />
                                        It is recalled in accordance with article L122-5 of the French intellectual property code
                                        that the user who reproduces, copies or publishes the protected content must cite the author of the source.</p>
                                        <h5>ARTICLE 8: COOKIES AND DATA COLLECTION</h5>
                                        <p>Please refer to the website Privacy Policy.</p>
                                        <h5>ARTICLE 9: CONTACT</h5>
                                        <p>If you have any queries or requests for information about the website or any
                                        allegations of illegal content, the user can contact the publisher at the following email
                                        address: contact@Omynote.io or at the address of the registered office of Omynote, 66 avenue des champs Élysées, 75008 Paris, France.</p>
                                        <h5>ARTICLE 10: APPLICABLE LAW AND JURISDICTION</h5>
                                        <p>French law applies to this contract. In the absence of an amicable resolution of a
                                        dispute between the parties, the French courts will be competent to know them.<br />
                                        If you have any questions regarding the application of these Terms of Use, you may contact the publisher with the contact details listed in section 1.</p>
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

export default Terms