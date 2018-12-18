import React from 'react'
import {MemoryRouter} from 'react-router'
import {shallow, mount} from 'enzyme'
import ScrollToTop from './'

it('render ScrollToTop with a children', () => {
  expect(shallow(
    <ScrollToTop>I like Children</ScrollToTop>
  )).toMatchSnapshot()
})

it('onFetchCollectionUrl on componentDidUpdate if change props location.pathname', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/collection']}>
      <ScrollToTop>
          I like Children
      </ScrollToTop>
    </MemoryRouter>
  )
  
  wrapper.setProps({location: {
    pathname: 'pathname 2'
  }})

  expect(window.scrollTo).toBeDefined()
})
