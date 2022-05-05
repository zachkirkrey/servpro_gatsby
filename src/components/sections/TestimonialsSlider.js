import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { ReactComponent as ArrowIcon } from '../../images/svg/arrow.svg'
import { ReactComponent as NavSliderIcon } from '../../images/svg/nav-slider-point.svg'
import paddingDefault from '@utils/paddingDefault'

const TestimonialsSlider = ({ data }) => {
  const { slides, spacing } = data
  const [slideIndex, setSlideIndex] = useState(0)
  const buttonPrevRef = React.useRef(null)
  const buttonNextRef = React.useRef(null)
  const swiperInstance = React.useRef(null)

  function handleSlideChange(swiper) {
    setSlideIndex(swiper.realIndex)
  }

  function handleTestimonialsItemClick(index) {
    swiperInstance.current?.slideTo(index + 1)
  }

  return (
    <SliderSection css={paddingDefault(spacing)}>
      <Container tw="relative">
        <div tw="absolute top-1/2 left-2 right-2 flex justify-between items-center transform -translate-y-1/2 xl:(-left-7 -right-7)">
          <button ref={buttonPrevRef}>
            <StyledArrowIcon />
          </button>
          <button ref={buttonNextRef}>
            <StyledArrowIcon tw="transform rotate-180" />
          </button>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
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
          {slides.map((slide, index) => {
            const {
              author_name: fullName,
              author_company: job,
              image,
              quote
            } = slide
            return (
              <SwiperSlide key={index}>
                <SlideContent>
                  <QuoteWrap hasImage={!!image}>
                    <AuthorName>{fullName}</AuthorName>
                    <AuthorTitle>{job}</AuthorTitle>
                    <QuoteText>{quote}</QuoteText>
                  </QuoteWrap>
                </SlideContent>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <TestimonialsNav>
          {slides.map((slide, index) => {
            return (
              <TestimonialsNavItem
                isActive={slideIndex === index}
                key={index}
                onClick={() => handleTestimonialsItemClick(index)}>
                <NavSliderIcon />
              </TestimonialsNavItem>
            )
          })}
        </TestimonialsNav>
      </Container>
    </SliderSection>
  )
}

const SliderSection = tw.section``
const SlideContent = styled.div`
  ${tw`flex flex-col mx-auto px-2 md:(flex-row justify-around max-w-full) lg:(px-16 pt-10 pb-5)`}
`

const QuoteWrap = styled.div(({ hasImage }) => [
  tw`md:(w-2/3 mr-9 pt-6)`,
  !hasImage && tw`md:(w-full mr-0)`
])
const AuthorName = tw.p`
  text-warmGray-600 text-sm
  tracking-wider
  mb-2`
const AuthorTitle = tw.p`
  text-warmGray-600 text-sm
  mb-2 md:(mb-8)`
const QuoteText = tw.p`text-primary leading-snug text-2xl mb-10 md:(pb-5 mb-0) lg:(text-28px)`

const TestimonialsNav = styled.ul`
  ${tw`flex absolute -bottom-10 left-24 space-x-5 z-10 md:(bottom-3)`}
`
const TestimonialsNavItem = styled.li(({ isActive }) => [
  tw`cursor-pointer`,
  `width: 12.7px;
  height: 11.5px;`,
  `@media (max-width: 441px) {
    width: 19px;
    height: 17px;
  }`,
  `svg {fill: #C4C4C4}`,
  isActive && `svg { fill: #FF6600}`
])
const StyledArrowIcon = styled(ArrowIcon)`
  fill: #c4c4c4;

  @media (max-width: 1024px) {
    max-width: 15px;
  }
`

export default TestimonialsSlider
