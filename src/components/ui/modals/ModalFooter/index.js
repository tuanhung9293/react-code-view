import React from 'react'
import styles from './ModalFooter.module.css'

function ModalFooter({children}) {
  return (
    <footer className={styles.footer}>
      {children}
    </footer>
  )
}

export default ModalFooter