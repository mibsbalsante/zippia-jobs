import { createContext, useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"

const API_URL = "https://www.zippia.com/api"
const API_CONFIG = {
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
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  }),
}

const Jobs = createContext()

export const JobsProvider = ({ children }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/jobs`, API_CONFIG)
      .then(dt => {
        if (dt.status < 400) return dt.json()
        return dt.text().then(text => {
          throw new Error(text)
        })
      })
      .then(({ jobs }) => setList(jobs))
      .catch(({ message }) => console.error(message))
  }, [])

  return <Jobs.Provider value={{ list }}>{children}</Jobs.Provider>
}

JobsProvider.propTypes = {
  children: PropTypes.node,
}

export const useJobsContext = () => useContext(Jobs)
