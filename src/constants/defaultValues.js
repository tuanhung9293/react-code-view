export const AUDIO_THUMB_URL_DEFAULT = 'AUDIO_THUMB_URL_DEFAULT'
export const PAGINATION_UNIT = 20

export const AVAILABLE_MEDIA_TYPES = [
  {id: 'image', value: 'image', message: 'Image'},
  {id: 'video', value: 'video', message: 'Video'},
  {id: 'audio', value: 'audio', message: 'Audio'}
]

export const AVAILABLE_SORT_TYPES = [
  {id: 'editDec', value: 'dateEdited,1', message: 'Default'},
  {id: 'titleDec', value: 'title,1', message: 'Title decrease'},
  {id: 'dateDec', value: 'dateCreated,1', message: 'Date decrease'},
  {id: 'titleInc', value: 'title,-1', message: 'Title increase'},
  {id: 'dateInc', value: 'dateCreated,-1', message: 'Date increase'}
]