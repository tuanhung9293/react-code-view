import axios from 'axios'
import {convertMedia, getThumbUrl, getMediaUrl} from 'services/medias'
import {AUDIO_THUMB_URL_DEFAULT} from 'constants/defaultValues'
import {SEARCH_API_URL} from 'constants/urls'
import {
  SEARCH_NASA_MEDIA,
  SEARCH_MORE_NASA_MEDIA,
  FETCH_MEDIA_ITEM_COLLECTION
} from 'constants/actionTypes'

export const searchNasaMedia = (params) => (dispatch) => {
  dispatch({
    type: SEARCH_NASA_MEDIA.PENDING,
    payload: {params}
  })
  return axios({
    method: 'get',
    url: `${SEARCH_API_URL}/search`,
    params: {
      ...params,
      year_start: '1920',
      year_end: '2018'
    }
  })
    .then((res) => {
      dispatch({
        type: SEARCH_NASA_MEDIA.SUCCESS,
        payload: {
          ...convertMedia(res.data),
          params: {...params, page: 1}
        }
      })
    })
}

export const searchMoreNasaMedia = (params) => (dispatch) => {
  dispatch({
    type: SEARCH_MORE_NASA_MEDIA.PENDING,
    payload: {params}
  })
  return axios({
    method: 'get',
    url: `${SEARCH_API_URL}/search`,
    params: {
      ...params,
      year_start: '1920',
      year_end: '2018'
    }
  })
    .then((res) => {
      dispatch({
        type: SEARCH_MORE_NASA_MEDIA.SUCCESS,
        payload: {...convertMedia(res.data), params: params}
      })
    })
}

export const fetchMediaItemCollection = (index, mediaType, collectionUrl) => (dispatch) => {
  dispatch({
    type: FETCH_MEDIA_ITEM_COLLECTION.PENDING,
    payload: {index, collectionUrl}
  })
  return axios({
    method: 'get',
    url: collectionUrl
  })
    .then((res) => dispatch({
      type: FETCH_MEDIA_ITEM_COLLECTION.SUCCESS,
      payload: {
        thumbUrl: mediaType === 'audio' ? AUDIO_THUMB_URL_DEFAULT : getThumbUrl(res.data),
        mediaUrl: getMediaUrl(res.data)
      },
      meta: {index: index}
    }))
}
