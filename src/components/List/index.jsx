import { useJobsContext } from "@ctx/Jobs"

import ListCard from "@cmp/ListCard"

import styles from "./styles.module.scss"

const List = () => {
  const { results } = useJobsContext()

  return (
    <section className={styles.list}>
      {results.map(job => (
        <ListCard key={job.jobId} {...job} />
      ))}
    </section>
  )
}

export default List
