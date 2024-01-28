import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul className="header-bg">
      <li>
        <Link to="/">
          <img
            className="header-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
      </li>
      <li>
        <div className="link-container">
          <Link className="linked-item" to="/">
            <p>Home</p>
          </Link>
          <Link className="linked-item" to="/jobs">
            <p>Jobs</p>
          </Link>
        </div>
      </li>
      <li>
        <button onClick={onClickLogout} className="logout-button" type="button">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
