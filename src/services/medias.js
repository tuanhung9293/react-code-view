import camelize from 'camelize'

export const convertMedia = (medias) => {
  const camel = camelize(medias)
  const searchResults = camel.collection.items.map((item) => {
    return {href: item.href, ...item.data[0]}
  })
  return {
    data: searchResults,
    totalHits: camel.collection.metadata.totalHits
  }
}

export const getThumbUrl = (source) => {
  return source.find(item => item.includes('~small_thumb_') || item.includes('~thumb.'))
}

export const getMediaUrl = (source) => {
  return source.find(item => item.includes('~orig.') || item.includes('~small.'))
}