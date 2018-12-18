import {createBaseStore} from 'state/store'
import {
  searchNasaMedia,
  searchMoreNasaMedia,
  fetchMediaItemCollection
} from './mediaAction'
import {mockFetch} from '__mocks__/fetch'

const successfulMediasResponse = {
  collection: {
    href: "https://images-api.nasa.gov/search?q=miss&media_type=image,video,audio&year_start=1920&year_end=2018",
    items: [
      {
        data: [{
          date_created: "2017-10-02T00:00:00Z",
          description: "The Materials International Space Station Experiment-Flight ",
          media_type: "image",
          nasa_id: "KSC-20171002-PH_LCH01_0056",
          photographer: "NASA/Leif Heimbold",
          title: "Materials International Space Station Experiment (MISSE) Arrival"
        }],
        href: "https://images-assets.nasa.gov/image/KSC-20171002-PH_LCH01_0056/collection.json"
      },
      {
        data: [{
          date_created: "2018-10-26T00:00:00Z",
          description: "Gary Jordan (Host): Houston, we have a podcast.  W",
          media_type: "audio",
          nasa_id: "Ep68_ NASA in Hollywood",
          title: "HWHAP Ep68 NASA in Hollywood"
        }],
        href: "https://images-assets.nasa.gov/audio/Ep68_ NASA in Hollywood/collection.json"
      },
      {
        data: [{
          date_created: "2017-05-22T00:00:00Z",
          description: "On May 23, to rollout the Fiscal Year 2018 Budget proposal.",
          media_type: "video",
          nasa_id: "NHQ_2017_0523_FY18 State Of NASA Budget",
          title: "FY18 State Of NASA Budget"
        }],
        href: "https://images-assets.nasa.gov/video/NHQ_2017_0523_FY18 State Of NASA Budget/collection.json"
      }
    ],
    metadata: {total_hits: 445}
  }
}

const initialMedias = {
  medias:
    {
      data: [{
        date_created: "2017-10-02T00:00:00Z",
        description: "The Materials International Space Station Experiment-Flight ",
        media_type: "image",
        nasa_id: "KSC-20171002-PH_LCH01_0056",
        photographer: "NASA/Leif Heimbold",
        title: "Materials International Space Station Experiment (MISSE) Arrival",
        href: "https://images-assets.nasa.gov/image/KSC-20171002-PH_LCH01_0056/collection.json"
      }]
    }
}

const successfulCollectionResponse = [
  "http://images-assets.nasa.gov/image/NASA 60th_SEAL_BLACK_72DPI/NASA 60th_SEAL_BLACK_72DPI~orig.png",
  "http://images-assets.nasa.gov/image/NASA 60th_SEAL_BLACK_72DPI/NASA 60th_SEAL_BLACK_72DPI~medium.jpg",
  "http://images-assets.nasa.gov/image/NASA 60th_SEAL_BLACK_72DPI/NASA 60th_SEAL_BLACK_72DPI~small.jpg",
  "http://images-assets.nasa.gov/image/NASA 60th_SEAL_BLACK_72DPI/NASA 60th_SEAL_BLACK_72DPI~thumb.jpg",
  "http://images-assets.nasa.gov/image/NASA 60th_SEAL_BLACK_72DPI/metadata.json",
]

const initialState = {
  data: [],
  totalHits: 0,
  params: {},
  loading: false,
  loadingMore: false
}

describe('integration', () => {
  it ('searchNasaMedia', () => {
    const store = createBaseStore()
    mockFetch(200, JSON.stringify(successfulMediasResponse))
    
    expect(store.getState().medias.data).toEqual(initialState.data)
    expect(store.getState().medias.totalHits).toEqual(initialState.totalHits)
    expect(store.getState().medias.params).toEqual(initialState.params)
    expect(store.getState().medias.loading).toEqual(initialState.loading)
    expect(store.getState().medias.loadingMore).toEqual(initialState.loadingMore)
    store.dispatch(searchNasaMedia({q: 'nasa', type: 'image,audio,video'}))
    .then(() => {
      expect(store.getState().medias.data).toEqual([
        successfulMediasResponse.collection.items[0].data,
        successfulMediasResponse.collection.items[1].data,
        successfulMediasResponse.collection.items[2].data,
      ])
      expect(store.getState().medias.totalHits).toEqual(445)
      expect(store.getState().medias.params).toEqual({q: 'nasa', type: 'image,audio,video', page: 1})
      expect(store.getState().medias.loading).toEqual(false)
      expect(store.getState().medias.loadingMore).toEqual(false)
    })
  })
  
  it ('searchMoreNasaMedia', () => {
    const store = createBaseStore(initialMedias)
    mockFetch(200, JSON.stringify(successfulMediasResponse))

    store.dispatch(searchMoreNasaMedia({q: 'nasa', type: 'image,audio,video', page: 2}))
    .then(() => {
      expect(store.getState().medias.data).toEqual([
        initialMedias.medias.data,
        successfulMediasResponse.collection.items[0].data,
        successfulMediasResponse.collection.items[1].data,
        successfulMediasResponse.collection.items[2].data,
      ])
      expect(store.getState().medias.params).toEqual({q: 'nasa', type: 'image,audio,video', page: 1})
    })
  })

  it ('searchNasaMedia', () => {
    const store = createBaseStore(initialMedias)
    mockFetch(200, JSON.stringify(successfulCollectionResponse))

    store.dispatch(fetchMediaItemCollection(0, 'image', 'collectionUrl'))
    .then(() => {
      expect(store.getState().medias.data[0]).toEqual({
        ...initialMedias.medias.data[0], thumbUrl: 'thumbUrl', mediaUrl: 'mediaUrl'
      })
      expect(store.getState().medias.data[0].thumbUrl).toEqual('thumbUrl')
      expect(store.getState().medias.data[0].mediaUrl).toEqual('mediaUrl')
    })
  })
})

