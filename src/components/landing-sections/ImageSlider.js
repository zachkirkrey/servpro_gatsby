import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BREAKPOINT_SM } from '../../constants/constants'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { ReactComponent as PointIcon } from '../../images/svg/nav-point.svg'
import { ReactComponent as IconArrow } from '../../images/svg/arrow.svg'

const ImageSlider = ({ galleryImages }) => {
  const buttonPrevRef = React.useRef(null)
  const buttonNextRef = React.useRef(null)
  const swiperInstance = React.useRef(null)

  const [slideImageIndex, setImageSlideIndex] = useState(0)
  function handleSlideChange(swiper) {
    setImageSlideIndex(swiper.realIndex)
  }

  function handlePaginationItemClick(index) {
    swiperInstance.current?.slideTo(index)
  }

  useEffect(() => {
    console.info('useEffect', slideImageIndex)
    swiperInstance.current.params.navigation.prevEl = buttonPrevRef.current
    swiperInstance.current.params.navigation.nextEl = buttonNextRef.current
    swiperInstance.current.navigation.destroy()
    swiperInstance.current.navigation.init()
    swiperInstance.current.navigation.update()
  }, [])

  function renderPagination() {
    return (
      <div tw="flex space-x-4 py-8 justify-center">
        {galleryImages.map((slide, idx) => {
          return (
            <SliderNavItem
              key={slide.idx}
              onClick={() => handlePaginationItemClick(idx)}
              isActive={slideImageIndex === idx}>
              <PointIcon />
            </SliderNavItem>
          )
        })}
      </div>
    )
  }
  return (
    <ImageGalleryWrap>
      <SliderWrap>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          centeredSlides={true}
          initialSlide={0}
          navigation={{
            prevEl: buttonPrevRef.current,
            nextEl: buttonNextRef.current
          }}
          onBeforeInit={swiper => {
            swiperInstance.current = swiper
          }}
          onSlideChange={handleSlideChange}>
          {!!galleryImages &&
            galleryImages.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <div tw="w-full h-96 ">
                    <GatsbyImage
                      tw="w-full h-full"
                      objectFit="cover"
                      alt="Gallery Image"
                      image={getImage(image.image)}
                    />
                  </div>
                </SwiperSlide>
              )
            })}
        </Swiper>
        {renderPagination()}
        <div>
          <Button ref={buttonPrevRef}>
            <StyledIconArrow />
          </Button>
          <Button next ref={buttonNextRef}>
            <StyledIconArrow />
          </Button>
        </div>
      </SliderWrap>
    </ImageGalleryWrap>
  )
}

const SliderWrap = styled.div`
  position: relative;

  .swiper-container {
    padding: 30px 10px;
    margin: 0 -10px;
  }

  .swiper-slide {
    transition: transform 0.35s ease-out;
    will-change: transform;
  }

  .swiper-slide-active {
    transform: scale(1.1);
    transition-duration: 0.55s;
  }
`
const ImageGalleryWrap = styled.div`
  position: relative;
  margin: 0 60px;
  @media (min-width: ${BREAKPOINT_SM}px) {
    display: none;
  }
  @media (max-width: ${BREAKPOINT_SM}px) {
    display: block;
  }
`
const Button = styled.button(({ next }) => [
  `position: absolute;
  top: 35%;
  left: -50px;

  @media (min-width: 1281px) {
    left: -70px;
  }`,
  next &&
    `
    left: auto;
    right: -50px;
    transform: scaleX(-1);

    @media (min-width: 1281px) {
      left: auto;
      right: -70px;
    }
  `
])
const StyledIconArrow = styled(IconArrow)`
  fill: #c4c4c4;
`
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

export default ImageSlider
