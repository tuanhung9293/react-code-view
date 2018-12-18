import {
  addCollection,
  editCollection,
  removeCollection,
  likeCollection,
  sortNasaCollections
} from './collectionsAction'
import {createBaseStore} from 'state/store'

const dateNowStub = jest.fn(() => 1530518207007)
global.Date.now = dateNowStub

describe('collectionsAction integration test', () => {
  it('addCollection add new collection', () => {
    const store = createBaseStore({
      collections: {
        data: [{nasaId: 12, value: 'value12'}]
      }
    })

    store.dispatch(addCollection({nasaId: 13, value: 'value13'}))
    expect(store.getState().collections).toMatchSnapshot()
  })

  it('addCollection add existing collection', () => {
    const store = createBaseStore({
      collections: {
        data: [{nasaId: 12, value: 'value12'}]
      }
    })

    store.dispatch(addCollection({nasaId: 12, value: 'value13'}))
    expect(store.getState().collections).toMatchSnapshot()
  })

  
  it('editCollection', () => {
    const store = createBaseStore({
      collections: {
        data: [{nasaId: 12, value: 'value12'}]
      }
    })

    store.dispatch(editCollection({nasaId: 12, value: 'value13'}))
    expect(store.getState().collections).toMatchSnapshot()
  })

  it('removeCollection', () => {
    const store = createBaseStore({
      collections: {
        data: [{nasaId: 12, value: 'value12'}, {nasaId: 14, value: 'value14'}]
      }
    })

    store.dispatch(removeCollection(12))
    expect(store.getState().collections).toMatchSnapshot()
  })

  it('likeCollection', () => {
    const store = createBaseStore({
      collections: {
        data: [{nasaId: 12, value: 'value12', liked: false}, {nasaId: 14, value: 'value14', liked: true}]
      }
    })

    store.dispatch(likeCollection(12))
    expect(store.getState().collections).toMatchSnapshot()
  })

  it('sortNasaCollections by title decrease', () => {
    const store = createBaseStore({
      collections: {
        data: [
          {nasaId: 12, value: 'value12', title: 'a'},
          {nasaId: 14, value: 'value14', title: 'c'},
          {nasaId: 14, value: 'value14', title: 'b'}
        ]
      }
    })

    store.dispatch(sortNasaCollections('title,1'))
    expect(store.getState().collections).toMatchSnapshot()
  })
  
  it('sortNasaCollections by dateCreated increase', () => {
    const store = createBaseStore({
      collections: {
        data: [
          {nasaId: 12, value: 'value12', dateCreated: "2018-11-16T00:00:00Z"},
          {nasaId: 14, value: 'value14', dateCreated: "2018-12-16T00:00:00Z"},
          {nasaId: 14, value: 'value14', dateCreated: "2018-10-16T00:00:00Z"}
        ]
      }
    })

    store.dispatch(sortNasaCollections('dateCreated,-1'))
    expect(store.getState().collections).toMatchSnapshot()
  })
})
  