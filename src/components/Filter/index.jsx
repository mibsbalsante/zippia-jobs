import { useJobsContext } from "@ctx/Jobs"
import { useState } from "react"

import styles from "./styles.module.scss"

const Filter = () => {
  const { jobTitle, getCompanies, filterByCompany, filterByPostingDate } =
    useJobsContext()
  const companies = getCompanies()

  const [selectedCompany, setSelectedCompany] = useState("")
  const [shouldFilterByDate, setFilterByDate] = useState(false)

  const handleFilterCompany = ({ target }) => {
    setSelectedCompany(target.value)
    filterByCompany(target.value)
  }

  const handleFilterByDate = () => {
    filterByPostingDate(!shouldFilterByDate)
    setFilterByDate(!shouldFilterByDate)
  }

  return (
    <main className={styles.filter}>
      <h2 className={styles.filterTitle}>{jobTitle} Jobs</h2>

      <div>
        <select value={selectedCompany} onChange={handleFilterCompany}>
          <option value="">All Companies</option>
          {companies.map(company => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <button
          className={`
            ${styles.filterButton} ${
            shouldFilterByDate ? styles.filterButtonActive : ""
          }
          `}
          onClick={handleFilterByDate}
        >
          <span></span> Filter by last 7 days
        </button>
      </div>
    </main>
  )
}
export default Filter
