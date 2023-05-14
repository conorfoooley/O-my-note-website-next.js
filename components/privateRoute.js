import ServerCookie from "next-cookies";
import Router from "next/router";
import React, { Component } from "react";
import { COOKIES } from "../services/login_service";
import { AuthToken } from "../services/auth_token";


export function privateRoute(WrappedComponent) {
  return class extends Component {

    static async getInitialProps(ctx) {
      const token = ServerCookie(ctx)['authToken'];
      const auth = new AuthToken(token);

      const initialProps = { token, auth };
      if (ctx.req && auth.isExpired) {
        ctx.res.writeHead(302, {
          Location: "/login?redirected=true",
        });
        ctx.res.end();
      }
      if (WrappedComponent.getInitialProps) { return WrappedComponent.getInitialProps(initialProps) };
      return initialProps;
    }

    get auth() {
      console.log(this.props)
      // the server pass to the client serializes the token
      // so we have to reinitialize the authToken class
      //
      // @see https://github.com/zeit/next.js/issues/3536
      return new AuthToken(this.props.ctx.auth.token);
    }

    render() {
      return <WrappedComponent /* auth={this.auth} */ {...this.props} />;
    }
  };
}
