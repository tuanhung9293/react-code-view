import React from 'react'
import classNames from 'classnames'
import styles from './CrossIcon.module.css'

function CrossIcon({dark, small}) {
  const color = dark
    ? '#000000'
    : '#ffffff'

  const className = classNames({
    [styles.base]: true,
    [styles.small]: small
  })

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20">
      <path fill={color} d="M629.854051,297.732731 L637.465462,290.12132 L635.344142,288 L627.732731,295.611411 L620.12132,288 L618,290.12132 L625.611411,297.732731 L618,305.344142 L620.12132,307.465462 L627.732731,299.854051 L635.344142,307.465462 L637.465462,305.344142 L629.854051,297.732731 Z" transform="translate(-618 -288)" />
    </svg>
  )
}

export default CrossIcon