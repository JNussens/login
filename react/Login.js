import React, { Component } from 'react'

import { withSession } from 'vtex.render-runtime'
import { injectIntl } from 'react-intl'

import { LoginSchema } from './schema'
import { setCookie } from './utils/set-cookie'
import { LoginContainerProptypes } from './propTypes'
import LoginComponent from './components/LoginComponent'
import Loading from './components/Loading'
import { getProfile } from './utils/profile'

const DEFAULT_CLASSES = 'gray'

/** Canonical login that calls a mutation to retrieve the authentication token */

export default class Login extends Component {
  static propTypes = LoginContainerProptypes

  static defaultProps = {
    labelClasses: DEFAULT_CLASSES,
  }

  state = {
    isBoxOpen: false,
    renderIconAsLink: false,
    sessionProfile: null,
    resp: "FOO",
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    if (location.href.indexOf('accountAuthCookieName') > 0) {
      setCookie(location.href)
    }

    if (
      !window.__RENDER_8_SESSION__ ||
      !window.__RENDER_8_SESSION__.sessionPromise
    ) {
      return
    }

    window.__RENDER_8_SESSION__.sessionPromise.then(data => {
      const sessionResponse = (data || {}).response
      this.setState({resp: data, sessionProfile: getProfile(sessionResponse) })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const WIDTH_THRESHOLD = 640

    if (window.innerWidth < WIDTH_THRESHOLD && !this.state.renderIconAsLink) {
      this.setState({
        renderIconAsLink: true,
      })
    } else if (
      window.innerWidth >= WIDTH_THRESHOLD &&
      this.state.renderIconAsLink
    ) {
      this.setState({
        renderIconAsLink: false,
      })
    }
  }

  handleProfileIconClick = () => {
    this.setState({ isBoxOpen: !this.state.isBoxOpen })
  }

  handleOutSideBoxClick = () => {
    this.setState({ isBoxOpen: false })
  }

  render() {
    return (
      <LoginWithSession
        isBoxOpen={this.state.isBoxOpen}
        renderIconAsLink={this.state.renderIconAsLink}
        sessionProfile={this.state.sessionProfile}
        {...this.props}
        onOutSideBoxClick={this.handleOutSideBoxClick}
        onProfileIconClick={this.handleProfileIconClick}
      />
    )
  }
}

Login.getSchema = () => ({
  title: 'admin/editor.login.title',
  ...LoginSchema,
})

const LoginWithSession = withSession({
  loading: <Loading />,
})(injectIntl(LoginComponent))
