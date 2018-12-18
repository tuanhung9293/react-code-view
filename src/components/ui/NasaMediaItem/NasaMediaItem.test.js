import React from 'react'
import {shallow} from 'enzyme'
import NasaMediaItem from './'

function createMockComponent() {
  return jest.fn().mockImplementation(props => null)
}
const itemData = {
  mediaType: 'image',
  nasaId: 'nasaId',
  thumbUrl: 'thumbUrl',
  href: 'href-mock-1'
}

it('renders NasaMediaItem', () => {
  expect(shallow(
    <NasaMediaItem 
    itemData={itemData}
    source="medias"
    onFetchCollectionUrl={() => {}}
    actionComponent={createMockComponent()}/>
  )).toMatchSnapshot()
})
