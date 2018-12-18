import React from 'react'
import styles from './ScreenContent.module.css'

function ScreenContent(props) {
  return <div {...props} className={styles.base} />
}

export default ScreenContent