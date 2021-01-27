const SORTER_DESC = 'DESC';
const SORTER_NONE = 'NONE';

const toRad = value => value * Math.PI / 180;

const geoDistance = (point1, point2) => {
  const R = 6371;
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lon - point1.lon);
  const lat1 = toRad(point1.lat);
  const lat2 = toRad(point2.lat);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

export const getSearchMatches = searchTerm => {
  return function(job) {
  // Naive implementation
  // Check if job type matches the search term
  const regexSearch = new RegExp(searchTerm.toLowerCase());
  if (job.job_type.toLowerCase().search(regexSearch) >= 0) {
    return true;
  }
  // Check if job title matches the search term
  if (job.job_title.toLowerCase().search(regexSearch) >= 0) {
    return true;
  }
  // Check if required skills match the search term
  if (job.required_skills.filter(skill => skill.toLowerCase().search(regexSearch) >= 0).length > 0) {
    return true;
  }
  // Check if department match the search term
  if (job.department.filter(department => department.toLowerCase().search(regexSearch) >= 0).length > 0) {
    return true;
  }
  // Check if state matches the search term
  if (job.state.toLowerCase().search(regexSearch) >= 0) {
    return true;
  }
  // Check if city matches the search term
  if (job.city.toLowerCase().search(regexSearch) >= 0) {
    return true;
  }
  // Check if address matches the search term
  if (job.address.toLowerCase().search(regexSearch) >= 0) {
    return true;
  }
  // If no other condition matches, then return false
  return false;
  }
}

export const sortByLocation = (sorterType) => {

  return function(jobA, jobB) {

    if (sorterType === SORTER_NONE) {
      return 0;
    }
      // Using TGU as reference point
      const referencePoint = {
        lat:14.0650, 
        lon:87.1715,
      };

      const pointJobA = jobA.location.split(',');
      const coorA = {
        lat: parseFloat(pointJobA[0]),
        lon: parseFloat(pointJobA[1]),
      }
      const pointJobB = jobB.location.split(',');
      const coorB = {
        lat: parseFloat(pointJobB[0]),
        lon: parseFloat(pointJobB[1]),
      }

      const distFromReferenceJobA = geoDistance(referencePoint, coorA);
      const distFromReferenceJobB = geoDistance(referencePoint, coorB);

      if (distFromReferenceJobA > distFromReferenceJobB) {
        return sorterType === SORTER_DESC ? -1 : 1
      }

      if (distFromReferenceJobA < distFromReferenceJobB) {
        return sorterType === SORTER_DESC ? 1 : -1
      }

      return 0;

    }
}


export const sortByExperience = (sorterType) => {
  return function(jobA, jobB){
     if (sorterType === SORTER_NONE) {
      return 0;
    }

    if(jobA.experience > jobB.experience) {
      return sorterType === SORTER_DESC ? -1 : 1
    }

    if(jobA.experience < jobB.experience) {
      return sorterType === SORTER_DESC ? 1 : -1
    }

    return 0;
  }
}

export const sortByFirstPropertyOfElement = (sorterType, property) => {
  return function(jobA, jobB){
     if (sorterType === SORTER_NONE) {
      return 0;
    }

    // Too many departments and required_credentials, not sure what department should I use
    if(jobA[property][0] > jobB[property][0]) {
      return sorterType === SORTER_DESC ? -1 : 1
    }

    if(jobA[property][0] < jobB[property][0]) {
      return sorterType === SORTER_DESC ? 1 : -1
    }

    return 0;
  }
}