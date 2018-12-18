import {
  ADD_COLLECTION,
  EDIT_COLLECTION,
  REMOVE_COLLECTION,
  LIKE_COLLECTION,
  SORT_COLLECTION
} from 'constants/actionTypes'

export function addCollection(itemData) {
  return {
    type: ADD_COLLECTION,
    payload: {
      itemData: {...itemData, dateEdited: Date.now()}
    }
  }
}

export function editCollection(itemData) {
  return {
    type: EDIT_COLLECTION,
    payload: {
      itemData: {...itemData, dateEdited: Date.now()}
    }
  }
}

export function removeCollection(id) {
  return {
    type: REMOVE_COLLECTION,
    payload: {
      id
    }
  }
}

export function likeCollection(id) {
  return {
    type: LIKE_COLLECTION,
    payload: {
      id
    }
  }
}

export function sortNasaCollections(value) {
  const parsedValue = value.split(',')
  return {
    type: SORT_COLLECTION,
    payload: {
      ...parsedValue
    }
  }
}
