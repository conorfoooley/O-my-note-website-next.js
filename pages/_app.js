import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import App from "next/app";
import withReduxStore from "../lib/with-redux-store";
import "../assets/scss/note.scss";
import NProgress from "nprogress";
import Router from "next/router";
import {AppContextProvider} from '../Context/AppContext';

import "antd/dist/antd.css";
import "react-big-calendar/lib/sass/styles.scss";
import "@mdi/font/css/materialdesignicons.css";
import "react-multi-carousel/lib/styles.css";

import "../assets/scss/header.scss";
import "../assets/scss/client.scss";
import "../assets/scss/footer.scss";
import "../assets/scss/home.scss";
import "../assets/scss/search.scss";
import "../assets/scss/contact.scss";
import "../assets/scss/designStyle.scss";
import "../assets/scss/deepnose.scss";
import "../assets/scss/datepicker.scss";
import '../assets/scss/dashboard.scss';
import favicon from "../assets/images/favicon.ico";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

Router.events.on("routeChangeStart", (url) => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps,
        };
    }
    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Cormorant+Garamond:400,600|Montserrat:500,600|Source+Sans+Pro:400,400i,600&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/nprogress.css"
                    />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-RN7W7BL0CP"
                    ></script>{" "}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            <!-- Global site tag (gtag.js) - Google Analytics -->
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-RN7W7BL0CP');
              `,
                        }}
                    />{" "}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W2TL8H6');
            `,
                        }}
                    />{" "}
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href={favicon}
                    />{" "}
                    <title>
                        OMИ is a cutting - edge artificial - intelligence,
                        Fragrance - dedicated company.{" "}
                    </title>{" "}
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>

                <Provider store={store}>
                    <AppContextProvider>
                        <Component {...pageProps} {...this.props} />
                    </AppContextProvider>
                </Provider>
            </>
        );
    }
}

export default withReduxStore(MyApp);
