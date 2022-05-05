import React from 'react'
import tw from 'twin.macro'
import { Formik, Field, Form } from 'formik'
import Layout from '@components/Layout'
import Container from '@atoms/Container'

const ClientsideFormExample = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: ''
      }}>
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

        <FormButton type="submit">Submit</FormButton>
      </FormWrap>
    </Formik>
  )
}

const FormWrap = tw(Form)``
const FormLabel = tw.label`block font-medium text-warmGray-700 px-4 py-2`
const FormInput = tw(Field)`block w-full rounded-md px-4 py-2 mb-6`
const FormButton = tw.button`my-4 px-4 py-2 bg-orange-400 text-white text-sm font-medium rounded-lg`

const ClientsideFormExamplePage = () => (
  <Layout>
    <Container tw="py-16">
      <ClientsideFormExample />
    </Container>
  </Layout>
)

export default ClientsideFormExamplePage
