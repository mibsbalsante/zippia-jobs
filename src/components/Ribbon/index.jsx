import PropTypes from "prop-types"

import styles from "./styles.module.scss"

const Ribbon = ({ children }) =>
  children && <span className={styles.ribbon}>Easy Apply</span>

Ribbon.propTypes = {
  children: PropTypes.bool,
}

export default Ribbon
