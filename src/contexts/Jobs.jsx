import { createContext, useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"

import { API_URL, getAPIConfig } from "@utl/api"

const Jobs = createContext()

const _getTopResults = results => [...results].splice(0, 10)

export const JobsProvider = ({ children }) => {
  const [jobTitle] = useState("Business Analyst")
  const [list, setList] = useState([])
  const [results, setResults] = useState([])

  const getCompanies = () => list.map(({ companyName }) => companyName).sort()

  const filterByCompany = selectedCompany => {
    let jobsFound = list.filter(
      ({ companyName }) => companyName === selectedCompany
    )
    jobsFound = jobsFound.length ? jobsFound : list

    setResults(_getTopResults(jobsFound))
  }

  const filterByPostingDate = shouldFilter => {
    if (!shouldFilter) return setResults(_getTopResults(list))

    let sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const jobsFound = list.filter(
      ({ postingDate }) => new Date(postingDate) >= sevenDaysAgo
    )

    setResults(_getTopResults(jobsFound))
  }

  useEffect(() => {
    fetch(`${API_URL}/jobs`, getAPIConfig({ jobTitle }))
      .then(dt => {
        if (dt.status < 400) return dt.json()
        return dt.text().then(text => {
          throw new Error(text)
        })
      })
      .then(({ jobs }) => {
        setList(jobs)
        setResults(_getTopResults(jobs))
      })
      .catch(({ message }) => console.error(message))
  }, [])

  return (
    <Jobs.Provider
      value={{
        jobTitle,
        list,
        results,
        getCompanies,
        filterByCompany,
        filterByPostingDate,
      }}
    >
      {children}
    </Jobs.Provider>
  )
}

JobsProvider.propTypes = {
  children: PropTypes.node,
}

export const useJobsContext = () => useContext(Jobs)
