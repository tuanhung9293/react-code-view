import React from 'react'
import classNames from 'classnames'
import styles from './Columns.module.css'

function Columns({children, center}) {
  const className = classNames({
    [styles.base]: true,
    [styles.center]: center
  })
  return <div className={className}>{children}</div>
}

export default Columns