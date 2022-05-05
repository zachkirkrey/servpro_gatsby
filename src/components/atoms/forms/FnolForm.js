import React, { useState } from 'react'
import tw from 'twin.macro'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Button from '@atoms/Button'
import DatePicker from '@atoms/DatePicker'
import PhoneNumberInput from '@atoms/PhoneNumberInput'
import LoadingSpinner from '@atoms/loading/LoadingSpinner'
import { formatPhoneNumber } from '@utils/format-phone-link'
import TriggerFormChange from './TriggerFormChange'
import { States } from '../../../settings/contants'

const FormSchema = Yup.object().shape({
  FirstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required.'),
  LastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required.'),
  Address1: Yup.string().required('Address1 is required.'),
  Zip: Yup.string().required('Postal Code is required.'),
  PrimaryPhone: Yup.string().required('Primary phone number is required.'),
  Email: Yup.string()
    .email('Invalid Email')
    .required('Email address is required.')
})

const FormView = ({ submitButton, handleFormSubmitSuccess }) => {
  const [visibleCityStateFields, setVisibleCityStateFields] = useState(false)
  const [visibleOwnerFields, setVisibleOwnerFields] = useState(true)
  const [requestFormSubmit, setRequestFormSubmit] = useState(false)
  const [error, setError] = useState('test')

  const handleFormSubmit = async data => {
    try {
      setRequestFormSubmit(true)
      const payload = {
        Priority: 1,
        // isOwner: data.isOwner === 'true'
        ...data
      }

      payload.PrimaryPhone = formatPhoneNumber(payload.PrimaryPhone)
      payload.SecondaryPhone = formatPhoneNumber(payload.SecondaryPhone)

      delete payload.isOwner
      const result = await axios.post('/api/forms/form-FnolForm', {
        data: payload
      })
      setRequestFormSubmit(false)
      if (result.data.success) {
        handleFormSubmitSuccess(true)
      } else {
        setError(result.data.message)
      }
    } catch (err) {
      setRequestFormSubmit(false)
    }
  }

  return (
    <Formik
      initialValues={{
        FirstName: '',
        LastName: '',
        isOwner: 'true',
        Address1: '',
        Address2: '',
        City: '',
        State: '',
        Zip: '',
        PrimaryPhone: '',
        SecondaryPhone: '',
        Email: '',
        LossDate: '',
        PropertyType: '1',
        LossCause: '1',
        LossType: '1',
        Comments: ''
      }}
      validationSchema={FormSchema}
      onSubmit={handleFormSubmit}>
      <FormWrap>
        <FormGroupHeader>Contact Information</FormGroupHeader>
        <hr />
        <br />
        <div tw="max-w-3xl">
          <Grid tw="mb-2">
            <GridItem tw="col-span-12 md:col-span-4">
              <FormLabel>Name</FormLabel>
            </GridItem>
            <GridItem tw="col-span-12 mb-2 md:(col-span-4 mb-0)">
              <FormInput
                id="FirstName"
                name="FirstName"
                placeholder="* First Name"
              />
              <FormInputError
                name="FirstName"
                component="div"
                className="field-error"
              />
            </GridItem>
            <GridItem tw="col-span-12 md:col-span-4">
              <FormInput
                id="LastName"
                name="LastName"
                placeholder="* Last Name"
              />
              <FormInputError
                name="LastName"
                component="div"
                className="field-error"
              />
            </GridItem>
          </Grid>
          <Grid tw="mb-3">
            <GridItem tw="col-span-4 md:col-span-4">
              <FormLabel>Are you the owner?</FormLabel>
            </GridItem>
            <GridItem tw="col-span-6 md:col-span-8 pt-1">
              <span>
                <Field name="isOwner" value="true" type="radio" />
                <span>&nbsp;&nbsp;Yes</span>
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                <Field name="isOwner" value="false" type="radio" />
                &nbsp;&nbsp;No
              </span>
            </GridItem>
          </Grid>
          {!visibleOwnerFields && (
            <Grid tw="mb-3">
              <GridItem tw="col-span-12 md:col-span-4">
                <FormLabel>Owner Name</FormLabel>
              </GridItem>
              <GridItem tw="col-span-12 mb-2 md:(col-span-4 mb-0)">
                <FormInput
                  id="OwnerFirstName"
                  name="OwnerFirstName"
                  placeholder="Owner First Name"
                />
              </GridItem>
              <GridItem tw="col-span-12 md:(col-span-4)">
                <FormInput
                  id="OwnerLastName"
                  name="OwnerLastName"
                  placeholder="Owner Last Name"
                />
              </GridItem>
            </Grid>
          )}
          <Grid tw="mb-3">
            <GridItem tw="col-span-4">
              <FormLabel htmlFor="Address1">Address</FormLabel>
            </GridItem>
            <GridItem tw="col-span-12 mb-2 md:(col-span-6 mb-0)">
              <FormInput
                id="Address1"
                name="Address1"
                placeholder="* Street Address"
              />
              <FormInputError
                name="Address1"
                component="div"
                className="field-error"
              />
            </GridItem>
            <GridItem tw="col-span-4 mb-2 md:(col-span-2 mb-0)">
              <FormInput
                id="Address2"
                name="Address2"
                placeholder="Apt/Suite"
              />
            </GridItem>
          </Grid>
          <Grid tw="mb-3">
            <GridItem tw="col-span-4 md:(col-span-4 mb-0)" />
            {visibleCityStateFields && (
              <>
                <GridItem tw="col-span-12 mb-2 md:(col-span-2 mb-0)">
                  <FormInput id="City" name="City" placeholder="City" />
                </GridItem>
                <GridItem tw="col-span-12 mb-2 md:(col-span-3 mb-0)">
                  <FormInput
                    id="State"
                    name="State"
                    placeholder="State"
                    component="select">
                    {States.map((state, index) => (
                      <option key={`state-${index}`} value={state.value}>
                        {state.name}
                      </option>
                    ))}
                  </FormInput>
                </GridItem>
              </>
            )}
            <GridItem tw="col-span-12 md:(col-span-3)">
              <FormInput id="Zip" name="Zip" placeholder="* Postal Code" />
              <FormInputError
                name="Zip"
                component="div"
                className="field-error"
              />
            </GridItem>
          </Grid>
          <Grid tw="mb-3">
            <GridItem tw="col-span-4">
              <FormLabel>Phone</FormLabel>
            </GridItem>
            <GridItem tw="col-span-12 mb-2 md:(col-span-4 mb-0)">
              <FormInput
                id="PrimaryPhone"
                name="PrimaryPhone"
                placeholder="* Primary Phone"
                component={PhoneNumberInput}
              />
              <FormInputError
                name="PrimaryPhone"
                component="div"
                className="field-error"
              />
            </GridItem>
            <GridItem tw="col-span-12 md:(col-span-4)">
              <FormInput
                id="SecondaryPhone"
                name="SecondaryPhone"
                placeholder="Secondary Phone"
                component={PhoneNumberInput}
              />
            </GridItem>
          </Grid>
          <Grid tw="mb-3">
            <GridItem tw="col-span-12 md:col-span-4">
              <FormLabel>Email Address</FormLabel>
            </GridItem>
            <GridItem tw="col-span-12 md:col-span-4">
              <FormInput
                id="Email"
                name="Email"
                placeholder="* Email Address"
                type="email"
              />
              <FormInputError
                name="Email"
                component="div"
                className="field-error"
              />
            </GridItem>
          </Grid>
        </div>
        <br />
        <FormGroupHeader>Loss Information</FormGroupHeader>
        <hr />
        <br />
        <div tw="max-w-4xl m-auto">
          <Grid tw="mb-3">
            <GridItem tw="col-span-12 mb-2 md:(col-span-6 mb-0)">
              <Grid>
                <GridItem tw="col-span-4">
                  <FormLabel>Loss Date/Time</FormLabel>
                </GridItem>
                <GridItem tw="col-span-8">
                  <FormInput
                    id="LossDate"
                    name="LossDate"
                    placeholder=""
                    component={DatePicker}
                  />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem tw="col-span-12 md:(col-span-6)">
              <Grid>
                <GridItem tw="col-span-4">
                  <FormLabel>Property Type</FormLabel>
                </GridItem>
                <GridItem tw="col-span-8">
                  <FormInput
                    id="PropertyType"
                    name="PropertyType"
                    component="select">
                    <option value="1">Residential</option>
                    <option value="2">Commercial</option>
                  </FormInput>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
          <Grid tw="mb-3">
            <GridItem tw="col-span-12 mb-2 md:(col-span-6 mb-0)">
              <Grid>
                <GridItem tw="col-span-4">
                  <FormLabel>Loss Cause</FormLabel>
                </GridItem>
                <GridItem tw="col-span-8">
                  <FormInput id="LossCause" name="LossCause" component="select">
                    <option value="" />
                    <option value="1">Water</option>
                    <option value="2">Fire</option>
                    <option value="3">Mold</option>
                    <option value="17">General Cleaning</option>
                    <option value="6">Fire/Water</option>
                    <option value="7">Liability</option>
                    <option value="8">Odor</option>
                    <option value="9">Other</option>
                    <option value="10">Sewage</option>
                    <option value="11">Smoke</option>
                    <option value="12">Tree Removal</option>
                    <option value="13">Vandalism</option>
                  </FormInput>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem tw="col-span-12 md:(col-span-6)">
              <Grid>
                <GridItem tw="col-span-4">
                  <FormLabel>Loss Type</FormLabel>
                </GridItem>
                <GridItem tw="col-span-8">
                  <FormInput id="LossType" name="LossType" component="select">
                    <option value="" />
                    <option value="1">AC Leak</option>
                    <option value="2">Animal</option>
                    <option value="3">Burglary</option>
                    <option value="4">Candle</option>
                    <option value="47">Certified SERVPRO Cleaned</option>
                    <option value="48">Coronavirus/Pathogen</option>
                    <option value="5">Dishwasher</option>
                    <option value="6">Dryer</option>
                    <option value="7">Electrical Malfunction</option>
                    <option value="8">Flood</option>
                    <option value="9">Grease</option>
                    <option value="10">Hot Water Heater</option>
                    <option value="11">Hurricane</option>
                    <option value="12">Ice Storm</option>
                    <option value="13">Lightning</option>
                    <option value="14">Mildew</option>
                    <option value="15">Other</option>
                    <option value="16">Other Appliance</option>
                    <option value="17">Other Weather</option>
                    <option value="18">Pipe</option>
                    <option value="19">Puffback-Furnace</option>
                    <option value="20">Refrigerator</option>
                    <option value="21">Roof Leak</option>
                    <option value="22">Sewage Back-Up</option>
                    <option value="23">Slab Leak</option>
                    <option value="24">Soot</option>
                    <option value="25">Sprinkler System</option>
                    <option value="26">Stain on Carpet</option>
                    <option value="27">Stove/Oven</option>
                    <option value="28">Sump Pump Failure</option>
                    <option value="29">Toilet</option>
                    <option value="30">Tree</option>
                    <option value="31">Tornado</option>
                    <option value="32">Unknown</option>
                    <option value="33">Washing Machine</option>
                    <option value="34">Wind</option>
                  </FormInput>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
          <Grid tw="mb-3">
            <GridItem tw="col-span-2">
              <FormLabel>Comments</FormLabel>
            </GridItem>
            <GridItem tw="col-span-10">
              <FormInput
                id="Comments"
                name="Comments"
                component="textarea"
                placeholder=""
                rows={4}
              />
            </GridItem>
          </Grid>
          <br />
          <Grid tw="mt-4 md:(mt-0) mb-3">
            <GridItem tw="col-start-3 col-span-8">
              <div tw="text-red-500 mb-3">{error}</div>
              <Button
                css={tw`w-44 outline-none`}
                type="submit"
                disabled={requestFormSubmit}
                loading={requestFormSubmit}
                loadingIcon={<LoadingSpinner />}
                loadingText="Submitting...">
                {submitButton || 'Submit'}
              </Button>
            </GridItem>
          </Grid>
        </div>
        <TriggerFormChange
          queryFieldName="Zip"
          setFields={{
            City: geoData => geoData.city,
            State: geoData => geoData.state_short
          }}
          visibleOwnerFields={visibleOwnerFields}
          setVisibleCityStateFields={setVisibleCityStateFields}
          setVisibleOwnerFields={setVisibleOwnerFields}
          setError={setError}
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

const FnolForm = ({ submitButton, successMessage }) => {
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
const FormGroupHeader = tw.h4`font-semibold text-xl mb-1`
const FormLabel = tw.div`block font-semibold w-full pt-1 md:(text-right pr-3)`
const FormInput = tw(Field)`block rounded-md bg-warmGray-200 p-3 w-full`
const FormInputError = tw(ErrorMessage)`text-red-400 text-sm`
const Grid = tw.div`md:(grid grid-cols-12 gap-2)`
const GridItem = tw.div``
const SuccessMessage = tw.div`mb-3`

export default FnolForm
