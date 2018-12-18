import {
  ADD_COLLECTION,
  EDIT_COLLECTION,
  REMOVE_COLLECTION,
  LIKE_COLLECTION,
  SORT_COLLECTION
} from 'constants/actionTypes'

const initialState = {
  data: []
}

function collections(state = initialState, action) {
  switch (action.type) {
    case ADD_COLLECTION:
      let existingCollection = state.data.some((item) => {
        return item.nasaId === action.payload.itemData.nasaId
      })

      if (existingCollection) {
        let newAddState = state.data.map((item) => {
          if (item.nasaId === action.payload.itemData.nasaId) return action.payload.itemData
          return item
        })

        return {...state, data: [...newAddState]}
      } else {
        return {
          ...state,
          data: [...state.data, action.payload.itemData]
        }
      }

    case EDIT_COLLECTION:
      let newEditState = state.data.map((item) => {
        if (item.nasaId === action.payload.itemData.nasaId) return action.payload.itemData
        return item
      })

      return {...state, data: [...newEditState]}

    case REMOVE_COLLECTION:
      let newRemoveState = state.data.filter((item) => {
        return item.nasaId !== action.payload.id
      })

      return {...state, data: [...newRemoveState]}

    case LIKE_COLLECTION:
      let newLikeState = state.data.map((item) => {
        if (item.nasaId === action.payload.id) return {...item, liked: !item.liked}
        return item
      })

      return {...state, data: [...newLikeState]}

    case SORT_COLLECTION:
      let newSortState = state.data.sort((a, b) => {
        if (a[action.payload[0]] > b[action.payload[0]]) return (parseInt(action.payload[1]) * -1)
        if (a[action.payload[0]] < b[action.payload[0]]) return parseInt(action.payload[1])
      })

      return {...state, data: [...newSortState]}

    default:
      return state
  }
}

export default collections