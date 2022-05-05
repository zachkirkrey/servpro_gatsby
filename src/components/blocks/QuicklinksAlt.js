import React from 'react'
import tw, { styled } from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'
import Searchbar from '@atoms/Searchbar'
import { graphql } from 'gatsby'
import { SITE_SEARCH_PLACEHOLDER } from '../../constants/constants'

const QuicklinksAlt = ({ data }) => {
  const { heading, links } = data

  if (!links || links.length === 0) {
    return null
  }

  return (
    <QuickLinksSection>
      <Heading>{heading}</Heading>
      <LinksWrap>
        {!!links?.length &&
          links.map((link, index) => {
            return (
              <AccessibleLink key={index} to={link.href}>
                {link.title}
              </AccessibleLink>
            )
          })}
      </LinksWrap>
      <SearchbarGroup>
        <SearchbarTitle>Have another question?</SearchbarTitle>
        <SearchbarWrapper>
          <Searchbar isWhite siteSearch placeholder={SITE_SEARCH_PLACEHOLDER} />
        </SearchbarWrapper>
      </SearchbarGroup>
    </QuickLinksSection>
  )
}

const QuickLinksSection = styled.div`
  ${tw`relative left-0 w-full text-lg z-20 pt-12 lg:(pt-12 pb-4 pl-24)`}
`
const Heading = styled.h2`
  ${tw`text-primary-black font-semibold text-2xl mb-5 sm:px-8`}
`
const LinksWrap = styled.div`
  @media (min-width: 1024px) {
    font-size: 21px;
  }
  margin-bottom: 37px;
  ${tw`text-primary flex flex-col items-start space-y-5 sm:px-8 mb-7`}
`
const SearchbarGroup = styled.div`
  border-radius: 5px;
  ${tw`bg-primary-black px-8 pt-5 pb-8`}
`
const SearchbarTitle = styled.p`
  letter-spacing: 1.2px;
  ${tw`text-white mb-2`}
`
const SearchbarWrapper = styled.div``

export const query = graphql`
  fragment QuicklinksData on CmsPageBuilderBlocks {
    quicklinks {
      heading
      links {
        href
        title
      }
    }
  }
`

export default QuicklinksAlt
