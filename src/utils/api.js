export const API_URL = "https://www.zippia.com/api"

export const getAPIConfig = (body = {}) => ({
  method: "POST",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
    ...body,
  }),
})
