import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const PartnerLogos = ({ data }) => {
  const { heading, partners } = data ?? ''

  return (
    <PartnerLogosSection css={paddingDefault()}>
      <Container tw="lg:px-16">
        <PartnerLogosHeading>
          {apCaseOnlyTitleTags(heading)}
        </PartnerLogosHeading>
        <PartnerLogosWrap>
          {partners?.length &&
            partners.map(partner => {
              const { link, logo } = partner
              return (
                <PartnerLogosItem key={link.title}>
                  <AccessibleLink href={link.href}>
                    {logo?.url ? (
                      <PartnerLogo image={logo} alt={logo.title} />
                    ) : (
                      'Missing Logo'
                    )}
                  </AccessibleLink>
                </PartnerLogosItem>
              )
            })}
        </PartnerLogosWrap>
      </Container>
    </PartnerLogosSection>
  )
}

const PartnerLogosSection = tw.section``
const PartnerLogosHeading = styled.h2`
  letter-spacing: 1.5px;
  ${tw`text-warmGray-700 text-sm mb-12`}
`
const PartnerLogosWrap = tw.ul`grid grid-cols-2 gap-5 lg:(flex flex-row flex-wrap items-center justify-between flex-nowrap h-14)`
const PartnerLogosItem = tw.li`flex justify-center items-center`
const PartnerLogo = tw(
  SvgSafeGatsbyImage
)`transform scale-75 lg:(max-h-full scale-100)`

export const query = graphql`
  fragment PartnerLogosData on CmsPageBuilderBlocks {
    partner_logos {
      heading
      partners {
        link {
          href
          title
        }
        logo {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
            }
          }
        }
      }
    }
  }
`

export default PartnerLogos
