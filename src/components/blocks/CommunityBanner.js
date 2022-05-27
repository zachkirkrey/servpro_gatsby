import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import Button from '@atoms/Button'

import Container from '@atoms/Container'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

// Can't read the data param; as there's no GQL frag/query.
const CommunityBanner = ({ data }) => {
  const { background, content } = data
  const { alignment, headline, copy, icon, button_link, disable_content } =
    content
  const { image, fill_screen_height } = background

  return (
    <CommunityBannerWrap fullFill={!!fill_screen_height}>
      <Container>
        {!disable_content && (
          <Content alignment={alignment || 'left'}>
            {!!icon?.url && <Icon image={icon} alt={icon.title} />}
            <Headline
              dangerouslySetInnerHTML={{
                __html: apCaseOnlyTitleTags(headline)
              }}
            />
            <div
              tw="text-xl leading-snug"
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: copy }}
            />
            {!!button_link?.title && (
              <div tw="mt-5">
                <Button to={button_link.href}>{button_link.title}</Button>
              </div>
            )}
          </Content>
        )}
        {!!image?.url && (
          <div tw="absolute inset-0">
            <BackgroundImage image={image} alt={image.description} />
          </div>
        )}
      </Container>
    </CommunityBannerWrap>
  )
}

const CommunityBannerWrap = styled.div(({ fullFill }) => [
  tw`relative pt-14 pb-20 md:py-20 lg:(pt-40 pb-52)`,
  fullFill && tw`lg:min-h-screen`
])
const Content = styled.div(({ alignment }) => [
  tw`relative flex flex-col items-start text-primary-black p-8 z-10`,
  alignment === 'right' && tw`ml-auto lg:max-w-md`,
  alignment === 'left' && tw`mr-auto lg:max-w-md`,
  alignment === 'center' && tw`mx-auto`,
  `background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  `
])

const Headline = styled.h3`
  line-height: 1.19;
  ${tw`text-36px mb-6`}
`
const Icon = styled(SvgSafeGatsbyImage)`
  max-height: 77px;
  ${tw`mb-8`}
`
const BackgroundImage = styled(SvgSafeGatsbyImage)`
  ${tw`absolute inset-0 w-full h-full object-cover z-0`}
`

export const query = graphql`
  fragment CommunityBannerData on CmsPageBuilderBlocks {
    community_banner {
      background {
        fill_screen_height
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
      }
      content {
        disable_content
        alignment
        headline
        copy
        button_link {
          title
          href
        }
        icon {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(
                width: 100
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

export default CommunityBanner
