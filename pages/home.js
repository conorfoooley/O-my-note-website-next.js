import React, { PureComponent } from 'react'

import SignedInHeader from '../components/SignedInHeader/SignedInHeader'
import FloatCard from '../components/FloatCard/FloatCard'
import Calendar from '../components/Calendar/Calendar'
import UserList from '../components/UserList/UserList'


// auth stuff
import { privateRoute } from "../components/privateRoute";


class Home extends PureComponent {
  static getInitialProps(ctx) {
    return { ctx }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("header-content").classList.add("header-content-small");
    } else {
        document.getElementById("header-content").classList.remove("header-content-small");
    }
}



  render() {

    return (
      <div style={{ position: 'relative', height: '100%' }} >
        <SignedInHeader title='home' />
        <div style={{ height: '55%' }}>
          <FloatCard>
            <UserList />
          </FloatCard>
        </div>
        <Calendar />
      </div>

    )
  }
}


export default privateRoute(Home)
