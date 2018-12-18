
import {convertMedia, getThumbUrl, getMediaUrl} from './medias'

describe('convertMedia', () => {
  const rawMediasResponse = {
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
        }
      ],
      metadata: {total_hits: 445}
    }
  }

  const convertedMedia = {
    data: [{
        href: "https://images-assets.nasa.gov/image/KSC-20171002-PH_LCH01_0056/collection.json",
        dateCreated: "2017-10-02T00:00:00Z",
        description: "The Materials International Space Station Experiment-Flight ",
        mediaType: "image",
        nasaId: "KSC-20171002-PH_LCH01_0056",
        photographer: "NASA/Leif Heimbold",
        title: "Materials International Space Station Experiment (MISSE) Arrival"
      }, {
        href: "https://images-assets.nasa.gov/audio/Ep68_ NASA in Hollywood/collection.json",
        dateCreated: "2018-10-26T00:00:00Z",
        description: "Gary Jordan (Host): Houston, we have a podcast.  W",
        mediaType: "audio",
        nasaId: "Ep68_ NASA in Hollywood",
        title: "HWHAP Ep68 NASA in Hollywood"
    }],
    totalHits: 445
  }

  it('returns converted media data', () => {
    expect(JSON.stringify(convertMedia(rawMediasResponse))).toEqual(JSON.stringify(convertedMedia))
  })
})

describe('getThumbUrl', () => {
  const sourceThumbUrl1 = [
    "60th_SEAL_BLACK_72DPI~orig.png",
    "60th_SEAL_BLACK_72DPI~small_thumb_.jpg",
    "60th_SEAL_BLACK_72DPI~small.jpg",
    "60th_SEAL_BLACK_72DPI~thumb.jpg",
    "60th_SEAL_BLACK_72DPI/metadata.json",
  ]

  it('returns new thumb url with includes /~small_thumb_/', () => {
    expect(getThumbUrl(sourceThumbUrl1)).toEqual("60th_SEAL_BLACK_72DPI~small_thumb_.jpg")
  })

  const sourceThumbUrl2 = [
    "60th_SEAL_BLACK_72DPI~orig.png",
    "60th_SEAL_BLACK_72DPI~small.jpg",
    "60th_SEAL_BLACK_72DPI~thumb.jpg",
    "60th_SEAL_BLACK_72DPI/metadata.json",
  ]

  it('returns new thumb url with includes /~thumb./', () => {
    expect(getThumbUrl(sourceThumbUrl2)).toEqual("60th_SEAL_BLACK_72DPI~thumb.jpg")
  })
})

describe('getMediaUrl', () => {
  const sourceMediaUrl1 = [
    "60th_SEAL_BLACK_72DPI~orig.png",
    "60th_SEAL_BLACK_72DPI~medium.jpg",
    "60th_SEAL_BLACK_72DPI~thumb.jpg",
    "60th_SEAL_BLACK_72DPI/metadata.json",
  ]

  it('returns new media url with includes /~orig./', () => {
    expect(getMediaUrl(sourceMediaUrl1)).toEqual("60th_SEAL_BLACK_72DPI~orig.png")
  })

  const sourceMediaUrl2 = [
    "60th_SEAL_BLACK_72DPI~medium.jpg",
    "60th_SEAL_BLACK_72DPI~small.jpg",
    "60th_SEAL_BLACK_72DPI~thumb.jpg",
    "60th_SEAL_BLACK_72DPI/metadata.json",
  ]

  it('returns new media url with includes /~small./', () => {
    expect(getMediaUrl(sourceMediaUrl2)).toEqual("60th_SEAL_BLACK_72DPI~small.jpg")
  })
})