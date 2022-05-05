import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useForm } from '@formspree/react'
import * as Yup from 'yup'
import Button from '@atoms/Button'
import PhoneNumberInput from '@atoms/PhoneNumberInput'
import LoadingSpinner from '@atoms/loading/LoadingSpinner'
import TriggerFormChange from './TriggerFormChange'
import { ProductServices, States } from '../../../settings/contants'
import formatPhoneLink from '@utils/format-phone-link'

const FormSchema = Yup.object().shape({
  CompanyName: Yup.string()
    .min(2, 'First name is too Short!')
    .max(50, 'First name is too Long!')
    .required('First name is required.'),
  CompanyAddress: Yup.string()
    .min(2, 'Last name is too Short!')
    .max(50, 'Last name is too Long!')
    .required('Last name is required.'),
  CompanyCity: Yup.string().required('City is required.'),
  CompanyState: Yup.string().required('State is required.'),
  CompanyZip: Yup.string().required('Zip Code is required.'),
  CompanyWebsite: Yup.string().required('Website is required.'),
  ContactName: Yup.string()
    .min(2, 'Contact name is too Short!')
    .max(50, 'Contact name is too Long!')
    .required('Contact name is required.'),
  ContactEmailAddress: Yup.string()
    .email('Invalid email')
    .required('Email address is required'),
  ContactPhoneNumber: Yup.string().required('Phone number is required.')
})

const FormView = ({ submitButton, handleFormSubmitSuccess }) => {
  const [state, handleSubmit] = useForm('xwkazpyz')
  const [visibleCityStateFields, setVisibleCityStateFields] = useState(false)
  const [requestFormSubmit, setRequestFormSubmit] = useState(false)

  const handleFormSubmit = data => {
    const payload = { ...(data || {}) }
    payload.ContactPhoneNumber = formatPhoneLink(payload.ContactPhoneNumber)
    handleSubmit(payload)
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
        CompanyName: '',
        CompanyAddress: '',
        CompanyCity: '',
        CompanyState: '',
        CompanyZip: '',
        CompanyWebsite: '',
        ContactName: '',
        ContactTitle: '',
        ContactPhoneNumber: '',
        ContactEmailAddress: '',
        HasNationwideService: '',
        HasCanadianService: '',
        HasCanadianPresence: '',
        HasReferral: '',
        IsCurrentProvider: '',
        CurrentServices: ''
      }}
      validationSchema={FormSchema}
      onSubmit={handleFormSubmit}>
      <FormWrap>
        <h4 tw="font-semibold text-xl mb-3">Contact Information</h4>
        <Grid tw="mb-3">
          <GridItem tw="col-span-6">
            <FormLabel htmlFor="CompanyName">Company Name</FormLabel>
            <FormInput
              id="CompanyName"
              name="CompanyName"
              placeholder="* Company name"
            />
            <FormInputError
              name="CompanyName"
              component="div"
              className="field-error"
            />
          </GridItem>
          <GridItem tw="col-span-6">
            <FormLabel htmlFor="CompanyAddress">Company Address</FormLabel>
            <FormInput
              id="CompanyAddress"
              name="CompanyAddress"
              placeholder="* Company address"
            />
            <FormInputError
              name="CompanyAddress"
              component="div"
              className="field-error"
            />
          </GridItem>
        </Grid>

        <Grid tw="mb-3">
          {visibleCityStateFields && (
            <>
              <GridItem tw="col-span-4">
                <FormLabel htmlFor="CompanyCity">City</FormLabel>
                <FormInput
                  id="CompanyCity"
                  name="CompanyCity"
                  placeholder="* City"
                />
                <FormInputError
                  name="CompanyCity"
                  component="div"
                  className="field-error"
                />
              </GridItem>
              <GridItem tw="col-span-4">
                <FormLabel htmlFor="CompanyState">State</FormLabel>
                <FormInput
                  id="CompanyState"
                  name="CompanyState"
                  placeholder="State"
                  component="select">
                  {States.map((item, index) => (
                    <option key={`state-${index}`} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </FormInput>
                <FormInputError
                  name="CompanyState"
                  component="div"
                  className="field-error"
                />
              </GridItem>
            </>
          )}
          <GridItem tw="col-span-4">
            <FormLabel htmlFor="CompanyZip">Zip</FormLabel>
            <FormInput
              id="CompanyZip"
              name="CompanyZip"
              placeholder="* Zip Code"
            />
            <FormInputError
              name="CompanyZip"
              component="div"
              className="field-error"
            />
          </GridItem>
        </Grid>

        <Grid tw="mb-3">
          <GridItem tw="col-span-12">
            <FormLabel>Website</FormLabel>
          </GridItem>
          <GridItem tw="col-span-12">
            <FormInput
              id="CompanyWebsite"
              name="CompanyWebsite"
              placeholder="* Website"
            />
            <FormInputError
              name="CompanyWebsite"
              component="div"
              className="field-error"
            />
          </GridItem>
        </Grid>

        <Grid tw="mb-3">
          <GridItem tw="col-span-6">
            <FormLabel htmlFor="ContactName">Contact Name</FormLabel>
            <FormInput
              id="ContactName"
              name="ContactName"
              placeholder="* Contact name"
            />
            <FormInputError
              name="ContactName"
              component="div"
              className="field-error"
            />
          </GridItem>
          <GridItem tw="col-span-6">
            <FormLabel htmlFor="ContactTitle">Title</FormLabel>
            <FormInput
              id="ContactTitle"
              name="ContactTitle"
              placeholder="Title"
            />
            <FormInputError
              name="ContactTitle"
              component="div"
              className="field-error"
            />
          </GridItem>
        </Grid>

        <Grid tw="mb-3">
          <GridItem tw="col-span-6">
            <FormLabel htmlFor="ContactPhoneNumber">Phone Number</FormLabel>
            <FormInput
              id="ContactPhoneNumber"
              name="ContactPhoneNumber"
              placeholder="* Phone Number"
              component={PhoneNumberInput}
            />
            <FormInputError
              name="ContactPhoneNumber"
              component="div"
              className="field-error"
            />
          </GridItem>
          <GridItem tw="col-span-6">
            <FormLabel htmlFor="ContactEmailAddress">Email Address</FormLabel>
            <FormInput
              id="ContactEmailAddress"
              name="ContactEmailAddress"
              placeholder="* Email Address"
              type="email"
            />
            <FormInputError
              name="ContactEmailAddress"
              component="div"
              className="field-error"
            />
          </GridItem>
        </Grid>
        <br />
        <br />
        <h4 tw="font-semibold text-xl mb-3">Product/Service Details</h4>
        <Grid tw="mb-3">
          <GridItem tw="col-span-6">
            <FormLabel htmlFor="ServicesProvided">
              Product/Services Provided
            </FormLabel>
            <FormInput
              id="ServicesProvided"
              name="ServicesProvided"
              placeholder=""
              component="select">
              {ProductServices.map((item, index) => (
                <option key={`service-${index}`} value={item.value}>
                  {item.name}
                </option>
              ))}
            </FormInput>
          </GridItem>
        </Grid>
        <Grid tw="mb-3">
          <GridItem tw="col-span-12">
            <FormLabel>
              Are you able to provide your products and services Nationwide?
            </FormLabel>
          </GridItem>
          <GridItem tw="col-span-12">
            <Field
              id="HasNationwideService"
              name="HasNationwideService"
              value="true"
              type="radio"
            />
            <span>&nbsp;&nbsp;Yes</span>
            &nbsp;&nbsp;
            <Field name="HasNationwideService" value="false" type="radio" />
            <span>&nbsp;&nbsp;No</span>
          </GridItem>
        </Grid>
        <Grid tw="mb-3">
          <GridItem tw="col-span-12">
            <FormLabel>
              Can you provide products and services to Canada?
            </FormLabel>
          </GridItem>
          <GridItem tw="col-span-12">
            <Field
              id="HasCanadianService"
              name="HasCanadianService"
              value="true"
              type="radio"
            />
            <span>&nbsp;&nbsp;Yes</span>
            &nbsp;&nbsp;
            <Field name="HasCanadianService" value="false" type="radio" />
            <span>&nbsp;&nbsp;No</span>
          </GridItem>
        </Grid>
        <Grid tw="mb-3">
          <GridItem tw="col-span-12">
            <FormLabel>
              Does your company have physical locations outside of the U.S.?
            </FormLabel>
          </GridItem>
          <GridItem tw="col-span-12">
            <Field
              id="HasCanadianPresence"
              name="HasCanadianPresence"
              value="true"
              type="radio"
            />
            <span>&nbsp;&nbsp;Yes</span>
            &nbsp;&nbsp;
            <Field name="HasCanadianPresence" value="false" type="radio" />
            <span>&nbsp;&nbsp;No</span>
          </GridItem>
        </Grid>

        <br />
        <br />
        <h4 tw="font-semibold text-xl mb-3">Referral/Franchise Information</h4>
        <Grid tw="mb-3">
          <GridItem tw="col-span-12">
            <FormLabel>
              Were you referred by a Corporate or Franchise Employee?
            </FormLabel>
          </GridItem>
          <GridItem tw="col-span-12">
            <Field
              id="HasReferral"
              name="HasReferral"
              value="true"
              type="radio"
            />
            <span>&nbsp;&nbsp;Yes</span>
            &nbsp;&nbsp;
            <Field name="HasReferral" value="false" type="radio" />
            <span>&nbsp;&nbsp;No</span>
          </GridItem>
        </Grid>
        <Grid tw="mb-3">
          <GridItem tw="col-span-12">
            <FormLabel>
              Are you currently providing products/services to SERVPRO®
              Franchises?
            </FormLabel>
          </GridItem>
          <GridItem tw="col-span-12">
            <Field
              id="IsCurrentProvider"
              name="IsCurrentProvider"
              value="true"
              type="radio"
            />
            <span>&nbsp;&nbsp;Yes</span>
            &nbsp;&nbsp;
            <Field name="IsCurrentProvider" value="false" type="radio" />
            <span>&nbsp;&nbsp;No</span>
          </GridItem>
        </Grid>
        <Grid tw="mb-3">
          <GridItem tw="col-span-12">
            <FormLabel>
              If applicable, please provide the Franchise Name(s), Contact
              Name(s), Contact Number(s), and how long you have been providing
              your products or services to SERVPRO® Franchises.
            </FormLabel>
          </GridItem>
          <GridItem tw="col-span-12">
            <FormInput
              id="CurrentServices"
              name="CurrentServices"
              placeholder=""
              component="textarea"
              rows={4}
            />
            <FormInputError
              name="CurrentServices"
              component="div"
              className="field-error"
            />
          </GridItem>
        </Grid>

        <div tw="w-full mt-4">
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
        <TriggerFormChange
          queryFieldName="CompanyZip"
          setFields={{
            CompanyCity: geoData => geoData.city,
            CompanyState: geoData => geoData.state
          }}
          setVisibleCityStateFields={setVisibleCityStateFields}
        />
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

const PreferredVendorForm = ({ submitButton, successMessage }) => {
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

const FormWrap = tw(Form)`max-w-screen-sm`
const FormLabel = tw.label`block font-semibold py-2 px-0`
const FormInput = tw(Field)`block rounded-md bg-warmGray-200 p-3 w-full`
const FormInputError = tw(ErrorMessage)`text-red-400 text-sm`
const Grid = tw.div`md:(grid grid-cols-12 gap-2)`
const GridItem = tw.div``
const SuccessMessage = tw.div`mb-3`

export default PreferredVendorForm
