import React from 'react'
import PropTypes from 'prop-types'
import createRouterContext from 'react-router-test-context'
import {shallow, mount} from 'enzyme'
import MediaThumb from './'

const itemData = {
  mediaType: 'image',
  nasaId: 'nasaId',
  thumbUrl: 'thumbUrl',
  href: 'href-mock-1'
}

it('render MediaThumb', () => {
  expect(shallow(
    <MediaThumb
      itemData={itemData} source="medias"
      onFetchCollectionUrl={jest.fn(() => {})}/>
  )).toMatchSnapshot()
})

it('onFetchCollectionUrl on componentDidMount', () => {
  const context = createRouterContext()
  const childContextTypes = {
    router: PropTypes.object
  }
  
  const wrapper = mount(
    <MediaThumb
      itemData={itemData}
      source="medias"
      onFetchCollectionUrl={jest.fn(() => {})} />,
      {context, childContextTypes}
  )

  expect(wrapper.props().onFetchCollectionUrl).toBeCalled()
})

it('onFetchCollectionUrl on componentDidUpdate if change props itemData.href', () => {
  const context = createRouterContext()
  const childContextTypes = {
    router: PropTypes.object
  }
  
  const wrapper = mount(
    <MediaThumb
      itemData={itemData}
      source="medias"
      onFetchCollectionUrl={jest.fn(() => {})} />,
      {context, childContextTypes}
  )

  wrapper.setProps({itemData: {
    mediaType: 'image',
    nasaId: 'nasaId',
    thumbUrl: 'thumbUrl',
    href: 'href-mock-2'
  }})

  expect(wrapper.props().onFetchCollectionUrl).toBeCalled()
})
