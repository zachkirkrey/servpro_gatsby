import React, { useEffect } from 'react'
import tw, { styled, css } from 'twin.macro'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import Button from '@atoms/Button'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import FranchiseSearchInput from '@atoms/FranchiseSearchInput'
import Nearest from '@blocks/Nearest'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import replaceReview from '@utils/replaceReview'
import replaceButton from '@utils/replaceButton'

const SplitHero = ({ data, localCtaData, handleChangeLocation, ...props }) => {
  const {
    button_link,
    button_link_2,
    copy,
    heading,
    subheading,
    image,
    has_location_widget
  } = data

  const copyRef = React.useRef(null)

  useEffect(() => {
    replaceReview(copyRef)
    replaceButton(copyRef)
  }, [])

  return (
    <section
      data-cta={!!has_location_widget}
      className="js-splitHero"
      tw="relative">
      <HeroWrap hasImage={!!image}>
        <HeroCol hasCTA={!!has_location_widget}>
          <HeroHeading
            dangerouslySetInnerHTML={{ __html: apCaseOnlyTitleTags(heading) }}
          />
          {subheading && (
            <HeroSubheading
              dangerouslySetInnerHTML={{
                __html: apCaseOnlyTitleTags(subheading)
              }}
            />
          )}
          <HeroCopy
            ref={copyRef}
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />
          {props.handleSearch && (
            <div tw="mt-8">
              <LocationInputHeadline>
                Find a location near you
              </LocationInputHeadline>
              <FranchiseSearchInput
                className="find-a-location-cta"
                hintClassName="find-a-location-dropdown-cta"
                handleSearch={props.handleSearch}
              />
            </div>
          )}
          {props.children}

          <Buttons>
            {button_link?.title && (
              <div tw="flex self-start pt-10 mr-3 w-full lg:(w-auto)">
                <Button to={button_link.href || '/'}>
                  {button_link.title}
                </Button>
              </div>
            )}
            {button_link_2?.title && (
              <div tw="flex self-start mr-3 pt-10 w-full lg:(w-auto)">
                <Button to={button_link_2.href || '/'}>
                  {button_link_2.title}
                </Button>
              </div>
            )}
          </Buttons>
        </HeroCol>
        <ImageCol>
          <ImageWrap>
            {image?.url && (
              <HeroImage
                tw="w-full h-full"
                image={image}
                alt={image.description}
                sizes="(min-width: 725px) 725px, 100vw"
              />
            )}
          </ImageWrap>
          <ImageDotPattern />
        </ImageCol>
      </HeroWrap>
      {!!has_location_widget && (
        <NearestWrapper>
          <Nearest
            localCtaData={localCtaData}
            handleChangeLocation={handleChangeLocation}
          />
        </NearestWrapper>
      )}
    </section>
  )
}

const LocationInputHeadline = tw.h3`
  text-xl
  text-gray-800 leading-none
  w-full pb-4
`

const HeroWrap = styled.div(({ hasImage }) => [
  tw`flex flex-col-reverse lg:(flex-row justify-between) 2xl:(justify-center max-w-6xl mx-auto)`,
  `@media (min-width: 1025px) {
    max-width: 1440px;
  }`,
  hasImage && tw`text-white`,
  css`
    .phone-link-button {
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

    .reviews-stars {
      ${tw`inline-flex items-center space-x-1 mr-3 mb-8`}
    }

    address {
      ${tw`text-base mt-4`}
    }

    a {
      ${tw`font-semibold`}
    }
  `
])
const HeroCol = styled.div(({ hasCTA }) => [
  `
  @media (min-width: 1024px) {
    width: 60%;
  }`,
  tw`
  relative
  flex flex-col
  lg:(items-start justify-center)
  px-4 py-8
  xs:px-6
  xl:(pr-16 pl-40 py-16)`,
  hasCTA &&
    tw`
  xl:pb-36
  lg:pb-32 `,
  `
  @media (min-width: 1536px) {
    padding-left: 150px;
  }`
])

const Buttons = styled.div`
  ${tw`flex flex-wrap`}
`

const ImageCol = styled.div`
  ${tw`relative`}
  @media (min-width: 1024px) {
    width: 40%;
  }
`

const HeroHeading = styled.h1`
  word-break: break-word;
  ${tw`
  text-gray-800
  text-52px leading-none lg:text-75px
  w-full mb-4`}
`
const HeroSubheading = tw.h2`
  text-4xl lg:text-42px
  text-gray-800 leading-none
  w-full pb-6
`
const HeroCopy = styled.div`
  max-width: 500px;
  ${tw`
  flex flex-col items-start
  text-gray-800 text-lg
  leading-relaxed tracking-wide w-full
  lg:(text-2xl leading-7)`}
  > p:last-child {
    margin-bottom: 0;
  }
`
const ImageWrap = styled.div`
  ${tw`relative w-full h-full mb-6 lg:mb-0`}
  min-height: 300px;
  @media (min-width: 1025px) {
    max-width: 725px;
  }
`
const HeroImage = styled(SvgSafeGatsbyImage)`
  ${tw`absolute w-full h-full top-0 left-0 z-10 object-cover`}

  img {
    object-position: top;
  }
`

const ImageDotPattern = styled.div`
  bottom: -57px;
  left: -50px;
  max-width: 725px;
  z-index: -10;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAjCAYAAADxG9hnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMTowNDoyMyAxNjo1MjozOSf3SngAAABJSURBVFhH7dYxDgAQDIXhciirSzmGS1ldiqWTSCMxIP5veR2apuMTANjkNKdSjU1HyaGYu5aVO17zuGseAQAA36KhjWhowKNEOiStEAsIN9AcAAAAAElFTkSuQmCC');
  ${tw`hidden absolute content lg:block w-full h-full`}
`
const NearestWrapper = styled.div`
  ${tw`hidden lg:block absolute z-20 left-1/2 -bottom-40 transform -translate-x-1/2 w-full`}
  ${tw``}
`

export default SplitHero
