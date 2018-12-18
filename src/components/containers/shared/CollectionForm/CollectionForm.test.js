import React from 'react'
import {shallow} from 'enzyme'
import withForm from 'components/hoc/withForm'
import configureStore from 'redux-mock-store'
const mockStore = configureStore()

import {Form} from './'
import CollectionForm from './'

const initialValues = {
  title: "title",
  description: "description"
}
const name = "addMedia"
const submitAction = () => {}
const redirectAction = () => {}

let store
beforeEach(() => {
  store = mockStore({
    forms: {
      addMedia: {
        values: {
          title: "title",
          description: "description"
        },
        validationErrors: {}
      }
    }
  })
  store.dispatch = () => {}
})

describe('renders', () => {
  it('renders CollectionForm', () => {
    expect(shallow(
      <CollectionForm
        create
        name={name}
        initialValues={initialValues}
        submitAction={submitAction}
        redirectAction={redirectAction}
      />
    )).toMatchSnapshot()
  })
  
  it('renders Form', () => {
    expect(shallow(<Form />)).toMatchSnapshot()
  })

  it('renders Form with withForm', () => {
    const FormMockComponent = withForm(name, initialValues, submitAction, redirectAction)(Form)
    const enhancedComponent = shallow(<FormMockComponent store={store} />).dive()
    expect(enhancedComponent).toMatchSnapshot()
  })
})

