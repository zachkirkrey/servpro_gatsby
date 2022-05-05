import React from 'react'
import tw from 'twin.macro'
import { graphql } from 'gatsby'

import Breadcrumbs from '@sections/Breadcrumbs'
import Layout from '@components/Layout'
import Container from '@atoms/Container'
import PageTitle from '@atoms/PageTitle'
import Button from '@atoms/Button'
import InputText from '@atoms/InputText'

const FranchiseLoginPage = ({ data }) => {
  const { page_title, page_copy } = data.cmsFranchiseLoginPage

  return (
    <Layout>
      <Container tw="pt-4 lg:pb-96">
        <div tw="lg:mb-3">
          <Breadcrumbs />
        </div>
        <PageTitle tw="max-w-2xl mb-3 lg:mb-6">{page_title}</PageTitle>
        <div
          tw="text-xl mb-8 lg:mb-20"
          dangerouslySetInnerHTML={{ __html: page_copy }}
        />
        <StyledForm>
          <InputText id="email" placeholder="Email Address" />
          <InputText id="password" placeholder="Password" />
        </StyledForm>
        <div tw="w-64">
          <Button tw="w-full" type="submit">
            Submit
          </Button>
        </div>
      </Container>
    </Layout>
  )
}

const StyledForm = tw.form`flex flex-col space-y-8 w-full mb-7 lg:(max-w-2xl mb-14)`

export const query = graphql`
  query FranchiseLoginPageQuery {
    cmsFranchiseLoginPage {
      page_title
      page_copy
    }
  }
`

export default FranchiseLoginPage
