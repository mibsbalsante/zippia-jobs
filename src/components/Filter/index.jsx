import { useJobsContext } from "@ctx/Jobs"

import styles from "./styles.module.scss"

const Filter = () => {
  const {
    jobTitle,
    getCompanies,
    selectedCompany,
    shouldFilterByDate,
    setSelectedCompany,
    setFilterByDate,
  } = useJobsContext()
  const companies = getCompanies()

  const handleFilterCompany = ({ target }) => {
    setSelectedCompany(target.value)
  }

  const handleFilterByDate = () => {
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
