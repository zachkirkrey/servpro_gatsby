import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import SwiperCore, { Navigation } from 'swiper'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import paddingDefault from '@utils/paddingDefault'

import { ReactComponent as TimlinePointIcon } from '../../images/svg/timeline-point.svg'
import { ReactComponent as ArrowTimelineSliderIcon } from '../../images/svg/arrow-timeline-slider.svg'

SwiperCore.use([Navigation])

const TimelineSlider = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [needAutoScrolling, setNeedAutoScrolling] = useState(false)
  const { heading, slides, spacing } = data
  const buttonPrevRef = React.useRef(null)
  const buttonNextRef = React.useRef(null)
  const swiperInstance = React.useRef(null)
  const timelineWrapper = React.useRef(null)

  const updateBehavior = React.useCallback(() => {
    if (!timelineWrapper.current) {
      return
    }
    timelineWrapper.current.style.transform = ''
    const childElements = Array.from(timelineWrapper.current.children)
    const wrapperWidth = timelineWrapper.current.offsetWidth
    const childElementsWidth = childElements.reduce((acc, curr) => {
      if (!curr) {
        return acc
      }
      return acc + curr.offsetWidth
    }, 0)
    setNeedAutoScrolling(childElementsWidth > wrapperWidth)
  }, [])

  const handleResize = React.useCallback(() => {
    updateBehavior()
  }, [updateBehavior])

  React.useEffect(() => {
    setTimeout(() => {
      updateBehavior()
    }, 0)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize, updateBehavior])

  function handleSlideChange(swiper) {
    setSlideIndex(swiper.realIndex)
    updateTimeline(swiper.realIndex)
  }

  function handleTimelineItemClick(index) {
    swiperInstance.current?.slideTo(index + 1)
  }

  function updateTimeline(index) {
    if (!needAutoScrolling) {
      return
    }

    const wrapperWidth = timelineWrapper.current.scrollWidth
    const childsCount = timelineWrapper.current.childElementCount || 1
    const childWidth =
      document.documentElement.clientWidth > 767
        ? wrapperWidth / childsCount + 6
        : wrapperWidth / childsCount + 1
    const multiplier = index > 0 ? index - 1 : 0
    let maxMultiplier = childsCount - 3

    if (document.documentElement.clientWidth > 767) {
      maxMultiplier = childsCount - 5
    }

    if (document.documentElement.clientWidth > 1279) {
      maxMultiplier = childsCount - 9
    }

    timelineWrapper.current.style.transform = `translateX(-${
      childWidth * Math.min(multiplier, maxMultiplier)
    }px)`
  }

  return (
    <SliderSection css={paddingDefault(spacing)}>
      <Container>
        <SliderHeading>{apCaseOnlyTitleTags(heading)}</SliderHeading>

        <div tw="flex justify-between items-end mb-9">
          <button tw="relative -bottom-1" ref={buttonPrevRef}>
            <ArrowTimelineSliderIcon />
          </button>
          <TimelineNav>
            <TimelineWrapper ref={timelineWrapper} id="timeline-wrapper">
              {slides.map((slide, index) => (
                <TimelineNavItem
                  key={slide.year}
                  onClick={() => handleTimelineItemClick(index)}>
                  <NavYear isActive={slideIndex === index}>
                    <span>{slide.year}</span>
                  </NavYear>
                  <NavPoint isActive={slideIndex === index}>
                    <TimlinePointIcon />
                  </NavPoint>
                </TimelineNavItem>
              ))}
            </TimelineWrapper>
          </TimelineNav>
          <button
            tw="relative -bottom-1 transform rotate-180 ml-3 md:ml-5 lg:ml-0"
            ref={buttonNextRef}>
            <ArrowTimelineSliderIcon />
          </button>
        </div>

        <Swiper
          slidesPerView={1}
          speed={500}
          loop
          navigation={{
            prevEl: buttonPrevRef.current,
            nextEl: buttonNextRef.current
          }}
          onBeforeInit={swiper => {
            swiperInstance.current = swiper
            swiper.params.navigation.prevEl = buttonPrevRef.current
            swiper.params.navigation.nextEl = buttonNextRef.current
          }}
          onSlideChange={handleSlideChange}>
          {slides.map(slide => {
            const { copy, heading: slideHeading, image, year } = slide

            return (
              <SwiperSlide key={year}>
                <SlideContent>
                  <SlideCopyWrap>
                    <SlideYear>{year}</SlideYear>
                    <SlideHeading>{slideHeading}</SlideHeading>
                    <SlideCopy>{copy}</SlideCopy>
                  </SlideCopyWrap>
                  {image?.url && (
                    <SlideMediaWrap>
                      <SlideImageContainer>
                        {image?.url && (
                          <div tw="absolute inset-0">
                            <SlideImage image={image} alt={image.title} />
                          </div>
                        )}
                      </SlideImageContainer>
                      <SlideImagePattern />
                    </SlideMediaWrap>
                  )}
                </SlideContent>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Container>
    </SliderSection>
  )
}

const SliderSection = tw.section``
const SliderHeading = tw.h2`text-3xl mb-9 text-4xl md:(mb-24 pl-12)`

const TimelineNav = styled.div`
  overflow: hidden;
  max-width: 210px;
  ${tw`md:max-w-xl lg:max-w-3xl xl:max-w-full`}
`
const TimelineWrapper = styled.ul`
  ${tw`flex flex-row gap-2`}
  transition: transform 0.5s ease-out;
  will-change: transform;
`
const TimelineNavItem = styled.li`
  ${tw`md:pr-5`}

  &:not(:last-child) {
    &::before {
      bottom: 12px;
      left: 42px;
      height: 2px;
      ${tw`block content bg-primary absolute w-14 md:w-28 z-0`}
      @media (max-width: 767px) {
        left: 20px;
        ${tw`w-20`}
      }
    }
  }
  ${tw`relative flex flex-col items-center justify-between z-10`}
`
const NavYear = styled.div(({ isActive }) => [
  tw`flex items-end justify-center w-16 h-7 cursor-pointer mb-3`,
  isActive && tw`font-bold text-2xl`
])
const NavPoint = styled.div(({ isActive }) => [
  `svg {fill: white}`,
  tw`w-6 bg-white block pb-px cursor-pointer z-10`,
  isActive && `svg {fill: #FF6600}`
])

const SlideContent = tw.div`flex flex-col justify-between pb-9 md:(pl-12 pr-2) lg:(items-center flex-row)`
const SlideCol = tw.div`flex`

const SlideCopyWrap = tw(
  SlideCol
)`flex-col justify-center mb-10 lg:(py-8 w-2/5 mb-0)`
const SlideYear = tw.h3`text-32px mb-4`
const SlideHeading = tw.h3`text-26px text-primary mb-4`
const SlideCopy = tw.p`text-xl leading-snug tracking-wide max-w-md`

const SlideMediaWrap = styled(SlideCol)`
  max-width: 520px;
  max-height: 390px;
  ${tw`w-full relative self-center lg:self-auto`}
`
const SlideImageContainer = styled.div`
  &:before {
    display: block;
    padding-top: 75%;
    content: '';
  }
  ${tw`relative w-full`}
`
const SlideImage = styled(SvgSafeGatsbyImage)`
  ${tw`absolute left-0 top-0 object-cover w-full h-full z-10`}
`
const SlideImagePattern = styled.div`
  max-width: 495px;
  max-height: 390px;

  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMTowNDoyMCAxNToxNjo1OKaXTWEAAAAiSURBVDhPYxgFpIP/aQz/oUycgBg1o2AUUAWMJkg0wMAAANdgCZF7Qp8qAAAAAElFTkSuQmCC');
  ${tw`absolute w-full h-full z-0 -bottom-9 md:(-left-12)`}
`

export default TimelineSlider
