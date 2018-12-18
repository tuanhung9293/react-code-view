import {
  SET_INITIAL_FORM_VALUES,
  SET_FORM_VALUE,
  FORM_FIELD_BLUR,
  VALIDATE_FORM,
  VALIDATE_FIELD,
  CLEAR_FORM
} from 'constants/actionTypes'

export function setInitialValues({form, initialValues}) {
  return {
    type: SET_INITIAL_FORM_VALUES,
    payload: {
      form,
      initialValues
    }
  }
}

export function setFormValue({form, name, value}) {
  return {
    type: SET_FORM_VALUE,
    payload: {
      form,
      name,
      value
    }
  }
}

export function formFieldBlur({form, name}) {
  return {
    type: FORM_FIELD_BLUR,
    payload: {
      form,
      name
    }
  }
}

export function validateForm({form, errors}) {
  return {
    type: VALIDATE_FORM,
    payload: {
      form,
      errors
    }
  }
}

export function validateField({form, name, error}) {
  return {
    type: VALIDATE_FIELD,
    payload: {
      form,
      name,
      error
    }
  }
}

export function clearForm({form}) {
  return {
    type: CLEAR_FORM,
    payload: {
      form
    }
  }
}