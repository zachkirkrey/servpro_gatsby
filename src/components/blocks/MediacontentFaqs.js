import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import Container from '@atoms/Container'
import dotImage from '../../images/dot-pattern.svg'
import Accordion from '@atoms/Accordion'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import Button from '@atoms/Button'
import paddingDefault from '@utils/paddingDefault'

const MediacontentFaqs = ({ data }) => {
  const { mediacontent, faqs } = data
  const { link } = faqs
  /* eslint-disable-next-line no-unused-vars */
  const { content, image, disable_background_dots } = mediacontent

  const hasImage = !!image?.url

  return (
    <Container>
      <div tw="lg:(flex flex-row)" css={paddingDefault()}>
        <ContentWrap>
          <div tw="pl-10 pr-5 lg:(px-14 py-40)">
            {content && (
              <RichTextContainer
                css={RichTextEditorStyles}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
          {hasImage && (
            <ImageWrapper>
              <SvgSafeGatsbyImage
                tw="lg:max-h-full object-contain object-center"
                image={image}
                alt={image.title}
              />
              {!disable_background_dots && <DotPattern />}
            </ImageWrapper>
          )}
        </ContentWrap>
        <div tw="lg:(w-1/2 pr-7)">
          <Accordion faqs={faqs} onMediaContent />
          {!!link?.href && (
            <div tw="flex mt-10 lg:mt-12">
              <Button to={link.href}>{link.title}</Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

const ContentWrap = styled.div`
  @media (min-width: 1024px) {
    width: 45%;
  }
  ${tw`relative h-full mb-8 lg:(mb-0 mr-20 pl-2)`};
`
const DotPattern = styled.div`
  background-image: url(${dotImage});
  ${tw`hidden absolute h-full w-full -top-12 -left-16 -z-1 lg:block`};
`

const RichTextContainer = styled.div`
  color: #fff;

  && {
    h2,
    h4,
    li {
      color: #fff;
    }
  }
`
const ImageWrapper = styled.div`
  ${tw`md:max-w-md lg:max-w-none lg:absolute top-0 lg:h-full lg:w-full -z-1`}
  img {
    ${tw`object-contain object-center`}
  }
`

export const query = graphql`
  fragment MediacontentFaqsData on CmsPageBuilderBlocks {
    mediacontent_faqs {
      mediacontent {
        content
        disable_background_dots
        image {
          filename
          title
          url
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
      faqs {
        heading
        questions {
          questions {
            question
            answer
          }
        }
        link {
          href
          title
        }
      }
    }
  }
`

export default MediacontentFaqs
