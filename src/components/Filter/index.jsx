import { useJobsContext } from "@ctx/Jobs"

import Toggle from "@cmp/Toggle"

import styles from "./styles.module.scss"

const Filter = () => {
  const {
    jobTitle,
    list,
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

      {list.length > 0 && (
        <div className={styles.filterForm}>
          <select
            className={styles.filterSelect}
            value={selectedCompany}
            onChange={handleFilterCompany}
          >
            <option value="">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>

          <Toggle
            isActive={shouldFilterByDate}
            handleClick={handleFilterByDate}
          >
            {" "}
            Filter by last 7 days
          </Toggle>
        </div>
      )}
    </main>
  )
}
export default Filter
