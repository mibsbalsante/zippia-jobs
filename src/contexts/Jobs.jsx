import { createContext, useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"

import { API_URL, API_CONFIG } from "@utl/api"

const Jobs = createContext()

export const JobsProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/jobs`, API_CONFIG)
      .then(dt => {
        if (dt.status < 400) return dt.json()
        return dt.text().then(text => {
          throw new Error(text)
        })
      })
      .then(({ jobs }) => {
        setList(jobs)
        setResults(jobs.splice(0, 10))
      })
      .catch(({ message }) => console.error(message))
  }, [])

  return <Jobs.Provider value={{ list, results }}>{children}</Jobs.Provider>
}

JobsProvider.propTypes = {
  children: PropTypes.node,
}

export const useJobsContext = () => useContext(Jobs)
