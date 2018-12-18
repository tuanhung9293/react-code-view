import React from 'react'
import styles from './InternalError.module.css'
import PrimaryButton from 'components/ui/buttons/PrimaryButton'

function InternalError() {
  return (
    <div className={styles.wrapper}>
      <h1>
        Something went wrong !!!
      </h1>
      <a href="/collection">
        <PrimaryButton>Back to Collections</PrimaryButton>
      </a>
    </div>
  )
}

export default InternalError
