import React from 'react'
import tw, { css } from 'twin.macro'
import { Field, Form, Formik } from 'formik'
import { useForm } from '@formspree/react'

import Button from '@atoms/Button'
import Container from '../Container'
import {
  CANADA_PROVINCES,
  US_STATES
} from '../../../constants/franchise-ownership-form-constants'
import * as Yup from 'yup'
import { defaultInputStyles } from '../../../constants/styles'
import { FormInputError } from '../FormInputError'
import { FORMSPREE_TOKEN_OWNERSHIP_FORM } from '../../../constants/constants'
import formatPhoneLink from '@utils/format-phone-link'

const REGIONS = ['United States', 'Canada']

const HOW_DID_HEAR_OPTIONS = [
  'Radio',
  'TV',
  'Online Advertising',
  'Social Media'
]

const inputClassNames = css([defaultInputStyles])

const FormSchema = Yup.object().shape({
  region: Yup.string().oneOf(REGIONS).required('Region is required.'),
  state: Yup.string().oneOf([...CANADA_PROVINCES, ...US_STATES]),
  firstName: Yup.string()
    .min(2, 'First name is too Short!')
    .max(50, 'First name is Long!')
    .required('First name is required.'),
  lastName: Yup.string()
    .min(2, 'Last name is too Short!')
    .max(50, 'Last name is too Long!')
    .required('Last name is required.'),
  city: Yup.string().required('City is required.'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email address is required.'),
  phoneNumber: Yup.string().required('Phone number is required.'),
  howDidHear: Yup.string().required('Please select an answer')
})

const initialValues = {
  region: '',
  state: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  city: '',
  howDidHear: ''
}

// eslint-disable-next-line no-unused-vars
function Select({ field, form, ...rest }) {
  return <select css={[inputClassNames]} {...field} {...rest} />
}

// eslint-disable-next-line no-unused-vars
function InputText({ field, form, ...rest }) {
  return (
    <div>
      <input css={[inputClassNames]} type="text" {...field} {...rest} />
    </div>
  )
}

function FormGroup({ children }) {
  return <div tw="space-y-3">{children}</div>
}

function FranchiseOwnershipForm({ submitButton, handleFormSubmitSuccess }) {
  const [state, handleSubmit] = useForm(FORMSPREE_TOKEN_OWNERSHIP_FORM)

  React.useEffect(() => {
    if (state.succeeded) {
      handleFormSubmitSuccess?.(true)
    }
  }, [state.succeeded])

  function handleFormSubmit(data) {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormSchema}
      onSubmit={handleFormSubmit}>
      {formikState => {
        const { values } = formikState
        const isUsRegionSelected = values.region === REGIONS[0]

        const stateLabel = isUsRegionSelected ? 'State' : 'Province'

        return (
          <div tw="mt-5">
            <Container>
              <Form
                css={[
                  state.succeeded && tw`pointer-events-none`,
                  tw`lg:w-3/5`
                ]}>
                <div>
                  <FormLabel htmlFor="phoneNumber">Region</FormLabel>
                  <Field
                    component={Select}
                    name="region"
                    css={[tw`pl-3 pr-6 mb-4`, inputClassNames]}>
                    <option value="">Choose your region</option>
                    {REGIONS.map(option => {
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                    })}
                  </Field>
                  {values.region && (
                    <div tw="space-y-3">
                      <FormGroup>
                        <FormLabel htmlFor="state">{stateLabel}</FormLabel>
                        <Field
                          component={Select}
                          css={[inputClassNames]}
                          name="state">
                          <option value="">{stateLabel} of interest</option>
                          {(isUsRegionSelected
                            ? US_STATES
                            : CANADA_PROVINCES
                          ).map(option => {
                            return (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            )
                          })}
                        </Field>
                        <FormInputError name="state" />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <Field
                          component={InputText}
                          placeholder="* First Name"
                          name="firstName"
                        />
                        <FormInputError name="firstName" />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <Field
                          component={InputText}
                          placeholder="* Last Name"
                          name="lastName"
                        />
                        <FormInputError name="lastName" />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="phoneNumber">
                          Phone Number
                        </FormLabel>
                        <Field
                          component={InputText}
                          placeholder="* Phone Number"
                          name="phoneNumber"
                        />
                        <FormInputError name="phoneNumber" />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Field
                          component={InputText}
                          placeholder="* Email"
                          name="email"
                        />
                        <FormInputError name="email" />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="city">City</FormLabel>
                        <Field
                          component={InputText}
                          placeholder="* City"
                          name="city"
                        />
                        <FormInputError name="city" />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="howDidHear">
                          How did you hear about us?
                        </FormLabel>
                        <Field
                          component={Select}
                          css={[inputClassNames]}
                          name="howDidHear">
                          <option value="">* Select an option</option>
                          {HOW_DID_HEAR_OPTIONS.map(option => {
                            return (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            )
                          })}
                        </Field>
                        <FormInputError name="howDidHear" />
                      </FormGroup>
                    </div>
                  )}
                  <Button
                    type="submit"
                    css={[
                      tw`mt-10`,
                      state.succeeded && tw`pointer-events-none`
                    ]}
                    disabled={state.submitting || state.succeeded}>
                    {state.submitting ? 'Submitting' : submitButton || 'Submit'}
                  </Button>
                </div>
                {state.succeeded && (
                  <p tw="text-green-600 mt-3 text-lg font-semibold">
                    Thank you! We will contact you soon.
                  </p>
                )}
              </Form>
            </Container>
          </div>
        )
      }}
    </Formik>
  )
}

const FormLabel = tw('label')`block font-semibold mb-2 px-0`

export default FranchiseOwnershipForm
