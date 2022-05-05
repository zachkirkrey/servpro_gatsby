import React, { useState } from 'react'
import tw from 'twin.macro'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Button from '@atoms/Button'

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name is too Short!')
    .max(50, 'First name is Long!')
    .required('First name is required.'),
  lastName: Yup.string()
    .min(2, 'Last name is too Short!')
    .max(50, 'Last name is too Long!')
    .required('Last name is required.'),
  businessName: Yup.string().required('Business name is required.'),
  numberOfLocations: Yup.string().required('Number of Locations is required.'),
  zipCode: Yup.string().required('Zip Code is required.'),
  emailAddress: Yup.string()
    .email('Invalid email')
    .required('Email address is required.'),
  phoneNumber: Yup.string().required('Phone number is required.')
})

const CovidCleaningForm = ({ submitButton, successMessage }) => {
  const [visibleSuccessMessage, setVisibleSuccessMessage] = useState(false)
  const [requestFormSubmit, setRequestFormSubmit] = useState(false)

  const handleFormSubmit = async data => {
    try {
      setRequestFormSubmit(true)
      await axios.post('/api/forms/form-FnolForm', { data })
      setVisibleSuccessMessage(true)
      setRequestFormSubmit(false)
    } catch (err) {
      setRequestFormSubmit(false)
    }
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        businessName: '',
        numberOfLocations: '',
        zipCode: '',
        emailAddress: '',
        phoneNumber: ''
      }}
      validationSchema={FormSchema}
      onSubmit={handleFormSubmit}>
      <FormWrap>
        <FormGroupWrapper>
          <FormGroup>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <FormInput
              id="firstName"
              name="firstName"
              placeholder="* First name"
            />
            <FormInputError
              name="firstName"
              component="div"
              className="field-error"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <FormInput
              id="lastName"
              name="lastName"
              placeholder="* Last name"
            />
            <FormInputError
              name="lastName"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="businessName">Business Name</FormLabel>
            <FormInput
              id="businessName"
              name="businessName"
              placeholder="* Business Name"
            />
            <FormInputError
              name="businessName"
              component="div"
              className="field-error"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="numberOfLocations">
              Number of Locations
            </FormLabel>
            <FormInput
              id="numberOfLocations"
              name="numberOfLocations"
              placeholder="* Number of Locations"
            />
            <FormInputError
              name="numberOfLocations"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
            <FormInput id="zipCode" name="zipCode" placeholder="* Zip Code" />
            <FormInputError
              name="zipCode"
              component="div"
              className="field-error"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="emailAddress">Email</FormLabel>
            <FormInput
              id="emailAddress"
              name="emailAddress"
              placeholder="* Email Address"
              type="email"
            />
            <FormInputError
              name="emailAddress"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="phoneNumber">Phone</FormLabel>
            <FormInput
              id="phoneNumber"
              name="phoneNumber"
              placeholder="* Phone Number"
            />
            <FormInputError
              name="phoneNumber"
              component="div"
              className="field-error"
            />
          </FormGroup>
        </FormGroupWrapper>
        <div tw="mt-4 md:(mt-0) w-full">
          {visibleSuccessMessage && (
            <SuccessMessage>{successMessage || ''}</SuccessMessage>
          )}
          <Button
            css={tw`w-44 outline-none`}
            type="submit"
            disabled={requestFormSubmit}>
            {submitButton || 'Submit'}
          </Button>
        </div>
      </FormWrap>
    </Formik>
  )
}

const FormWrap = tw(Form)``
const FormGroupWrapper = tw.div`md:(grid grid-flow-row grid-cols-2 auto-rows-auto gap-5 w-3/5) mb-8`
const FormGroup = tw.div`w-full mb-3 md:(mb-0)`
const FormLabel = tw.label`block font-semibold text-warmGray-700 py-2 px-0`
const FormInput = tw(Field)`block rounded-md bg-warmGray-200 p-3 w-full`
const FormInputError = tw(ErrorMessage)`text-red-400 text-sm`
const SuccessMessage = tw.div`text-green-500 text-base mb-3`

export default CovidCleaningForm
