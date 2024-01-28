import {Component} from 'react'

import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'

const SimilarJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <div>
      <div>
        <img alt="similar job company logo" src={companyLogoUrl} />
        <div>
          <h1>{title}</h1>
          <div>
            <AiFillStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div>
        <MdLocationOn />
        <p>{location}</p>
        <MdWork />
        <p>{employmentType}</p>
      </div>
    </div>
  )
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], skills: [], lifeAtCompany: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      console.log(jobDetails)
      const similarJobs = data.similar_jobs
      const lifeAtCompany = jobDetails.life_at_company
      const updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }

      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      const {skills} = jobDetails
      const updatedSkills = skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
      })
    }
  }

  renderSkills = () => {
    const {skills} = this.state
    return (
      <ul>
        {skills.map(eachSkill => (
          <li key={eachSkill.name}>
            <img alt={eachSkill.name} src={eachSkill.imageUrl} />
            <p>{eachSkill.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div>
        {similarJobs.map(eachJob => (
          <SimilarJob key={eachJob.id} jobDetails={eachJob} />
        ))}
      </div>
    )
  }

  render() {
    const {jobDetails, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      title,
      rating,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <Header />
        <div>
          <div>
            <div>
              <img alt="job details company logo" src={companyLogoUrl} />
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
              <hr />
            </div>
            <div>
              <div>
                <h1>Description</h1>
                <a href={companyWebsiteUrl}>
                  Visit <FiExternalLink />
                </a>
              </div>
              <p>{jobDescription}</p>
            </div>
            <div>
              <h1>Skills</h1>
              {this.renderSkills()}
            </div>
            <div>
              <h1>Life at Company</h1>
              <div>
                <p>{description}</p>
                <img alt="life at company" src={imageUrl} />
              </div>
            </div>
          </div>
          <h1>Similar Jobs</h1>
          {this.renderSimilarJobs()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
