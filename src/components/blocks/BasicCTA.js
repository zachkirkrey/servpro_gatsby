import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'

import Container from '@atoms/Container'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import Button from '@atoms/Button'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import Nearest from './Nearest'
import NearestVertical from './NearestVertical'

const BasicCTA = ({ data }) => {
  const {
    heading,
    subheading,
    button_link,
    background_image,
    use_default_cta = false,
    disable_mobile = false,
    disable_desktop = false
  } = data ?? ''
  return (
    <BasicCTASection
      css={!use_default_cta && paddingDefault()}
      withoutPadding={use_default_cta}>
      {use_default_cta ? (
        <div>
          {!disable_desktop && (
            <div tw="hidden lg:block">
              <Nearest />
            </div>
          )}
          {!disable_mobile && (
            <div tw="flex justify-center lg:hidden">
              <NearestVertical />
            </div>
          )}
        </div>
      ) : (
        <Container>
          <div tw="relative z-10 flex flex-col justify-between sm:(items-center flex-row)">
            <div tw="mb-5 xs:mb-10 sm:w-2/3 sm:mb-0">
              <Heading>{apCaseOnlyTitleTags(heading)}</Heading>
              <div
                css={RichTextEditorStyles}
                dangerouslySetInnerHTML={{
                  __html: apCaseOnlyTitleTags(subheading)
                }}
              />
            </div>
            {!!button_link?.title && (
              <div tw="flex flex-col items-center justify-center sm:w-1/3">
                <Button to={button_link.href} title={button_link.title}>
                  {button_link.title}
                </Button>
              </div>
            )}
          </div>
        </Container>
      )}
      {!!background_image?.url && !use_default_cta && (
        <div tw="absolute inset-0">
          <SvgSafeGatsbyImage
            tw="absolute inset-0 w-full h-full object-cover opacity-80"
            image={background_image}
            alt={background_image.description}
          />
        </div>
      )}
    </BasicCTASection>
  )
}

const BasicCTASection = styled.section(({ withoutPadding }) => [
  tw`relative text-white overflow-hidden text-primary-black`,
  withoutPadding && tw`py-4 lg:p-0`
])
const Heading = styled.h4`
  ${tw`font-bold text-white mb-5 leading-none`}
  font-size: 2rem;
`

export const query = graphql`
  fragment BasicCTAData on CmsPageBuilderBlocks {
    basic_cta {
      use_default_cta
      disable_mobile
      disable_desktop
      heading
      subheading
      button_link {
        href
        title
      }
      background_image {
        filename
        title
        description
        url
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
`

export default BasicCTA
