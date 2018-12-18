import React from 'react'
import classNames from 'classnames'
import styles from './Label.module.css'

function Label({children, title}) {
  const className = classNames({
    [styles.base]: true,
    [styles.title]: title
  })
  return (
    <label className={className}>{children}</label>
  )
}

export default Label