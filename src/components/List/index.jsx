import { useJobsContext } from "@ctx/Jobs"

import ListCard from "@cmp/ListCard"

import styles from "./styles.module.scss"

const List = () => {
  const { list } = useJobsContext()

  return (
    <section className={styles.list}>
      {list.map(job => (
        <ListCard key={job.jobId} {...job} />
      ))}
    </section>
  )
}

export default List
