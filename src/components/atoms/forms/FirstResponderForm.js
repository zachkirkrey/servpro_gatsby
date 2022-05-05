import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import Button from '@atoms/Button'
import { useForm } from '@formspree/react'
import PhoneNumberInput from '@atoms/PhoneNumberInput'
import LoadingSpinner from '@atoms/loading/LoadingSpinner'
import formatPhoneLink from '@utils/format-phone-link'
import { defaultInputStyles } from '../../../constants/styles'
import { FormInputError } from '../FormInputError'
import { FORMSPREE_TOKEN } from '../../../constants/constants'
import { FormGroupWrapper } from '../FormGroupWrapper'
import { FormLabel } from '../FormLabel'

const FormSchema = Yup.object().shape({
  yourFirstName: Yup.string()
    .min(2, 'First name is too Short!')
    .max(50, 'First name is too Long!')
    .required('First name is required.'),
  yourLastName: Yup.string()
    .min(2, 'Last name is too Short!')
    .max(50, 'Last name is too Long!')
    .required('Last name is required.'),
  yourEmailAddress: Yup.string()
    .email('Invalid email')
    .required('Email address is required'),
  yourPhoneNumber: Yup.string().required('Phone number is required.'),
  firstResponderFirstName: Yup.string()
    .min(2, 'First name is too Short!')
    .max(50, 'First name is too Long!')
    .required('First name is required.'),
  firstResponderLastName: Yup.string()
    .min(2, 'Last name is too Short!')
    .max(50, 'Last name is too Long!')
    .required('Last name is required.'),
  firstResponderEmailAddress: Yup.string()
    .email('Invalid email')
    .required('Email address is required'),
  firstResponderPhoneNumber: Yup.string().required('Phone number is required.')
})

const FormView = ({ submitButton, handleFormSubmitSuccess }) => {
  const [state, handleSubmit] = useForm(FORMSPREE_TOKEN)
  const [requestFormSubmit, setRequestFormSubmit] = useState(false)

  const handleFormSubmit = data => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      formData.append(
        key,
        ['yourPhoneNumber', 'firstResponderPhoneNumber'].indexOf(key) >= 0
          ? formatPhoneLink(data[key])
          : data[key]
      )
    })
    handleSubmit(formData)
  }

  useEffect(() => {
    if (state.succeeded) {
      setRequestFormSubmit(false)
      handleFormSubmitSuccess(true)
    } else if (state.submitting) {
      setRequestFormSubmit(true)
    } else if (state.errors) {
      console.error('Errors =====', state.errors)
    }
  }, [state])

  return (
    <Formik
      initialValues={{
        yourFirstName: '',
        yourLastName: '',
        yourEmailAddress: '',
        yourPhoneNumber: '',
        firstResponderFirstName: '',
        firstResponderLastName: '',
        firstResponderEmailAddress: '',
        firstResponderPhoneNumber: '',
        firstResponderPhoto: ''
      }}
      validationSchema={FormSchema}
      onSubmit={handleFormSubmit}>
      <FormWrap>
        <h4 tw="font-semibold text-xl mb-3">Your Contact Information</h4>
        <FormGroupWrapper>
          <FormGroup>
            <FormLabel htmlFor="yourFirstName">First Name</FormLabel>
            <FormInput
              id="yourFirstName"
              name="yourFirstName"
              placeholder="* First name"
            />
            <FormInputError
              name="yourFirstName"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="yourLastName">Last Name</FormLabel>
            <FormInput
              id="yourLastName"
              name="yourLastName"
              placeholder="* Last name"
            />
            <FormInputError
              name="yourLastName"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="yourEmailAddress">Email</FormLabel>
            <FormInput
              id="yourEmailAddress"
              name="yourEmailAddress"
              placeholder="* Email Address"
              type="email"
            />
            <FormInputError
              name="yourEmailAddress"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="yourPhoneNumber">Phone</FormLabel>
            <FormInput
              id="yourPhoneNumber"
              name="yourPhoneNumber"
              placeholder="* Phone Number"
              component={PhoneNumberInput}
            />
            <FormInputError
              name="yourPhoneNumber"
              component="div"
              className="field-error"
            />
          </FormGroup>
        </FormGroupWrapper>

        <h4 tw="font-semibold text-xl mb-3">
          First Responder Contact Information
        </h4>
        <FormGroupWrapper>
          <FormGroup>
            <FormLabel htmlFor="firstResponderFirstName">First Name</FormLabel>
            <FormInput
              id="firstResponderFirstName"
              name="firstResponderFirstName"
              placeholder="* First name"
            />
            <FormInputError
              name="firstResponderFirstName"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="firstResponderLastName">Last Name</FormLabel>
            <FormInput
              id="firstResponderLastName"
              name="firstResponderLastName"
              placeholder="* Last name"
            />
            <FormInputError
              name="firstResponderLastName"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="firstResponderEmailAddress">Email</FormLabel>
            <FormInput
              id="firstResponderEmailAddress"
              name="firstResponderEmailAddress"
              placeholder="* Email Address"
              type="email"
            />
            <FormInputError
              name="firstResponderEmailAddress"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="firstResponderPhoneNumber">Phone</FormLabel>
            <FormInput
              id="firstResponderPhoneNumber"
              name="firstResponderPhoneNumber"
              placeholder="* Phone Number"
              component={PhoneNumberInput}
            />
            <FormInputError
              name="firstResponderPhoneNumber"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="firstResponderPhoto">Service Photo</FormLabel>
            <FormInput
              id="firstResponderPhoto"
              name="firstResponderPhoto"
              placeholder="Upload a photo"
              render={({ form }) => (
                <input
                  type="file"
                  onChange={event => {
                    form.setFieldValue(
                      'firstResponderPhoto',
                      event.currentTarget.files[0]
                    )
                  }}
                />
              )}
            />
          </FormGroup>
        </FormGroupWrapper>

        <div tw="mt-4 md:(mt-0) w-full">
          <Button
            css={tw`w-44 outline-none`}
            type="submit"
            disabled={requestFormSubmit}
            loading={requestFormSubmit}
            loadingIcon={<LoadingSpinner />}
            loadingText="Submitting...">
            {submitButton || 'Submit'}
          </Button>
        </div>
      </FormWrap>
    </Formik>
  )
}

const SuccessView = ({ successMessage }) => {
  return (
    <SuccessMessage
      css={RichTextEditorStyles}
      dangerouslySetInnerHTML={{ __html: successMessage || '' }}
    />
  )
}

const FirstResponderForm = ({ submitButton, successMessage }) => {
  const [visibleSuccessMessage, setVisibleSuccessMessage] = useState(false)
  return visibleSuccessMessage ? (
    <SuccessView successMessage={successMessage} />
  ) : (
    <FormView
      submitButton={submitButton}
      handleFormSubmitSuccess={e => setVisibleSuccessMessage(e)}
    />
  )
}

const FormWrap = tw(Form)``
const FormGroup = tw.div`w-full mb-3 md:(mb-0)`
const FormInput = styled(Field)`
  ${defaultInputStyles};
`
const SuccessMessage = tw.div`mb-3`

export default FirstResponderForm
