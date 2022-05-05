import React from 'react'
import tw, { styled } from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'

const Quicklinks = ({ data }) => {
  const { heading, links } = data

  if (!links || links.length === 0) {
    return null
  }

  return (
    <QuickLinksSection>
      <Container tw="relative">
        <StyledContainer>
          <Heading>{heading}</Heading>
          <LinksWrap>
            {!!links?.length &&
              links.map((link, index) => {
                return (
                  <AccessibleLink
                    className="hover-default"
                    key={index}
                    to={link.href}
                    tw="hover:opacity-80">
                    {link.title}
                  </AccessibleLink>
                )
              })}
          </LinksWrap>
        </StyledContainer>
      </Container>
      <DarkBg />
    </QuickLinksSection>
  )
}

const QuickLinksSection = tw.div`hidden relative xl:block`
const StyledContainer = styled.div`
  max-width: 344px;
  padding: 33px 16px 40px 0;
  ${tw`relative left-0 w-full bg-primary-black text-lg z-20`}
`
const Heading = styled.h2`
  letter-spacing: 2.57px;
  ${tw`text-primary text-lg mb-3`}
`
const LinksWrap = tw.div`text-white flex flex-col items-start space-y-1`
const DarkBg = styled.div`
  width: 30%;
  ${tw`absolute inset-0 bg-primary-black h-full`}
  @media (min-width: 2890px) {
    width: 40%;
  }
`

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

export default Quicklinks
