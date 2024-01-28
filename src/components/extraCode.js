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

renderSkills = () => {
  const {skills} = this.state
  return (
    <ul>
      {skills.map(eachSkill => (
        <li>
          <img alt={eachSkill.name} src={eachSkill.imageUrl} />
          <p>{eachSkill.name}</p>
        </li>
      ))}
    </ul>
  )
}
;<a href={companyWebsiteUrl}>
  Visit <FiExternalLink />
</a>
