import React from 'react'
import {shallow} from 'enzyme'
import AddCollectionButton from './'

const itemData = {
  nasaId: 'nasaId'
}

describe('renders', () => {
  it('renders AddCollectionButton', () => {
    expect(shallow(
      <AddCollectionButton itemData={itemData} />
    )).toMatchSnapshot()
  })
})

