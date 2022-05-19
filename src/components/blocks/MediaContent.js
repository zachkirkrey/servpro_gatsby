import React from 'react'
import { graphql } from 'gatsby'
import tw, { css, styled } from 'twin.macro'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'

import Button from '@atoms/Button'
import Breadcrumbs from '@sections/Breadcrumbs'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import ReactPlayer from 'react-player'
import { useLocator } from '@hooks/use-locator'
import formatPhoneLink from '../utils/format-phone-link'
import LoadingSpinner from '../atoms/loading/LoadingSpinner'
import { useResponsive } from '../atoms/Responsive'
import { BREAKPOINT_SM } from '../../constants/constants'

const Headline = props => {
  const { as: Component, children } = props
  return Component ? (
    <Component
      dangerouslySetInnerHTML={{
        __html: apCaseOnlyTitleTags(children)
      }}
    />
  ) : (
    <h3
      dangerouslySetInnerHTML={{
        __html: apCaseOnlyTitleTags(children)
      }}
    />
  )
}

const MediaContent = ({ data }) => {
  const { franchise } = useLocator()
  const { yext } = franchise ?? {}
  const { mainPhone: frPhone } = yext ?? {}
  const { content, media, settings } = data || []
  const { headline, headline_type, copy, link, enable_local_cta } =
    content || ''
  const {
    image,
    video,
    external_video_embed,
    external_video_embed_mobile,
    is_autoplay
  } = media ?? []
  const {
    has_breadcrumbs,
    is_flipped,
    media_fill,
    hide_background,
    media_full_width
  } = settings || false
  function generateVideoObject(videoUrl, embedVideoUrl) {
    if (!(videoUrl || embedVideoUrl)) {
      return null
    }
    return {
      type: embedVideoUrl ? 'embed' : 'hosted',
      src: embedVideoUrl || videoUrl
    }
  }

  const videoObject = generateVideoObject(video?.url, external_video_embed)
  const videoObjectMobile = generateVideoObject(
    video?.url,
    external_video_embed_mobile
  )

  const container = React.useRef(null)
  const responsiveContext = useResponsive()

  return media_full_width && !!videoObject.src ? (
    <Background tw="py-8" hiddenBg={!!hide_background}>
      <FullWidthMediaContainer>
        <div tw="absolute inset-0 flex items-center justify-center bg-black">
          <LoadingSpinner />
        </div>
        {link?.title && (
          <div tw="absolute bottom-3 sm:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-30">
            <Button to={link.href || '/'} smallOnMobile>
              {link?.title}
            </Button>
          </div>
        )}
        <FullWidthPlayer
          url={
            responsiveContext.isMobile && videoObjectMobile?.src
              ? videoObjectMobile?.src
              : videoObject?.src
          }
          playing
          loop
          controls={false}
          volume={0}
          muted
          playsinline
          width="100%"
          height="100%"
        />
      </FullWidthMediaContainer>
    </Background>
  ) : (
    <Background hiddenBg={!!hide_background}>
      <MediaContentSection
        fullSize={!!media_fill}
        flipped={!!is_flipped}
        ref={container}>
        <ImageWrap
          hasBreadscrumbs={!!has_breadcrumbs}
          fullSize={!!media_fill}
          flipped={!!is_flipped}>
          {has_breadcrumbs && !media_fill && <Breadcrumbs />}
          {!!image?.url && (
            <MediaImage
              fullSize={!!media_fill}
              image={image}
              alt={image.description}
            />
          )}
          {!!videoObject?.src && (
            <ReactPlayer
              url={videoObject.src}
              playing={!!is_autoplay}
              loop={!!is_autoplay}
              controls={
                videoObject.type === 'hosted' && !!is_autoplay ? false : true
              }
              playsinline
              volume={is_autoplay ? 0 : 1}
              muted={!!is_autoplay}
              width="100%"
              height="100%"
              // height={videoObject.type === 'hosted' ? '100%' : undefined}
            />
          )}
        </ImageWrap>
        <ContentWrap
          fullSize={!!media_fill}
          flipped={!!is_flipped}
          hasBreadscrumbs={!!has_breadcrumbs}>
          {has_breadcrumbs && !!media_fill && <Breadcrumbs />}
          {!!headline && (
            <div css={RichTextEditorStyles}>
              <Headline as={headline_type}>{headline}</Headline>
            </div>
          )}
          <MediaContentCopy
            tw="mb-6"
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />

          {link?.title && (
            <div tw="flex self-start pt-8 w-full lg:(w-auto)">
              <Button to={link.href || '/'}>{link.title}</Button>
            </div>
          )}
          {!!enable_local_cta && <LocalPhoneCta number={frPhone} />}
        </ContentWrap>
      </MediaContentSection>
    </Background>
  )
}

const LocalPhoneCta = ({ number }) => {
  return (
    <>
      {number ? (
        <div tw="flex flex-col self-start justify-center w-full lg:(justify-start w-auto)">
          <Button to={`tel:${formatPhoneLink(number)}`} isBig={false}>
            {formatPhoneLink(number)}
          </Button>
          <h5 tw="ml-2 mt-2 font-semibold">Contact Your Local SERVPRO</h5>
        </div>
      ) : (
        <span tw="h-12 w-64 bg-orange-600 animate-pulse rounded-full" />
      )}
    </>
  )
}

const Background = styled.div(({ hiddenBg }) => [
  !hiddenBg && tw`bg-gray-100 pb-8`
])

const FullWidthMediaContainer = styled.div`
  position: relative;
  display: block;

  &:before {
    content: '';
    display: block;
    padding-top: 57.5%;
  }

  @media (min-width: ${BREAKPOINT_SM}px) {
    &:before {
      padding-top: 56%;
    }
  }

  ${props =>
    !!props.to &&
    css`
      cursor: pointer;
    `};
`

const FullWidthPlayer = styled(ReactPlayer)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const MediaContentSection = styled.section(({ fullSize, flipped }) => [
  tw`relative flex flex-col flex-nowrap mx-auto xl:(flex-row)`,
  fullSize
    ? tw`lg:max-w-full xl:(items-stretch) 2xl:justify-center`
    : tw`lg:max-w-6xl`,
  fullSize &&
    `@media (min-width: 769px) {
      min-height: 613px;
    }`,
  !fullSize &&
    (flipped
      ? tw`flex-col-reverse xl:(flex-row-reverse)`
      : tw`flex-col-reverse xl:(flex-row)`),
  fullSize &&
    (flipped ? tw`flex-col xl:flex-row-reverse` : tw`flex-col xl:flex-row`)
])
const ImageWrap = styled.div`
  ${({ fullSize, flipped, hasBreadscrumbs }) => [
    tw`relative flex flex-col mx-auto lg:(m-0 mr-auto) xl:(w-1/2 flex-shrink-0 m-0)`,
    !fullSize &&
      `@media (min-width: 1025px) {
        max-width: 520px;

        img {
          object-fit: contain;
        }
      }`,
    !fullSize && tw`px-4 pb-4 xl:(px-0 py-8)`,
    !fullSize && !hasBreadscrumbs && tw`xl:my-4`,
    fullSize &&
      `
      height: 260px;
      width: 100%;
      @media (min-width: 769px) {
        height: 400px;
      }
      @media (min-width: 1280px) {
        min-height: 614px;
        height: unset;
        max-width: 720px;
      }`,
    fullSize && tw`lg:(w-full)`,
    fullSize &&
      (flipped
        ? `@media (min-width: 1280px) {
          clip-path: polygon(12% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 50%);
        }
        clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 99%, 0% 85% );`
        : `@media (min-width: 1280px) {
          clip-path: polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%);
        }
        clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 99%, 0% 85% );`),
    `
    video {
      object-fit: cover;
    }
    `
  ]}
`
const MediaImage = styled(SvgSafeGatsbyImage, {
  shouldForwardProp: prop => prop !== 'fullSize'
})(({ fullSize }) => [
  tw`max-h-full w-full
  object-contain object-center`,
  fullSize && tw`h-full`
])

const ContentWrap = styled.div(({ flipped, fullSize, hasBreadscrumbs }) => [
  tw`flex flex-col py-8 z-10 px-4 xs:px-8 xl:(justify-center px-0 w-1/2 max-w-xl)`,
  fullSize && tw`justify-center`,
  !fullSize && hasBreadscrumbs && tw`pt-10`,
  flipped ? tw`xl:(pl-6 pr-24) 2xl:pl-0` : tw`xl:(pr-6 pl-24) 2xl:pr-0`
])

const MediaContentCopy = styled.div`
  ${tw`xl:(text-lg)`}
  p {
    ${tw`text-lg xl:(text-xl)`}
  }

  li {
    ${tw`text-lg xl:(text-xl)`}
  }
  ${({ flipped }) => flipped && `p { ${tw`xl:(pr-0 pl-20)`}}`}

  button {
    ${tw`inline-block relative overflow-hidden border-white whitespace-nowrap pr-10 mb-8 mt-12`}

    &::before {
      width: 46px;
      ${tw`content block absolute right-6 top-0 bottom-0 bg-primary transform rotate-45`}
    }

    &::after {
      width: 46px;
      ${tw`content block absolute right-3 top-0 bottom-0 border-r-4 border-t-4 border-primary transform rotate-45`}
    }

    span {
      ${tw`inline-block relative bg-primary text-white font-semibold text-lg leading-tight rounded-full rounded-r-none pr-7 pl-10 py-3 z-30`}
    }
  }
`

export const query = graphql`
  fragment MediaContentData on CmsPageBuilderBlocks {
    media_content {
      content {
        headline
        headline_type
        copy
        enable_local_cta
        link {
          href
          title
        }
      }
      media {
        external_video_embed
        external_video_embed_mobile
        video {
          filename
          title
          url
        }
        is_autoplay
        image {
          filename
          title
          description
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(
                width: 720
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
      settings {
        has_breadcrumbs
        is_flipped
        media_fill
        media_full_width
        hide_background
      }
    }
  }
`

export default MediaContent
