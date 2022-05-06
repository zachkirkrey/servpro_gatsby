import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import 'swiper/css/bundle'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import { ReactComponent as ArrowIcon } from '../../images/svg/arrow.svg'
import { ReactComponent as PointIcon } from '../../images/svg/nav-point.svg'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const MediaShowcaseSlider = ({ data }) => {
  SwiperCore.use([Navigation])
  const { heading, slides, spacing } = data
  const [slideIndex, setSlideIndex] = useState(0)
  const buttonPrevRef = React.useRef(null)
  const buttonNextRef = React.useRef(null)
  const swiperInstance = React.useRef(null)

  function handleSlideChange(swiper) {
    setSlideIndex(swiper.realIndex)
  }

  function handleShowcaseItemClick(index) {
    swiperInstance.current?.slideTo(index + 1)
  }

  return (
    <div tw="relative" css={paddingDefault(spacing)}>
      <Container>
        <h2 tw="text-32px text-center leading-none mb-9 lg:mb-16">
          {apCaseOnlyTitleTags(heading)}
        </h2>
      </Container>
      <div tw="relative">
        <Container tw="hidden lg:(block absolute inset-0 z-20 pointer-events-none)">
          <div tw="absolute bottom-1/2 -right-16 -left-16 flex justify-between items-center">
            <button tw="pointer-events-auto" ref={buttonPrevRef}>
              <ArrowIcon />
            </button>
            <button tw="pointer-events-auto" ref={buttonNextRef}>
              <ArrowIcon tw="transform rotate-180" />
            </button>
          </div>
        </Container>
        <Swiper
          tw="z-10 lg:(max-w-6xl mx-auto)"
          spaceBetween={20}
          slidesPerView={1}
          loop
          onBeforeInit={swiper => {
            swiperInstance.current = swiper
            swiper.params.navigation.prevEl = buttonPrevRef.current
            swiper.params.navigation.nextEl = buttonNextRef.current
          }}
          onSlideChange={handleSlideChange}>
          {slides.map((slide, id) => {
            const { heading: slideHeading, copy, image, video } = slide

            return (
              <SwiperSlide key={id}>
                <div tw="relative" key={slide.heading}>
                  <div tw="xl:(max-w-6xl mx-auto)">
                    <MediaWrap>
                      {video?.url && (
                        <video className="media" controls>
                          <source src={video?.url} type="video/mp4" />
                        </video>
                      )}
                      {image?.url && (
                        <SvgSafeGatsbyImage
                          image={image}
                          alt={image.description}
                          className="media"
                        />
                      )}
                    </MediaWrap>
                  </div>
                  <Container>
                    <h3 tw="font-semibold mb-3">{slideHeading}</h3>
                    <p tw="max-w-xl">{copy}</p>
                  </Container>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Container tw="absolute pointer-events-none z-30 inset-0 left-4 xs:left-8 lg:left-0">
          <SliderNavContainer>
            <div tw="flex space-x-4 py-2 lg:justify-center pointer-events-auto">
              {slides.map((slide, idx) => {
                return (
                  <SliderNavItem
                    key={slide.idx}
                    onClick={() => handleShowcaseItemClick(idx)}
                    isActive={slideIndex === idx}>
                    <PointIcon />
                  </SliderNavItem>
                )
              })}
            </div>
          </SliderNavContainer>
        </Container>
      </div>
    </div>
  )
}

const SliderNavContainer = styled.ul`
  ${tw`absolute top-0 left-0 w-full py-5`}

  &::before {
    pointer-events: none;
    content: '';
    display: block;
    padding-top: 56%;
  }
`
const SliderNavItem = styled.li(({ isActive }) => [
  `cursor: pointer`,
  isActive
    ? `svg {
      fill: #FF6600;
    }`
    : `svg {
      fill: #C4C4C4;
    }`
])
const MediaWrap = styled.div`
  ${tw`relative mb-10`}
  &::before {
    content: '';
    display: block;
    padding-top: 56%;
  }
  & .media {
    ${tw`absolute top-0 left-0 w-full h-full object-cover`}
  }
`

export default MediaShowcaseSlider
