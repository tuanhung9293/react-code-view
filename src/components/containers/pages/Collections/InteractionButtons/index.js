import React from 'react'
import {connect} from 'react-redux'
import LikeButton from 'components/ui/buttons/LikeButton'
import DeleteButton from 'components/ui/buttons/DeleteButton'
import EditButton from 'components/ui/buttons/EditButton'
import {likeCollection, removeCollection} from 'state/actions/collectionsAction'
import styles from './InteractionButtons.module.css'

const InteractionButtons = ({itemData, likedCollection, deleteCollection}) => {
  return (
    <div className={styles.base}>
      <LikeButton color={`${itemData.liked ? 'red' : 'white'}`} onClick={() => likedCollection(itemData.nasaId)} />
      <DeleteButton onClick={() => deleteCollection(itemData.nasaId)} />
      <EditButton to={`/collection/edit/${itemData.nasaId}`} />
    </div>
  )
}

export default connect(
  null,
  (dispatch) => ({
    likedCollection: (collectionId) => dispatch(likeCollection(collectionId)),
    deleteCollection: (collectionId) => dispatch(removeCollection(collectionId))
  })
)(InteractionButtons)
