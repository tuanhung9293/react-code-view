import {setInitialValues, setFormValue, formFieldBlur, clearForm, validateField} from './formsAction'
import {createBaseStore} from 'state/store'

describe('integration', () => {
  it('sets initial values', () => {
    const store = createBaseStore()
    store.dispatch(setInitialValues({
      form: 'testForm',
      initialValues: {
        one: 'two',
        three: 'four'
      }}))
    const form = store.getState().forms.testForm
    expect(form.values).toEqual({})
    expect(form.initialValues).toEqual({
      one: 'two',
      three: 'four'
    })
  })

  it('sets single form values', () => {
    const store = createBaseStore()
    store.dispatch(setFormValue({form: 'testing', name: 'testField', value: 'testValue'}))
    const form = store.getState().forms.testing
    expect(form.values).toEqual({
      testField: 'testValue'
    })
  })

  it('updates touched on field blur', () => {
    const store = createBaseStore()
    store.dispatch(formFieldBlur({form: 'testing', name: 'testInput'}))
    const form = store.getState().forms.testing
    expect(form.touched).toEqual({
      testInput: true
    })
  })

  it('clears forms', () => {
    const store = createBaseStore()
    store.dispatch(clearForm({form: 'testing'}))
    const form = store.getState().forms.testing
    expect(form).toEqual(undefined)
  })

  it('validates fields', () => {
    const store = createBaseStore()
    store.dispatch(validateField({form: 'testing', name: 'testField', error: 'test error'}))
    const form = store.getState().forms.testing
    expect(form.validationErrors.testField).toEqual('test error')
  })

  it('clears validation error on validate field', () => {
    const store = createBaseStore()
    store.dispatch(validateField({form: 'testing', name: 'testField', error: 'test error'}))
    store.dispatch(validateField({form: 'testing', name: 'testField', error: false}))
    const form = store.getState().forms.testing
    expect(form.validationErrors).toEqual({})
  })
})