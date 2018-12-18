import {
  SET_INITIAL_FORM_VALUES,
  FORM_FIELD_BLUR,
  VALIDATE_FORM,
  VALIDATE_FIELD,
  SET_FORM_VALUE,
  CLEAR_FORM
} from 'constants/actionTypes'

const initialFormState = {
  meta: {
    submitting: false,
    submitted: false
  },
  values: {},
  initialValues: {},
  validationErrors: {},
  touched: {}
}

export function form(form = initialFormState, action) {
  switch (action.type) {
    case SET_INITIAL_FORM_VALUES:
      return {
        ...form,
        initialValues: {
          ...form.initialValues,
          ...action.payload.initialValues
        }
      }
    case FORM_FIELD_BLUR:
      return {
        ...form,
        touched: {
          ...form.touched,
          [action.payload.name]: true
        }
      }
    case VALIDATE_FORM:
      return {
        ...form,
        validationErrors: {...action.payload.errors}
      }
    case VALIDATE_FIELD:
      if (action.payload.error) {
        return {
          ...form,
          validationErrors: {
            ...form.validationErrors,
            [action.payload.name]: action.payload.error
          }
        }
      } else {
        let nextValidationErrors = {...form.validationErrors}
        delete nextValidationErrors[action.payload.name]
        return {
          ...form,
          validationErrors: nextValidationErrors
        }
      }
    case SET_FORM_VALUE:
      return {
        ...form,
        values: {
          ...form.values,
          [action.payload.name]: action.payload.value
        }
      }
    default:
      return form
  }
}

function forms(forms = {}, action) {
  switch (action.type) {
    case SET_INITIAL_FORM_VALUES:
    case SET_FORM_VALUE:
    case VALIDATE_FORM:
    case VALIDATE_FIELD:
    case FORM_FIELD_BLUR:
      return {
        ...forms,
        [action.payload.form]: form(forms[action.payload.form], action)
      }
    case CLEAR_FORM:
      let clone = {...forms}
      delete clone[action.payload.form]
      return clone
    default:
      return forms
  }
}

export default forms