import React from 'react'
import PrimaryButton from 'components/ui/buttons/PrimaryButton'

const AddCollectionButton = ({itemData}) => {
  return (
    <PrimaryButton outlined wide to={`/nasa-search/add-media/${itemData.nasaId}`}>
      Add to NASA Collection
    </PrimaryButton>
  )
}

export default AddCollectionButton
