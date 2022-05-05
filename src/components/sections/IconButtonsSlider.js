import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled } from 'twin.macro'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import Container from '@atoms/Container'
import { ReactComponent as DoubleArrowIcon } from '../../images/svg/double-arrow.svg'
import { ReactComponent as TripleArrowIcon } from '../../images/svg/triple-arrow.svg'
import paddingDefault from '@utils/paddingDefault'

// TODO: Get animation data from CMS
// import AnimatedIcon from '@atoms/AnimatedIcon'
// import waterIcon from '../../images/icons/water_black_stroke.json'

const IconButtonsSlider = ({ data }) => {
  const { slides, spacing } = data
  /* eslint-disable-next-line no-unused-vars */
  const buttonPrevRef = React.useRef(null)
  const buttonNextRef = React.useRef(null)
  const swiperInstance = React.useRef(null)

  React.useEffect(() => {
    swiperInstance.current.params.navigation.prevEl = buttonPrevRef.current
    swiperInstance.current.params.navigation.nextEl = buttonNextRef.current
    swiperInstance.current.navigation.destroy()
    swiperInstance.current.navigation.init()
  }, [])

  const slidesSortedMobile = React.useMemo(() => {
    return [...slides].sort((a, b) => {
      return a.sort - b.sort
    })
  }, [slides])

  const slidesSortedDesktop = React.useMemo(() => {
    const endSlice = slidesSortedMobile.slice(1, 3)
    return [slidesSortedMobile[0], ...slidesSortedMobile.slice(3), ...endSlice]
  }, [slidesSortedMobile])

  return (
    <StyledSection css={paddingDefault(spacing)}>
      <Container>
        <div tw="block shadow-md bg-white py-8 lg:hidden">
          <div tw="grid grid-cols-2 gap-y-2 mb-4">
            {slidesSortedMobile.map(slide => {
              const { label, link, icon } = slide

              return (
                <MobileSliderItem key={label}>
                  <AccessibleLink to={link.href}>
                    <div tw="flex items-center justify-center max-h-14 mx-auto mb-2">
                      {icon?.url && (
                        <StyledGatsbyImage image={icon} alt={icon.title} />
                      )}
                    </div>
                    <p tw="text-center text-primary-black text-lg mb-3 xl:font-semibold">
                      {label}
                    </p>
                  </AccessibleLink>
                </MobileSliderItem>
              )
            })}
          </div>
        </div>
        <div tw="hidden lg:(flex items-center relative)">
          <DecorWrapper>
            <Decor />
          </DecorWrapper>
          <button
            tw="flex flex-col justify-center items-center text-xs text-gray-400 ml-2 mr-8 mb-10 relative"
            ref={buttonPrevRef}>
            <DoubleArrowIcon tw="mb-2" />
            <ButtonText>Previous</ButtonText>
          </button>
          <StyledSwiper
            centeredSlides
            slidesPerView={5}
            spaceBetween={2}
            loop
            onBeforeInit={swiper => {
              swiperInstance.current = swiper
            }}>
            {slidesSortedDesktop.map(slide => {
              const { label, link, icon } = slide

              return (
                <SwiperSlide key={label}>
                  <AccessibleLink to={link.href} tw="block pt-12 pb-4">
                    <div tw="h-full" key={label}>
                      <div tw="flex items-center justify-center mx-auto mb-4">
                        {/* TODO: Get animation data from CMS */}
                        {/* <AnimatedIcon animationData={waterIcon} /> */}
                        {icon?.url && (
                          <StyledGatsbyImage image={icon} alt={icon.title} />
                        )}
                      </div>
                      <p tw="text-center font-semibold mb-3">{label}</p>
                      <div tw="flex justify-center">
                        <TripleArrowIcon tw="opacity-0 transition-opacity" />
                      </div>
                    </div>
                  </AccessibleLink>
                </SwiperSlide>
              )
            })}
          </StyledSwiper>

          <button
            className="hover-default"
            tw="flex flex-col justify-center items-center text-xs text-gray-400 mr-2 ml-8 mb-10 relative"
            ref={buttonNextRef}>
            <DoubleArrowIcon tw="mb-2 transform rotate-180" />
          </button>
        </div>
      </Container>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  ${tw`py-4 relative lg:(m-0 pt-0 z-10)`}
`
const DecorWrapper = styled.div`
  left: 72px;
  right: 72px;
  max-width: 955px;
  ${tw`absolute top-4 mx-auto flex justify-center`}
  pointer-events: none;
`
const Decor = styled.div`
  height: 189px;
  ${tw`relative z-30 w-1/5`}
  &:before {
    clip-path: polygon(0% 30%, 100% 30%, 50% 100%);
    height: 58px;
    ${tw`content block absolute -bottom-10 bg-white w-full z-20`}
  }
  &:after {
    aspect-ratio: 1;
    clip-path: polygon(0% 76%, 50% 95%, 100% 76%, 100% 79%, 50% 98%, 0% 79%);
    bottom: -46px;
    ${tw`content block absolute top-auto bg-primary w-full h-full z-20`}
  }
`
const StyledSwiper = styled(Swiper)`
  max-width: 955px;
  ${tw`relative pt-5 pb-14`}
  &:before {
    position: absolute;
    z-index: 0;
    bottom: 56px;
    display: block;
    background-color: white;
    content: '';
    ${tw`left-0 right-0 top-5`}
  }

  & .swiper-slide-next {
    &:after {
      width: 1px;
      ${tw`content block absolute top-10 right-0 h-24 bg-gray-300`}
    }
  }

  & .swiper-slide-prev {
    &:after {
      width: 1px;
      ${tw`content block absolute top-10 left-0 h-24 bg-gray-300`}
    }
  }

  & .swiper-slide {
    height: 189px;
    ${tw`relative transition-transform bg-white text-primary-black`}
  }

  & .swiper-slide-active {
    transform: translateY(-4px);
    box-shadow: 0px 0px 9px 0 rgba(0, 0, 0, 0.16);
    ${tw`z-20 text-primary`};
    svg {
      opacity: 1;
    }

    &::after {
      ${tw`content block absolute w-full h-2 -bottom-1 bg-white z-20`}
    }
  }
`
const StyledGatsbyImage = styled(SvgSafeGatsbyImage)`
  max-width: 4rem;
  ${tw`max-h-16 object-cover object-center`}
`
const MobileSliderItem = styled.div`
  ${tw`relative`}
  &:nth-of-type(odd):after {
    width: 1px;
    ${tw`content block absolute top-2 right-0 h-16 bg-gray-300`}
  }
`
const ButtonText = styled.span`
  letter-spacing: 0.17px;
  ${tw`absolute left-1/2 -bottom-4 transform -translate-x-1/2 whitespace-nowrap`}
`

export default IconButtonsSlider
