import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArticleCard from '@sections/ArticleCard'
import Container from '@atoms/Container'
import 'swiper/css/bundle'
import { ReactComponent as IconArrow } from '../../images/svg/arrow.svg'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import { ReactComponent as PointIcon } from '../../images/svg/nav-point.svg'

const BlogrollSlider = ({ data }) => {
  const { heading, articles, spacing } = data
  const buttonPrevRef = React.useRef(null)
  const buttonNextRef = React.useRef(null)
  const swiperInstance = React.useRef(null)

  const [slideIndex, setSlideIndex] = useState(1)

  function handleSlideChange(swiper) {
    setSlideIndex(swiper.realIndex)
  }

  function handlePaginationItemClick(index) {
    swiperInstance.current?.slideTo(index)
  }

  React.useEffect(() => {
    swiperInstance.current.params.navigation.prevEl = buttonPrevRef.current
    swiperInstance.current.params.navigation.nextEl = buttonNextRef.current
    swiperInstance.current.navigation.destroy()
    swiperInstance.current.navigation.init()
    swiperInstance.current.navigation.update()
  }, [])

  function renderPagination() {
    return (
      <div tw="flex space-x-4 py-8 justify-center">
        {articles.map((slide, idx) => {
          return (
            <SliderNavItem
              key={slide.idx}
              onClick={() => handlePaginationItemClick(idx)}
              isActive={slideIndex === idx}>
              <PointIcon />
            </SliderNavItem>
          )
        })}
      </div>
    )
  }

  return (
    <SliderSection css={paddingDefault(spacing)}>
      <Container tw="relative">
        <SliderHeading>{apCaseOnlyTitleTags(heading)}</SliderHeading>
        <MobileList>
          {!!articles &&
            articles.map(article => (
              <ArticleCard article={article} key={article.title} />
            ))}
        </MobileList>
        <SliderWrap>
          <Swiper
            spaceBetween={65}
            slidesPerView={3}
            centeredSlides={true}
            initialSlide={1}
            navigation={{
              prevEl: buttonPrevRef.current,
              nextEl: buttonNextRef.current
            }}
            onBeforeInit={swiper => {
              swiperInstance.current = swiper
            }}
            onSlideChange={handleSlideChange}>
            {!!articles &&
              articles.map((article, index) => (
                <SwiperSlide key={index}>
                  <ArticleCard article={article} key={article.title} />
                </SwiperSlide>
              ))}
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
      </Container>
    </SliderSection>
  )
}

const SliderSection = tw.section``
const SliderHeading = tw.h2`text-center text-3xl mb-12`
const MobileList = tw.ul`flex flex-col space-y-4 lg:hidden`
const SliderWrap = styled.div`
  position: relative;
  ${tw`hidden lg:block -mx-1 px-1`}

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

const Button = styled.button(({ next }) => [
  `position: absolute;
  top: 50%;
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

export default BlogrollSlider
