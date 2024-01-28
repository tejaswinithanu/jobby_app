import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const RenderJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-item">
      <Link className="linked-job" to={`/jobs/${id}`}>
        <div>
          <div>
            <img
              className="company-logo"
              alt="company logo"
              src={companyLogoUrl}
            />
            <div>
              <h1>{title}</h1>
              <div>
                <AiFillStar />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <MdLocationOn />
              <p>{location}</p>
              <MdWork />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <div>
            <hr className="line" />
          </div>
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    searchInput: '',
    employmentType: '',
    salaryRange: '',
    profileDetails: {},
    jobsList: [],
    profileApiStatus: apiConstants.initial,
    jobsApiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const {searchInput, employmentType, salaryRange} = this.state
    this.setState({jobsApiStatus: apiConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobs = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobs,
        jobsApiStatus: apiConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)

    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedProfile = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedProfile,
        profileApiStatus: apiConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img className="profile" alt="profile" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  onRetryProfileApi = () => {
    this.getProfileDetails()
  }

  onRetryJobsApi = () => {
    this.getJobsDetails()
  }

  onProfileLoadFailureView = () => (
    <button onClick={this.onRetryProfileApi} type="button">
      Retry
    </button>
  )

  onJobsLoadFailureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.onRetryJobsApi} type="button">
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(eachJob => (
          <RenderJob jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiConstants.success:
        return this.renderProfile()
      case apiConstants.failure:
        return this.onProfileLoadFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderAvailableJobs = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiConstants.success:
        return this.renderAllJobs()
      case apiConstants.failure:
        return this.onJobsLoadFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="profile-container">
            {this.renderUserProfile()}
            <div>
              <hr className="line" />
            </div>
            <div>
              <h1 className="specification-heading">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(each => (
                  <li
                    className="employment-list-item"
                    key={each.employmentTypeId}
                  >
                    <button className="specification-button" type="button">
                      {each.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <hr className="line" />
            </div>
            <div>
              <h1 className="specification-heading">Salary Range</h1>
              <ul>
                {salaryRangesList.map(each => (
                  <li className="salary-list-item" key={each.salaryRangeId}>
                    <button className="specification-button" type="button">
                      {each.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="search-jobs-container">
            <div className="search-bar">
              <input placeholder="search" className="search" type="search" />
              <button
                className="search-btn"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAvailableJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
