import { clearHTML } from "@utl/regex"
import PropTypes from "prop-types"

import Ribbon from "@cmp/Ribbon"

import styles from "./styles.module.scss"

const ListCard = ({
  companyName,
  companyLogo,
  easyApplyFlag,
  estimatedSalary,
  jobDescription,
  jobLevels,
  jobTitle,
  location,
}) => (
  <article className={styles.card}>
    <h2 className={styles.title}>{jobTitle}</h2>

    <p className={styles.company}>
      {companyLogo && (
        <img className={styles.companyLogo} src={companyLogo} alt="" />
      )}
      <span className={styles.companyName}>{companyName}</span>
      {location && (
        <>
          -<span>{location}</span>
        </>
      )}
    </p>

    <p
      className={styles.shortDescription}
      dangerouslySetInnerHTML={{ __html: clearHTML(jobDescription) }}
    ></p>

    <Ribbon>{easyApplyFlag}</Ribbon>

    <div className={styles.footer}>
      <p>{estimatedSalary}</p>

      {jobLevels.length > 0 && (
        <>
          <span className={styles.footerSeparator}></span>

          {jobLevels.map(level => (
            <span className={styles.jobLevel} key={level}>
              {level}
            </span>
          ))}
        </>
      )}

      <button className={styles.apply}>Apply</button>
    </div>
  </article>
)

ListCard.propTypes = {
  companyName: PropTypes.string,
  companyLogo: PropTypes.string,
  easyApplyFlag: PropTypes.bool,
  estimatedSalary: PropTypes.string,
  jobDescription: PropTypes.string,
  jobLevels: PropTypes.arrayOf(PropTypes.string),
  jobTitle: PropTypes.string,
  location: PropTypes.string,
}

export default ListCard
