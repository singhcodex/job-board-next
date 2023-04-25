const { default: Job } = require("./Job")


const Jobs = ({jobs, isDashboard}) => {
    if(!jobs) return null

    return (
        <>
        {jobs.map((job, index) => (
            <Job key={index} job={job}/>
        ))}
        </>
    )
}

export default Jobs