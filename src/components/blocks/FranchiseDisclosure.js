import React from 'react'
import tw from 'twin.macro'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'
import PageTitle from '@atoms/PageTitle'
import AccessibleLink from '@atoms/AccessibleLink'
import Breadcrumbs from '@sections/Breadcrumbs'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const FranchiseDisclosure = ({ data }) => {
  const { page_heading, lists } = data

  return (
    <div css={paddingDefault()}>
      <Container>
        <div tw="lg:mb-3">
          <Breadcrumbs />
        </div>
        <PageTitle tw="max-w-2xl mb-3 lg:mb-8">
          {apCaseOnlyTitleTags(page_heading)}
        </PageTitle>
        {lists.map(list => {
          const { list_heading, links } = list
          return (
            <div tw="text-xl font-semibold py-14" key={list_heading}>
              <h2 tw="pb-4 mb-6 border-b border-primary">
                {apCaseOnlyTitleTags(list_heading)}
              </h2>
              <ul tw="flex flex-col items-start space-y-7">
                {links.map(({ title, href }) => {
                  return (
                    <StyledLink className="hover-default" to={href} key={title}>
                      {title}
                    </StyledLink>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </Container>
    </div>
  )
}

const StyledLink = tw(AccessibleLink)`text-primary underline`

export const query = graphql`
  fragment FranchiseDisclosureData on CmsPageBuilderBlocks {
    franchise_disclosure {
      page_heading
      lists {
        list_heading
        links {
          href
          title
        }
      }
    }
  }
`

export default FranchiseDisclosure
