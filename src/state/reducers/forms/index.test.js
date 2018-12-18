import forms, {form} from './'
import {
  VALIDATE_FORM,
  CLEAR_FORM,
  VALIDATE_FIELD,
  FORM_SUBMIT
} from 'constants/actionTypes'

describe('forms', () => {
  it('has initial state', () => {
    expect(forms(undefined, {})).toMatchSnapshot()
  })

  it('responds to VALIDATE_FORM', () => {
    expect(forms(undefined, {
      type: VALIDATE_FORM,
      payload: {
        form: 'testForm',
        errors: {testField: 'is required'}
      }
    })).toMatchSnapshot()
  })

  it('responds to VALIDATE_FIELDS', () => {
    expect(forms(undefined, {
      type: VALIDATE_FIELD,
      payload: {
        form: 'testForm',
        name: 'testField',
        error: 'is required'
      }
    })).toMatchSnapshot()
  })

  it('clears errors on VALIDATE_FIELD', () => {
    const state = forms(undefined, {
      type: VALIDATE_FIELD,
      payload: {
        form: 'testForm',
        name: 'testField',
        error: 'is required'
      }
    })
    expect(forms(state, {
      type: VALIDATE_FIELD,
      payload: {
        form: 'testForm',
        name: 'testField',
        error: false
      }
    })).toMatchSnapshot()
  })

  it('deletes the form on CLEAR_FORM', () => {
    const state = {
      testForm: {
        values: {},
        errors: {}
      }
    }
    expect(forms(state, {
      type: CLEAR_FORM,
      payload: {
        form: 'testForm'
      }
    })).toMatchSnapshot()
  })
})

describe('form', () => {
  it('has initial state', () => {
    expect(form(undefined, {})).toMatchSnapshot()
  })
})
