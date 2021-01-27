import { Filters } from '../components/filters';
import { Job } from '../components/job';
import { getJsonFromFetch } from '../helpers/fetch';
import { Search } from './search';
import { sortByLocation, sortByExperience, sortByFirstPropertyOfElement } from '../helpers/filters';

import { useState, useEffect } from 'react';

export const Main = () => {
  const [filters, setFilters] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSort, setLocationSort] = useState("NONE");
  const [departmentSort, setDepartmentSort] = useState(null);
  const [educationSort, setEducationSort] = useState(null);
  const [experienceSort, setExperienceSort] = useState(null);

  const onChangeTermSearch = searchTerm => (setSearchTerm(searchTerm))
  

  useEffect(async() => {
    setLoadingFilters(true);
    const filtersResults = await getJsonFromFetch('/api/filters');
    // Preprocess filters
    const titles = Object.keys(filtersResults);
    const filtersToShow = titles.map(key => {
      return {
        categoryTitle: key,
        data: filtersResults[key]
      }
    });
    setFilters(filtersToShow);
    setLoadingFilters(false);
  }, [])

  useEffect(async() => {
    setLoadingJobs(true);
    let queryParam = "";
    queryParam += `searchTerm=${searchTerm}`
    const jobsResult = await getJsonFromFetch(`/api/jobs?${queryParam}`);
    setJobs(jobsResult.jobs);
    setLoadingJobs(false);
  }, [searchTerm]);

  useEffect(() => {
    setLoadingJobs(true);
    if(jobs && jobs.length > 0) {
      setJobs(
      jobs.map(job => {
        job.items = job.items.sort(sortByExperience(experienceSort));
        return job;
      }));
    }
    
  }, [experienceSort]);

  useEffect(() => {
    setLoadingJobs(true);
    if(jobs && jobs.length > 0) {
      setJobs(
      jobs.map(job => {
        job.items = job.items.sort(sortByLocation(locationSort));
        return job;
      }));
    }
    
  }, [locationSort]);

  useEffect(() => {
    setLoadingJobs(true);
    if(jobs && jobs.length > 0) {
      setJobs(
      jobs.map(job => {
        job.items = job.items.sort(sortByFirstPropertyOfElement(departmentSort,'department'));
        return job;
      }));
    }
    
  }, [departmentSort]);

  useEffect(() => {
    setLoadingJobs(true);
    if(jobs && jobs.length > 0) {
      setJobs(
      jobs.map(job => {
        job.items = job.items.sort(sortByFirstPropertyOfElement(educationSort,'required_credentials'));
        return job;
      }));
    }
    
  }, [educationSort]);


  return (
    <>
    <div className="container mx-auto py-6 px-4">
        <div className="mx-10 hidden md:block">
          <Search onChange={onChangeTermSearch} />
        </div>
      </div>
    <div className="flex flex-wrap -mx-2 mb-8">
      <div className="w-full lg:w-1/3 px-2">
         <div className="border text-sm text-grey-dark flex flex-col pl-4">
           {
             loadingJobs && <p> Loading Jobs... </p>
           }
           {filters.map(filter => {
            return (
              <>
                <Filters categoryName={filter.categoryTitle} items={filter.data}/>
                <hr className="my-6"/> 
              </>
            )
           })}
            
         </div>
      </div>
      <div className="w-full lg:w-2/3 px-2">
         <div className="border text-sm text-grey-dark flex flex-col">
           {
             loadingFilters && <p> Loading Filters... </p>
           }
           <p>Sort by:</p>
           <div className="flex items-center">
            <label htmlFor="location" className="">Location</label>
            <select id="location"  onChange={(e) => {setLocationSort(e.target.value)}} name="location" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
              <option value="NONE">NONE</option>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
            <label htmlFor="department" className="">Department</label>
            <select id="department" onChange={(e) => {setDepartmentSort(e.target.value)}} name="department" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
              <option value="NONE">NONE</option>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
            <label htmlFor="education" className="">Education</label>
            <select id="education" onChange={(e) => {setEducationSort(e.target.value)}}  name="education" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
              <option value="NONE">NONE</option>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
            <label htmlFor="experience" className="">Experience</label>
            <select id="experience" onChange={(e) => {setExperienceSort(e.target.value)}}   name="experience" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
              <option value="NONE">NONE</option>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
            {jobs.map(job => {
              return(
                <Job totalJobs={job.total_jobs_in_hospital} name={job.name} jobs={job.items}/>
              )
            })}
         </div>
      </div>
   </div>
   </>

  )
}