import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import Router, { withRouter } from 'next/router'

const TOKEN_STORAGE_KEY = 'authToken'
export class AuthToken {


  constructor(token) {
    this.decodedToken = { email: "", exp: 0 };

    try {
      if (token) {
        this.decodedToken = token //jwtDecode(token)
        // console.log("JWT token:", (token))
      };
    } catch (e) { console.log(e) }
  }

  get expiresAt() {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired() {
    return new Date() > this.expiresAt;
  }

  get isAuthenticated() {
    return !this.isExpired;
  }

  get authorizationString() {
    return `Bearer ${this.token}`;
  }

  static async storeToken(token) {
    Cookie.set(TOKEN_STORAGE_KEY, token);
  }
}
