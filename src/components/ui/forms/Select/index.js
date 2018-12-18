import React from 'react'
import classNames from 'classnames'
import styles from './Select.module.css'

function Select({hasError, value, slim, ...props}) {
  const className = classNames({
    [styles.select]: true,
    [styles.error]: hasError,
    [styles.slim]: slim
  })
  return (
    <div className={styles.wrapper}>
      <select value={value || ''} {...props} className={className} />
    </div>
  )
}

export default Select