import React, { useState } from 'react'
import tw from 'twin.macro'
import { Formik, Field, Form } from 'formik'
import Layout from '@components/Layout'
import Container from '@atoms/Container'

const SubmitFormToApiExample = () => {
  const [formResponse, setFormResponse] = useState()

  const testForm = async vals =>
    setFormResponse(
      await (
        await fetch(`/api/formExample?data=${JSON.stringify(vals)}`)
      ).json()
    )

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: ''
        }}
        onSubmit={async vals => testForm(vals)}>
        {({ isSubmitting }) => (
          <FormWrap>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <FormInput id="firstName" name="firstName" placeholder="First" />

            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <FormInput id="lastName" name="lastName" placeholder="Last" />

            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              name="email"
              placeholder="your@email.com"
              type="email"
            />

            <FormButton type="submit" disabled={isSubmitting}>
              Submit
            </FormButton>
          </FormWrap>
        )}
      </Formik>
      {!!formResponse && <pre>{formResponse}</pre>}
    </>
  )
}

const SubmitFormToApiExamplePage = () => (
  <Layout>
    <Container tw="py-16">
      <SubmitFormToApiExample />
    </Container>
  </Layout>
)

const FormWrap = tw(Form)``
const FormLabel = tw.label`block font-medium text-warmGray-700 px-4 py-2`
const FormInput = tw(Field)`block w-full rounded-md px-4 py-2 mb-6`
const FormButton = tw.button`my-4 px-4 py-2 bg-orange-400 text-white text-sm font-medium rounded-lg`

export default SubmitFormToApiExamplePage
