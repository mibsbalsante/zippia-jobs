import { createContext, useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"

import { API_URL, getAPIConfig } from "@utl/api"

const Jobs = createContext()

const _getTopResults = results => [...results].splice(0, 10)

export const JobsProvider = ({ children }) => {
  // use as page title
  const [jobTitle] = useState("Business Analyst")

  // complete list + filtered list
  const [list, setList] = useState([])
  const [results, setResults] = useState([])

  // filters
  const [selectedCompany, setSelectedCompany] = useState("")
  const [shouldFilterByDate, setFilterByDate] = useState(false)

  const getCompanies = () => list.map(({ companyName }) => companyName).sort()

  // internal methods
  const _filterByCompany = filtered => {
    let jobsFound = filtered.filter(
      ({ companyName }) => companyName === selectedCompany
    )

    jobsFound = jobsFound.length || selectedCompany ? jobsFound : filtered

    return jobsFound
  }

  const _filterByPostingDate = filtered => {
    if (!shouldFilterByDate) return filtered

    let sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const jobsFound = filtered.filter(
      ({ postingDate }) => new Date(postingDate) >= sevenDaysAgo
    )

    return jobsFound
  }

  const _filter = () => {
    let jobsFound = _filterByCompany(list)
    jobsFound = _filterByPostingDate(jobsFound)
    jobsFound = _getTopResults(jobsFound)

    setResults(jobsFound)
  }

  useEffect(() => {
    _filter()
  }, [selectedCompany, shouldFilterByDate])

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
        selectedCompany,
        shouldFilterByDate,
        setSelectedCompany,
        setFilterByDate,
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
