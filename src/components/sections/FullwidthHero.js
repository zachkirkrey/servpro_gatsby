import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Button from '@atoms/Button'
import Container from '@atoms/Container'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import Nearest from '@blocks/Nearest'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import ChangeLocationDrawer from '@sections/ChangeLocationDrawer'

const FullwidthHero = ({ data, localCtaData, handleChangeLocation }) => {
  const { button_link, copy, image, heading, subheading, has_location_widget } =
    data
  const hasImage = !!image?.url
  const [locationChangeVisible, setLocationChangeVisible] = useState(false)

  return (
    <HeroSection data-cta={!!has_location_widget}>
      {hasImage && (
        <HeroImageBg image={getImage(image.localAsset)} alt={image.title} />
      )}
      <Container>
        <FullwidthWrap hasImage={hasImage} hasCTA={!!has_location_widget}>
          <HeroHeading>{apCaseOnlyTitleTags(heading)}</HeroHeading>
          {subheading && (
            <HeroSubheading>{apCaseOnlyTitleTags(subheading)}</HeroSubheading>
          )}
          <HeroCopy
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />
          {button_link?.title && (
            <div tw="flex justify-center pt-10">
              <Button to={button_link.href}>{button_link.title}</Button>
            </div>
          )}
        </FullwidthWrap>
      </Container>
      {!!has_location_widget && (
        <>
          <NearestWrapper>
            <Nearest
              onChangeLocation={() =>
                setTimeout(() => {
                  setLocationChangeVisible(true)
                }, 0)
              }
              localCtaData={localCtaData}
              handleChangeLocation={handleChangeLocation}
            />
          </NearestWrapper>
          <ChangeLocationDrawer
            visible={locationChangeVisible}
            onClose={() => setLocationChangeVisible(false)}
            localCtaData={localCtaData}
            handleChangeLocation={handleChangeLocation}
          />
        </>
      )}
    </HeroSection>
  )
}

const HeroSection = styled.section`
  padding: 100px 0 73px;
  ${tw`relative`}
`
const HeroImageBg = styled(GatsbyImage)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  img {
    object-position: center center !important;
  }
`
const FullwidthWrap = styled.div(({ hasImage, hasCTA }) => [
  hasImage && tw`text-white`,
  hasCTA && tw`lg:pb-8`
])
const HeroHeading = tw.h1`
  font-light text-center
  text-4xl md:text-5xl lg:text-75px
  max-w-4xl
  mx-auto`
const HeroSubheading = tw.h2`
  font-light text-center
  text-4xl lg:text-52px
  max-w-4xl mt-6 lg:mt-8`
const HeroCopy = tw.div`
  text-center
  text-xl lg:text-2xl
  leading-relaxed tracking-wide
  max-w-2xl
  mx-auto mt-6 lg:mt-8 lg:mb-9`

const NearestWrapper = styled.div`
  ${tw`hidden lg:block absolute z-20 left-1/2 -bottom-40 transform -translate-x-1/2 w-full`}
`

export default FullwidthHero
