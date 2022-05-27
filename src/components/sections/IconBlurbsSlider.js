import React, { useState } from 'react'
import tw, { styled, css } from 'twin.macro'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import 'swiper/css/bundle'

import Container from '@atoms/Container'
import AccessibleLink from '@atoms/AccessibleLink'
import Button from '@atoms/Button'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'

import { ReactComponent as ArrowIcon } from '../../images/svg/arrow.svg'
import { ReactComponent as PointIcon } from '../../images/svg/nav-point.svg'
import { BREAKPOINT_MD, BREAKPOINT_SM } from '../../constants/constants'
import CollapsibleText from '../atoms/CollapsibleText'
import isBrowser from '../utils/is-browser'

const IconBlurbsSlider = ({ data }) => {
  const { heading, sub_headline, settings, slides, spacing } = data
  const { dark_mode, icon_on_left, number_of_slides } = settings

  SwiperCore.use([Navigation])

  const buttonPrevRef = React.useRef(null)
  const buttonNextRef = React.useRef(null)
  const swiperInstance = React.useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)

  React.useEffect(() => {
    swiperInstance.current.params.navigation.prevEl = buttonPrevRef.current
    swiperInstance.current.params.navigation.nextEl = buttonNextRef.current
    swiperInstance.current.navigation.destroy()
    swiperInstance.current.navigation.init()
  }, [])

  function handleSlideChange(swiper) {
    setSlideIndex(swiper.realIndex)
  }

  const onBeforeInit = swiper => {
    swiperInstance.current = swiper
  }

  const slidesPerViewDesktop = number_of_slides || 3

  const breakpoints = {
    [BREAKPOINT_SM]: {
      slidesPerView: 'auto',
      centeredSlides: false,
      scrollEnabled: true,
      loop: false,
      spaceBetween: 40
    },
    [BREAKPOINT_MD]: {
      slidesPerView: slidesPerViewDesktop,
      slidesPerGroup: slidesPerViewDesktop,
      centeredSlides: slidesPerViewDesktop === 1,
      loop: false,
      spaceBetween: 90
    }
  }

  const navigation = {
    prevEl: buttonPrevRef.current,
    nextEl: buttonNextRef.current
  }

  const isDesktop = React.useMemo(() => {
    if (!isBrowser()) {
      return undefined
    }
    return window.innerWidth > BREAKPOINT_MD
  }, [])

  function renderHeading() {
    if (!heading) {
      return null
    }

    return dark_mode ? (
      <h2 tw="text-primary text-32px lg:(text-36px)">
        {apCaseOnlyTitleTags(heading)}
      </h2>
    ) : (
      <h2 tw="text-32px text-primary-black">{apCaseOnlyTitleTags(heading)}</h2>
    )
  }
  //sub heading was not being shown, without any reason might be some editor issue,
  //after reading and debugging code, i just moved the code block renderHeading and it worked

  function renderLink(link, link_as_text) {
    if (!link || !link.title) {
      return null
    }

    let innerJsx

    if (link_as_text) {
      innerJsx = (
        <AccessibleLink
          className="hover-default"
          tw="text-primary"
          small
          to={link.href}>
          {link.title}
        </AccessibleLink>
      )
    } else {
      innerJsx = (
        <Button small to={link.href}>
          {link.title}
        </Button>
      )
    }

    return <div tw="flex justify-start mt-3">{innerJsx}</div>
  }

  function handlePaginationItemClick(index) {
    swiperInstance.current?.slideTo(index)
  }

  function renderPagination() {
    const pagesTotal = isDesktop
      ? Math.ceil(slides.length / slidesPerViewDesktop)
      : slides.length
    function getCurrentPageIndex() {
      if (!isDesktop) {
        return slideIndex
      }
      return slides.length - (slideIndex + 1) < slidesPerViewDesktop
        ? pagesTotal - 1
        : Math.round((slideIndex / slides.length) * pagesTotal)
    }
    const currentPage = getCurrentPageIndex()
    return (
      <PaginationContainer tw="flex justify-center items-center">
        <SliderButton ref={buttonPrevRef} darkMode={!!dark_mode}>
          <StyledArrowIcon />
        </SliderButton>
        <div tw="flex space-x-4 py-8 justify-center items-center">
          {[...Array(pagesTotal)].map((_, index) => {
            return (
              <SliderNavItem
                key={index}
                onClick={() =>
                  handlePaginationItemClick(
                    isDesktop ? index * slidesPerViewDesktop : index
                  )
                }
                isActive={currentPage === index}>
                <PointIcon />
              </SliderNavItem>
            )
          })}
        </div>
        <SliderButton next ref={buttonNextRef} darkMode={!!dark_mode}>
          <StyledArrowIcon tw="transform rotate-180" />
        </SliderButton>
      </PaginationContainer>
    )
  }

  const swiperOptions = {
    grabCursor: true,
    navigation,
    onBeforeInit,
    breakpoints,
    slidesPerView: 'auto',
    centeredSlides: false,
    scrollEnabled: true,
    loop: false,
    spaceBetween: 30,
    onSlideChange: handleSlideChange
  }

  return (
    <IconBlurbsSliderSection
      darkMode={!!dark_mode}
      css={paddingDefault(spacing)}>
      <Container tw="relative pt-1">
        {(heading || sub_headline) && (
          <Header darkMode={dark_mode}>
            {renderHeading()}
            {!!sub_headline && (
              <SubHeadline
                tw="text-xl mt-1"
                css={RichTextEditorStyles}
                darkMode={dark_mode}
                dangerouslySetInnerHTML={{
                  __html: apCaseOnlyTitleTags(sub_headline)
                }}
              />
            )}
          </Header>
        )}

        <SliderContainer tw="relative">
          {dark_mode ? (
            <div>
              <DarkSlider {...swiperOptions}>
                {slides.map((slide, index) => {
                  const {
                    copy,
                    heading: slideHeading,
                    icon,
                    link,
                    link_as_text
                  } = slide

                  return (
                    <SwiperSlide key={index}>
                      <Blurb tw="text-white" iconLeft={!!icon_on_left}>
                        {!!icon?.url && (
                          <BlurbIconWrapper iconLeft={!!icon_on_left}>
                            <SvgSafeGatsbyImage image={icon} alt={icon.title} />
                          </BlurbIconWrapper>
                        )}
                        <div tw="flex-col justify-center text-xl leading-6">
                          <h3
                            tw="font-semibold text-white pt-1 mb-2"
                            dangerouslySetInnerHTML={{
                              __html: slideHeading
                            }}
                          />
                          <div css={RichTextEditorStyles}>
                            <CollapsibleText
                              maxLength={slidesPerViewDesktop > 1 ? 180 : 350}>
                              {copy}
                            </CollapsibleText>
                          </div>
                          {renderLink(link, link_as_text)}
                        </div>
                      </Blurb>
                    </SwiperSlide>
                  )
                })}
              </DarkSlider>
              {renderPagination()}
            </div>
          ) : (
            <div>
              <LightSlider
                loop={false}
                slideVisibleClass="swiper-slide-visible"
                {...swiperOptions}>
                {slides.map((slide, index) => {
                  const {
                    copy,
                    heading: slideHeading,
                    icon,
                    link,
                    link_as_text
                  } = slide

                  return (
                    <SwiperSlide key={index}>
                      <Blurb iconLeft={!!icon_on_left}>
                        {!!icon?.url && (
                          <BlurbIconWrapper iconLeft={!!icon_on_left}>
                            <SvgSafeGatsbyImage image={icon} alt={icon.title} />
                          </BlurbIconWrapper>
                        )}
                        <LightSlideContent>
                          <h3
                            tw="font-semibold text-lg pt-1 mb-2"
                            dangerouslySetInnerHTML={{ __html: slideHeading }}
                          />
                          <div css={RichTextEditorStyles}>
                            <CollapsibleText
                              maxLength={slidesPerViewDesktop > 1 ? 100 : 320}
                              collapsingDisabled={!!link}>
                              {copy}
                            </CollapsibleText>
                          </div>
                          {renderLink(link, link_as_text)}
                        </LightSlideContent>
                      </Blurb>
                    </SwiperSlide>
                  )
                })}
              </LightSlider>
              {renderPagination()}
            </div>
          )}
          <GradientLeft darkMode={!!dark_mode} />
          <GradientRight darkMode={!!dark_mode} />
        </SliderContainer>
      </Container>
    </IconBlurbsSliderSection>
  )
}

const IconBlurbsSliderSection = styled.section`
  .swiper,
  .swiper-container {
    overflow: visible;
    user-select: none;
  }

  .swiper-slide {
    height: auto;
    width: 72vw;

    @media (min-width: ${BREAKPOINT_MD}px) {
      width: auto;
    }
  }

  ${props => props.darkMode && tw`bg-primary-black`};
`

const GradientBase = styled.div`
  position: absolute;
  top: 0;
  width: 30vw;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) -30%,
    #fff 50%,
    #fff
  );
  z-index: 10;
  pointer-events: none;
  user-select: none;

  ${props =>
    props.darkMode &&
    css`
      background-image: linear-gradient(
        to right,
        rgba(43, 59, 72, 0) -30%,
        #2b3b48 50%,
        #2b3b48
      );
    `};
`

const GradientLeft = styled(GradientBase)`
  display: none;

  @media (min-width: ${BREAKPOINT_MD}px) {
    display: block;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) -30%,
      #fff 50%,
      #fff
    );

    ${props =>
      props.darkMode &&
      css`
        background-image: linear-gradient(
          to left,
          rgba(43, 59, 72, 0) -30%,
          #2b3b48 50%,
          #2b3b48
        );
      `};
  }
`

const GradientRight = styled(GradientBase)`
  transform: none;
  right: -24px;
  width: 30vw;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);

  ${props =>
    props.darkMode &&
    css`
      background-image: linear-gradient(to right, rgba(43, 59, 72, 0), #2b3b48);
    `};

  @media (min-width: ${BREAKPOINT_MD}px) {
    right: auto;
    left: 100%;

    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      #fff 50%,
      #fff
    );

    ${props =>
      props.darkMode &&
      css`
        background-image: linear-gradient(
          to right,
          rgba(43, 59, 72, 0),
          #2b3b48 50%,
          #2b3b48
        );
      `};
  }
`

const Header = styled.div`
  ${tw`mb-8`}

  ${props =>
    props.darkMode &&
    css`
      ${tw`mb-8`}
    `};
`
const SubHeadline = styled.div`
  ${props =>
    props.darkMode &&
    css`
      ${tw`text-white`}
    `};
`

const Blurb = styled.div(({ iconLeft }) => [
  iconLeft && tw`flex flex-col md:flex-row`,
  !iconLeft && tw`flex flex-col`
])

const BlurbIconWrapper = styled.div(({ iconLeft }) => [
  iconLeft && `max-width: 40px;`,
  iconLeft && tw`mb-2 w-11 md:mr-8 flex-shrink-0`,
  !iconLeft && tw`mb-1 w-10`
])

const SliderContainer = styled.div``

const DarkSlider = styled(Swiper)``

const LightSlider = styled(Swiper)`
  & .swiper-slide {
    &:first-of-type {
      &:before {
        display: none;
      }
    }

    &:before {
      left: -35px;
      width: 1px;
      ${tw`lg:content block absolute top-0 bottom-0 bg-gray-300 h-full`}
    }
  }
`

const LightSlideContent = styled.div`
  ${tw`flex-col justify-center leading-tight w-full`}
`

const PaginationContainer = styled.div`
  position: relative;
  z-index: 100;
`

const SliderButton = styled.button(({ next }) => [
  `
  position: relative;
  width: 35px;
  height: 35px;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  svg {
    position: relative;
    z-index: 10;
    width: 13px;
    height: 13px;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 25px;
    height: 25px;
    background-color: #ff6600;
    border-radius: 30px;
    transform: translate(-50%, -50%);
    content: '';
  }
`,
  tw`hidden md:flex`,
  next && tw`mr-0 ml-10`,
  !next && tw`ml-0 mr-10`
])
const SliderNavItem = styled.li(({ isActive }) => [
  `cursor: pointer;
  padding: 5px;
  list-style: none;`,
  isActive
    ? `svg {
      fill: #FF6600;
    }`
    : `svg {
      fill: #C4C4C4;
    }`
])
const StyledArrowIcon = styled(ArrowIcon)`
  fill: white;
`

export default IconBlurbsSlider
