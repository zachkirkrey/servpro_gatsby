import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'

import Container from '@atoms/Container'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const ContactBanner = ({ data }) => {
  const { content } = data || ''
  const { headline, subline, copy, image } =
    !!content && !!content[0] ? content[0] : ''

  return (
    <div tw="relative" css={paddingDefault()}>
      <Container>
        <ContentWrap>
          <h4 tw="text-lg mt-2 mb-4">{subline}</h4>
          <h3 tw="text-54px leading-10 mb-4 lg:(text-6xl leading-tight mb-0)">
            {apCaseOnlyTitleTags(headline)}
          </h3>
          <div
            tw="text-lg"
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />
        </ContentWrap>
      </Container>
      {image?.url && (
        <div tw="absolute inset-0">
          <StyleImage image={image} alt={image.description} />
        </div>
      )}
    </div>
  )
}

const ContentWrap = styled.div`
  max-width: 634px;
  ${tw`relative z-10 text-white px-4`}
`
const StyleImage = tw(
  SvgSafeGatsbyImage
)`absolute inset-0 w-full h-full object-cover`

export const query = graphql`
  fragment ContactBannerData on CmsPageBuilderBlocks {
    contact_banner {
      content {
        headline
        subline
        copy
        image {
          filename
          title
          url
          description
          localAsset {
            url
            childImageSharp {
              gatsbyImageData(
                width: 1440
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`

export default ContactBanner
