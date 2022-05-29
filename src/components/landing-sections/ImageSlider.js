import React from 'react'
import tw, { styled } from 'twin.macro'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BREAKPOINT_SM } from '../../constants/constants'
import { Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'

const ImageSlider = ({ galleryImages }) => {
  return (
    <ImageGalleryWrap>
      <SliderWrap>
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={swiper => console.info(swiper)}
          onSlideChange={() => console.info('slide change')}>
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
      </SliderWrap>
    </ImageGalleryWrap>
  )
}

const SliderWrap = styled.div`
  position: relative;
  @media (min-width: ${BREAKPOINT_SM}px) {
    display: none;
  }
  @media (max-width: ${BREAKPOINT_SM}px) {
    display: block;
  }
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
  .swiper-button-next,
  .swiper-button-prev {
    color: #c4c4c4;
  }
`
const ImageGalleryWrap = styled.div`
  position: relative;
  margin: 0 30px;
`

export default ImageSlider
