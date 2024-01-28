import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitUserDetails = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="form-bg">
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form onSubmit={this.onSubmitUserDetails}>
            <div className="input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                onChange={this.onChangeUsername}
                value={username}
                placeholder="Username"
                className="input-bar"
                id="username"
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                onChange={this.onChangePassword}
                value={password}
                placeholder="Password"
                className="input-bar"
                id="password"
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            {showErrorMsg && <p className="err-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
