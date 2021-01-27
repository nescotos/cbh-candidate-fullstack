import moment from 'moment';
import { useState } from 'react';

export const Job = ({totalJobs, name, jobs, }) => {
  const getBadgeName = (name) => name.slice(0, 2)
  const [displayJobs, setDisplayJobs] = useState(false)
  return (
    <>
    <div className="flex px-2 py-2">
      <span className="rounded-full px-4 bg-gray-200 text-black p-2 rounded uppercase leading-none flex items-center">{getBadgeName(name)}</span>
      <button onClick={() => {setDisplayJobs(!displayJobs)}}>
        <p className="pl-8 flex text-gray-700">
        {jobs.length} for {name}
      </p>
      </button>
      
    </div>
    
        {
          displayJobs &&
          jobs.map(job => {
            return (
                <div>
                <h3 className="font-bold uppercase">{job.job_title}</h3>

                <ul className="justify-items"> 
                        <li>{job.job_type} | {job.salary_range[0]} - {job.salary_range[1]} an hour | {job.city} {moment(job.created).fromNow()}</li>
                </ul>
                <h3 className="font-bold uppercase">Department</h3>

                <ul className="justify-items"> 
                        <li>{job.department.join(', ')}</li>
                </ul>
                <h3 className="font-bold uppercase">Hours / Shifts</h3>

                <ul className="justify-items"> 
                        <li>{job.hours} hours {job.work_schedule}</li>
                </ul>
                <h3 className="font-bold uppercase">Summary</h3>

                <ul className="justify-items"> 
                        <li>{job.description}</li>
                </ul>
                <ul className="justify-items"> 
                        <li>{job.description}</li>
                </ul>
                <ul className="justify-items">
                  <li>
                    <button className="bg-blue-500 text-white">
                      Job Details
                    </button>
                  </li>
                  <li>
                    <button className="bg-white	text-blue-700">
                      Save Job
                    </button>
                  </li>
                </ul>
                
                
                <hr className="my-6"/> 
              </div>
            )
          })
        }
    </>
  )
}