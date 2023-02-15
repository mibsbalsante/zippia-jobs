import PropTypes from "prop-types"

import styles from "./styles.module.scss"

const Toggle = ({ isActive, children, handleClick }) => (
  <button
    onClick={handleClick}
    className={`${styles.toggle} ${isActive ? styles.toggleActive : ""}`}
  >
    <span /> {children}
  </button>
)

Toggle.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func,
}

export default Toggle
