import { useJobsContext } from "@ctx/Jobs"

import styles from "./styles.module.css"

const List = () => {
  const { list } = useJobsContext()

  const clearHTML = description => description.replace(/<\/*\w+\s*\/*>/g, " ")

  return (
    <section>
      {list.map(job => (
        <article key={job.jobId}>
          <h2>{job.jobTitle}</h2>
          <p>{job.companyName}</p>
          <p
            className={styles.shortDescription}
            dangerouslySetInnerHTML={{ __html: clearHTML(job.jobDescription) }}
          ></p>
        </article>
      ))}
    </section>
  )
}

export default List
