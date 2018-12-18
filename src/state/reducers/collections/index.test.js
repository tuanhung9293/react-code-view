import collections from './'
import {
  ADD_COLLECTION,
  EDIT_COLLECTION,
  REMOVE_COLLECTION,
  LIKE_COLLECTION,
  SORT_COLLECTION
} from 'constants/actionTypes'

describe('collections reducer', () => {
  it('sets initial state', () => {
    expect(collections(undefined, {})).toMatchSnapshot()
  })

  it('ADD_COLLECTION add new data', () => {
    expect(collections({
      data: [{nasaId: 12, value: 'value12'}]
    }, {
      type: ADD_COLLECTION,
      payload: {itemData: {nasaId: 13, value: 'value13'}}
    })).toMatchSnapshot()
  })

  it('ADD_COLLECTION add existing data', () => {
    expect(collections({
      data: [{nasaId: 12, value: 'value12'}]
    }, {
      type: ADD_COLLECTION,
      payload: {itemData: {nasaId: 12, value: 'value13'}}
    })).toMatchSnapshot()
  })

  it('EDIT_COLLECTION', () => {
    expect(collections({
      data: [{nasaId: 12, value: 'value12'}]
    }, {
      type: EDIT_COLLECTION,
      payload: {itemData: {nasaId: 12, value: 'value13'}}
    })).toMatchSnapshot()
  })

  it('REMOVE_COLLECTION', () => {
    expect(collections({
      data: [{nasaId: 12, value: 'value12'}, {nasaId: 14, value: 'value14'}]
    }, {
      type: REMOVE_COLLECTION,
      payload: {id: 12}
    })).toMatchSnapshot()
  })

  it('LIKE_COLLECTION', () => {
    expect(collections({
      data: [{nasaId: 12, value: 'value12', liked: false}, {nasaId: 14, value: 'value14', liked: true}]
    }, {
      type: LIKE_COLLECTION,
      payload: {id: 12}
    })).toMatchSnapshot()
  })

  it('SORT_COLLECTION by title decrease', () => {
    expect(collections({
      data: [
        {nasaId: 12, value: 'value12', title: 'a'},
        {nasaId: 14, value: 'value14', title: 'c'},
        {nasaId: 14, value: 'value14', title: 'b'}
      ]
    }, {
      type: SORT_COLLECTION,
      payload: ['title', 1]
    })).toMatchSnapshot()
  })

  it('SORT_COLLECTION by dateCreated increase', () => {
    expect(collections({
      data: [
        {nasaId: 12, value: 'value12', dateCreated: "2018-11-16T00:00:00Z"},
        {nasaId: 14, value: 'value14', dateCreated: "2018-12-16T00:00:00Z"},
        {nasaId: 14, value: 'value14', dateCreated: "2018-10-16T00:00:00Z"}
      ]
    }, {
      type: SORT_COLLECTION,
      payload: ['dateCreated', -1]
    })).toMatchSnapshot()
  })
})
