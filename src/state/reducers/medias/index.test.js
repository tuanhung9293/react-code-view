import medias from './'
import {
  SEARCH_NASA_MEDIA,
  SEARCH_MORE_NASA_MEDIA,
  FETCH_MEDIA_ITEM_COLLECTION
} from 'constants/actionTypes'

describe('medias reducer', () => {
  it('sets initial state', () => {
    expect(medias(undefined, {})).toMatchSnapshot()
  })

  it('SEARCH_NASA_MEDIA.PENDING', () => {
    expect(medias(undefined, {type: SEARCH_NASA_MEDIA.PENDING})).toMatchSnapshot()
  })

  it('SEARCH_MORE_NASA_MEDIA.PENDING', () => {
    expect(medias(undefined, {type: SEARCH_MORE_NASA_MEDIA.PENDING})).toMatchSnapshot()
  })

  it('SEARCH_NASA_MEDIA.SUCCESS', () => {
    expect(medias(undefined, {
      type: SEARCH_NASA_MEDIA.SUCCESS,
      payload: {
        data: [1, 2, 3, 4],
        totalHits: 1234,
        params: {page: 1, q: 'payload'}
      }
    })).toMatchSnapshot()
  })

  it('SEARCH_MORE_NASA_MEDIA.SUCCESS', () => {
    expect(medias({
      data: [66, 55, 35],
      totalHits: 1234,
      params: {page: 1, q: 'payload'},
      loading: true
    }, {
      type: SEARCH_MORE_NASA_MEDIA.SUCCESS,
      payload: {
        data: [1, 2, 3, 4],
        totalHits: 1234,
        params: {page: 1, q: 'payload'}
      }
    })).toMatchSnapshot()
  })

  it('FETCH_MEDIA_ITEM_COLLECTION.SUCCESS', () => {
    expect(medias({
      data: [{}, {}, {}],
      totalHits: 1234,
      params: {page: 1, q: 'payload'},
      loading: true
    }, {
      type: FETCH_MEDIA_ITEM_COLLECTION.SUCCESS,
      payload: {
        thumbUrl: 'thumbUrl-ss',
        mediaUrl: 'mediaUrl-ss'
      },
      meta: {index: 1}
    })).toMatchSnapshot()
  })
})