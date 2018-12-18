import React from 'react'
import Select from 'components/ui/forms/Select'
import {AVAILABLE_MEDIA_TYPES} from 'constants/defaultValues'

function TypeSelector(props) {
  return (
    <Select {...props}>
      {AVAILABLE_MEDIA_TYPES.map(type => (
        <option key={type.id} value={type.value}>{type.message}</option>
      ))}
    </Select>
  )
}

export default TypeSelector