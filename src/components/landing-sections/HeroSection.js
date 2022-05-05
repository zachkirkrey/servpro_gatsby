import React from 'react'
import tw, { styled } from 'twin.macro'
import gsap, { Power0, Power1 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useInView } from 'react-intersection-observer'

import { useLocator } from '@hooks/use-locator'
import formatPhoneLink from '@utils/format-phone-link'
import Button from '@atoms/Button'
import BoxedText from '@landing-sections/BoxedText'
import ContainerAlt from '@landing-sections/ContainerAlt'
import LandingSection from '@landing-sections/LandingSection'
import TextAnimation from '@landing-sections/TextAnimation'
import { usePanelScrollingAnimationLogic } from '../../hooks/use-panel-scrolling-animation-logic'
import { useAnimatedElementsRefs } from '../../hooks/use-animated-elements-refs'
import { BREAKPOINT_MD, PHONE_NUMBER } from '../../constants/constants'
import { useResponsive } from '../atoms/Responsive'
import { defaultShowAnimation } from '../utils/defaultAnimations'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  const numbers = '402 37 22 651'
  const containerRef = React.useRef(null)
  const [inViewRef, inView] = useInView()
  const animatedElements = useAnimatedElementsRefs(containerRef)
  /** @type React.MutableRefObject<null | HTMLVideoElement> */
  const videoRef = React.useRef(null)
  const scrollerRef = React.useRef(null)
  const videoDecrement = React.useRef(0.5)
  const [scrollIsLocked, setScrollIsLocked] = React.useState(true)
  const responsiveContext = useResponsive()
  const floatingElementsRef = React.useRef(null)
  const floatingElementsScrollY = React.useRef(0)
  const arrowRef = React.useRef(null)
  const [isInitialAnimationShown, setIsInitialAnimationShown] =
    React.useState(false)

  const { franchise } = useLocator()
  const { yext } = franchise ?? {}
  const { mainPhone: frPhone } = yext ? yext : { mainPhone: PHONE_NUMBER }

  React.useEffect(() => {
    const tl = gsap.timeline({ delay: 0.7, repeat: 2 })
    tl.to(
      arrowRef.current,
      {
        duration: 0.25,
        y: 10,
        ease: Power1.easeOut
      },
      0.2
    )
    tl.to(arrowRef.current, { duration: 0.25, y: 0, ease: Power1.easeIn })
  }, [])

  React.useEffect(() => {
    floatingElementsRef.current = containerRef.current.querySelectorAll(
      '[data-floating-element]'
    )
  }, [])

  React.useEffect(() => {
    if (videoRef.current?.paused && responsiveContext.isDesktop) {
      videoRef.current?.play()
    }
  }, [])

  React.useEffect(() => {
    scrollerRef.current = document.querySelector('[data-scroller]')
  }, [])

  const scrollHandler = React.useCallback(() => {
    if (scrollerRef.current.scrollTop === 0 && responsiveContext.isDesktop) {
      setScrollIsLocked(true)
    }
  }, [])

  const wheelHandler = React.useCallback(
    // eslint-disable-next-line consistent-return
    event => {
      if (!responsiveContext.isDesktop) {
        return
      }
      const value = event.wheelDelta || -event.deltaY || -event.detail
      const delta = Math.max(-1, Math.min(1, value))
      const direction = delta > 0 ? -1 : 1

      function rewindVideo() {
        if (!videoRef.current) {
          return
        }

        if (!videoRef.current.paused) {
          videoRef.current.pause()
        }

        const time = Math.max(
          0,
          Number(
            (
              videoRef.current.currentTime -
              videoDecrement.current * direction
            ).toFixed(2)
          )
        )

        gsap.killTweensOf(videoRef.current)
        gsap.to(videoRef.current, {
          currentTime: time,
          duration: 0.25,
          ease: Power0.easeNone
        })

        if (time === 0) {
          setScrollIsLocked(false)
        }
      }

      function animateFloatingElements() {
        if (direction > 0) {
          gsap.to(floatingElementsRef.current, {
            y: floatingElementsScrollY.current,
            duration: 0.35,
            ease: Power1.easeOut
          })
        } else {
          floatingElementsScrollY.current = 0
          if (videoRef.current.currentTime >= videoRef.current.duration) {
            gsap.to(floatingElementsRef.current, {
              y: -30,
              duration: 0.35,
              onComplete: () => {
                gsap.to(floatingElementsRef.current, {
                  y: 0,
                  duration: 0.2
                })
              }
            })
          } else {
            gsap.to(floatingElementsRef.current, {
              y: 0,
              duration: 0.35
            })
          }
        }
      }

      if (scrollIsLocked) {
        event.preventDefault()
        if (direction > 0) {
          floatingElementsScrollY.current -= 5
        }
        rewindVideo()
        animateFloatingElements()
        // eslint-disable-next-line consistent-return
        return false
      }
    },
    [scrollIsLocked]
  )

  const animateIn = React.useCallback(() => {
    if (!isInitialAnimationShown) {
      defaultShowAnimation(animatedElements.current)
      setIsInitialAnimationShown(true)
    } else {
      floatingElementsScrollY.current = 0
      gsap.to(floatingElementsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: Power1.easeOut
      })
    }
  }, [isInitialAnimationShown])

  const animateOut = React.useCallback(() => {
    // do nothing
  }, [])

  usePanelScrollingAnimationLogic({
    animateIn,
    animateOut,
    inView,
    animatedElements,
    showDefaultInAnimation: false,
    showDefaultOutAnimation: false
  })

  React.useEffect(() => {
    scrollerRef.current.addEventListener('wheel', wheelHandler)
    return () => {
      scrollerRef.current.removeEventListener('wheel', wheelHandler)
    }
  }, [wheelHandler])

  React.useEffect(() => {
    scrollerRef.current.addEventListener('scroll', scrollHandler)
    return () => {
      scrollerRef.current.removeEventListener('scroll', scrollHandler)
    }
  }, [scrollHandler])

  return (
    <HeroSectionWrapper ref={containerRef} isHero>
      <div
        tw="relative z-30 py-16 h-full lg:py-0"
        data-switch-visibility
        ref={inViewRef}>
        <ContainerAlt tw="relative z-10 flex flex-col items-start justify-center h-full">
          <NumberWrapper className="font-family-video">
            <TextAnimation isBright shouldRun={inView}>
              {numbers}
            </TextAnimation>
          </NumberWrapper>
          <div tw="h-full flex flex-col justify-center">
            <div tw="mb-14" data-floating-element>
              <BoxedText
                mobileCompressible
                text='How Do We Make</br>"Like It Never</br>Even Happened"</br>Happen?'
                shouldRunAnimation={inView}
              />
            </div>
            <div tw="mb-4">
              <div tw=" flex" data-show-animation data-floating-element>
                <Button to={`tel:${frPhone}`} isThin>
                  {`${formatPhoneLink(frPhone)}`}
                </Button>
              </div>
            </div>
            <div tw="pl-2">
              <p
                tw="text-white tracking-widest"
                data-show-animation="true"
                data-floating-element>
                Contact Your Local SERVPRO
              </p>
            </div>
          </div>
        </ContainerAlt>
      </div>
      <StyledArrow
        tw="absolute w-full bottom-6 flex justify-center items-center z-20"
        ref={arrowRef}>
        <svg
          width="45"
          height="29"
          viewBox="0 0 45 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 0L0 4L22.5 29L45 4.5L41 0.5L22.5 21L4 0Z"
            fill="#65A11C"
          />
        </svg>
      </StyledArrow>
      <BackgroundGradient />
      <BackgroundImageWrapper>
        <video
          ref={videoRef}
          src="/landing-header-clip.mp4"
          muted
          tw="hidden lg:block absolute w-full h-full top-0 left-0 object-cover"
        />
        <video
          src="/landing-header-clip.mp4"
          muted
          loop
          autoPlay
          playsInline
          tw="lg:hidden absolute w-full h-full top-0 left-0 object-cover"
        />
        {/*<div tw="hidden lg:(block absolute inset-0 w-full h-full)">*/}
        {/*  <StaticImage*/}
        {/*    width={1920}*/}
        {/*    tw="absolute inset-0 w-full h-full"*/}
        {/*    alt="Background Image"*/}
        {/*    formats={['AUTO', 'WEBP', 'AVIF']}*/}
        {/*    src="../../images/bg-1.jpg"*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div tw="absolute inset-0 w-full h-full lg:hidden">*/}
        {/*  <StaticImage*/}
        {/*    width={1024}*/}
        {/*    tw="absolute inset-0 w-full h-full"*/}
        {/*    alt="Background Image"*/}
        {/*    formats={['AUTO', 'WEBP', 'AVIF']}*/}
        {/*    src="../../images/bg-1-mobile.jpg"*/}
        {/*  />*/}
        {/*</div>*/}
      </BackgroundImageWrapper>
    </HeroSectionWrapper>
  )
}

const HeroSectionWrapper = styled(LandingSection)`
  border-bottom: 2px solid #f26a36;
  background-color: #716d6b;

  @media (max-width: 768px) {
    height: calc(100vh - 68px - 77px);
    min-height: 540px;
  }

  ${tw`relative`}
`
const BackgroundGradient = styled.div`
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.2), transparent);
  @media (min-width: 1024px) {
    background: linear-gradient(90deg, rgba(235, 112, 45, 0.15), transparent);
  }
  ${tw`block w-full absolute z-10 top-0 left-0 h-full md:(w-4/5) lg:(w-1/2)`}
`
const BackgroundImageWrapper = styled.div`
  @media (min-width: 1024px) {
    img {
      object-position: center top;
    }
  }
  ${tw`absolute bottom-0 left-0 w-full h-full`}
`
const NumberWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 32px;
  right: 20px;
  color: #75b32c;
  font-size: 22px;
  letter-spacing: 0.27em;
  opacity: 0.9;
  font-weight: 500;
  ${tw`hidden lg:block`}

  @media (min-width: ${BREAKPOINT_MD}px) {
    top: 50px;
  }

  @media (min-width: 1536px) {
    right: -25px;
  }
`

const StyledArrow = styled.div`
  will-change: transform;
`

export default HeroSection
