import jobs from '../../data/jobs';
import {  getSearchMatches } from '../../helpers/filters';

export default async (req, res) => {
  res.statusCode = 200
  // @todo: implement filters and search
  // @todo: implement automated tests
  const { query: {
    searchTerm
  }} = req;
  let jobsResponse = JSON.parse(JSON.stringify(jobs))
  // Implement Search
  // We need to iterate for each job
  if (searchTerm && searchTerm !== '') {
    jobsResponse = jobsResponse.map(job => {
      job.items = job.items.filter(getSearchMatches(searchTerm));
        return job;
      });
  }
  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

  res.json({jobs: jobsResponse.filter(job => job.items.length > 0)})
}
