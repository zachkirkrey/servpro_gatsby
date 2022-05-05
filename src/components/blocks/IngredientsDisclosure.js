import React from 'react'
import tw, { styled } from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'
import PageTitle from '@atoms/PageTitle'
import Breadcrumbs from '@sections/Breadcrumbs'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const IngredientsDisclosure = ({ data }) => {
  const { heading, copy, ingredients } = data
  return (
    <Container css={paddingDefault()}>
      <div tw="lg:mb-3">
        <Breadcrumbs />
      </div>
      <div tw="max-w-2xl mb-10 leading-none">
        <PageTitle>{apCaseOnlyTitleTags(heading)}</PageTitle>
      </div>
      <Copy
        css={RichTextEditorStyles}
        dangerouslySetInnerHTML={{ __html: copy }}
      />
      <ul tw="font-semibold text-lg">
        {ingredients.map(ingredient => {
          const { label, disclosure_file, safety_datasheet_file } = ingredient

          return (
            <LineWrap key={label}>
              <p>{label}</p>
              <LinkWrap>
                {disclosure_file?.url && (
                  <LinkItem to={disclosure_file.url}>
                    Ingredients Disclosure
                  </LinkItem>
                )}
              </LinkWrap>
              <LinkWrap>
                {safety_datasheet_file?.url && (
                  <LinkItem to={safety_datasheet_file.url}>
                    Safety Data Sheet
                  </LinkItem>
                )}
              </LinkWrap>
            </LineWrap>
          )
        })}
      </ul>
    </Container>
  )
}

const LinkWrap = styled.div`
  &:last-of-type {
    @media (min-width: 1025px) {
      margin-left: 40px;
    }
  }
`
const LinkItem = tw(AccessibleLink)`text-primary underline`
const LineWrap = styled.li`
  padding-bottom: 2.75rem;
  @media (min-width: 1025px) {
    grid-template-columns: 630px 1fr 1fr;
  }
  ${tw`relative grid grid-cols-1 gap-y-2 pt-9 text-xl leading-6 lg:gap-y-4 xl:(gap-y-0)`}

  &::before,
  &::after {
    height: 1px;
    ${tw`content block absolute left-0 right-0 bg-primary`}
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: -1px;
  }
`
const Copy = styled.div`
  ${tw`text-xl mb-16`}
  a {
    color: #ff7200;
    text-decoration: underline;
  }
`

export const query = graphql`
  fragment IngredientsDisclosureData on CmsPageBuilderBlocks {
    ingredients_disclosure {
      heading
      copy
      ingredients {
        label
        disclosure_file {
          url
        }
        safety_datasheet_file {
          url
        }
      }
    }
  }
`

export default IngredientsDisclosure
