import {
  SEARCH_NASA_MEDIA,
  SEARCH_MORE_NASA_MEDIA,
  FETCH_MEDIA_ITEM_COLLECTION
} from 'constants/actionTypes'

const initialState = {
  data: [],
  totalHits: 0,
  params: {},
  loading: false,
  loadingMore: false
}

function medias(state = initialState, action) {
  switch (action.type) {
    case SEARCH_NASA_MEDIA.PENDING:
      return {
        ...state,
        loading: true
      }

    case SEARCH_MORE_NASA_MEDIA.PENDING:
      return {
        ...state,
        loadingMore: true
      }

    case SEARCH_NASA_MEDIA.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        totalHits: action.payload.totalHits,
        params: action.payload.params,
        loading: false
      }

    case SEARCH_MORE_NASA_MEDIA.SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        params: action.payload.params,
        loadingMore: false
      }

    case FETCH_MEDIA_ITEM_COLLECTION.SUCCESS:
      let newStateData = [...state.data]
      newStateData[action.meta.index] = {
        ...newStateData[action.meta.index],
        thumbUrl: action.payload.thumbUrl,
        mediaUrl: action.payload.mediaUrl
      }

      return {
        ...state,
        data: newStateData
      }
    default:
      return state
  }
}

export default medias