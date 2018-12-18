import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import withForm from 'components/hoc/withForm'
import Input from 'components/ui/forms/Input'
import Textarea from 'components/ui/forms/Textarea'
import PrimaryButton from 'components/ui/buttons/PrimaryButton'
import FormField from 'components/ui/forms/FormField'
import {Columns, Column} from 'components/ui/grid'
import ModalFooter from 'components/ui/modals/ModalFooter'
import {required} from 'services/validators'
import TypeSelector from 'components/ui/forms/TypeSelector'

export function Form({dirty, valid, handleSubmit, create}) {
  const isRequired = required()

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}>
      <Columns>
        <Column>
          <FormField label="Title" name="title" component={Input} />
          <FormField label="Description" name="description" component={Textarea} />
          <FormField label="Type" name="mediaType" component={TypeSelector} />
          <FormField label="Link thumbnail *" name="thumbUrl" validate={isRequired} />
          <FormField label="Link media source *" name="mediaUrl" validate={isRequired} />
        </Column>
      </Columns>
      <ModalFooter>
        <PrimaryButton outlined danger to={`${create ? '/nasa-search' : '/collection'}`}>
          Cancel
        </PrimaryButton>
        <PrimaryButton outlined type="submit" disabled={!valid || (!create && !dirty)}>
          Save
        </PrimaryButton>
      </ModalFooter>
    </form>
  )
}

function CollectionForm({name, initialValues = {}, submitAction, redirectAction, ...rest}) {
  const ConnectedForm = withForm(name, initialValues, submitAction, redirectAction)(Form)
  return <ConnectedForm {...rest} />
}

CollectionForm.propTypes = {
  name: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  submitAction: PropTypes.func.isRequired
}

export default withRouter(CollectionForm)