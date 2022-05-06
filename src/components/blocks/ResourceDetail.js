import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'

import { truncateHTML } from '../utils/Truncate'
import { justPTags } from '../utils/just-p-tags'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import Container from '@atoms/Container'
import NearestVertical from '@blocks/NearestVertical'
import paddingDefault from '@utils/paddingDefault'
import AccessibleLink from '@atoms/AccessibleLink'

const ResourceDetail = ({ data }) => {
  const { title, copy, image, read_more } = data

  return (
    <div css={paddingDefault()}>
      <Container tw="flex flex-col lg:flex-row items-start justify-between">
        <StyledContainer>
          {!!image?.url && (
            <ImageWrap href={read_more}>
              <div tw="absolute inset-0 object-cover">
                <Image image={image} alt={image.description} />
              </div>
            </ImageWrap>
          )}
          <h3 tw="text-3xl leading-7 tracking-wide mb-3">
            <AccessibleLink tw="" title={title} to={read_more}>
              {title}
            </AccessibleLink>
          </h3>
          <div
            tw="text-xl pb-4"
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{
              __html: copy ? truncateHTML(justPTags(copy), 225) : ''
            }}
          />
          {!!read_more && (
            <ReadMoreLink tw="font-semibold" to={read_more}>
              Read More ›
            </ReadMoreLink>
          )}
        </StyledContainer>
        <NearestVertical />
      </Container>
    </div>
  )
}

const StyledContainer = styled.div`
  @media (min-width: 1025px) {
    width: 55%;
  }
`
const ImageWrap = styled.a`
  ${tw`block relative mb-6`}

  &::before {
    display: block;
    padding-top: 64%;
    content: '';
  }
`
const Image = tw(SvgSafeGatsbyImage)`
  w-full h-full object-cover`

const ReadMoreLink = styled(AccessibleLink)`
  ${tw`text-primary-black font-semibold text-xl mt-3`}
`

export const query = graphql`
  fragment ResourceDetailData on CmsPageBuilderBlocks {
    resource_detail {
      copy
      image {
        filename
        title
        url
        description
        localAsset {
          childImageSharp {
            gatsbyImageData(
              width: 1440
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
      read_more {
        href
        title
      }
    }
  }
`

export default ResourceDetail
