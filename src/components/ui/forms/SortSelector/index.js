import React from 'react'
import Select from 'components/ui/forms/Select'
import Label from '../Label'
import {AVAILABLE_SORT_TYPES} from 'constants/defaultValues'
import styles from './SortSelector.module.css'

function SortSelector({label, ...rest}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.labels}>
        <Label>{label}</Label>
      </div>
      <Select {...rest}>
        {AVAILABLE_SORT_TYPES.map(type => (
          <option key={type.id} value={type.value}>{type.message}</option>
        ))}
      </Select>
    </div>
  )
}

export default SortSelector
