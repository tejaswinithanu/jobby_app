import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const HomeRoute = () => (
  <div>
    <Header />
    <div className="home-bg">
      <div className="home-text-container">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default HomeRoute
