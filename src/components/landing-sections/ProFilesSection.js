import React from 'react'
import Lottie from 'react-lottie'
import tw, { css, styled } from 'twin.macro'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'

import ContainerAlt from '@landing-sections/ContainerAlt'
import PlayButton from '@landing-sections/PlayButton'
import Button from '@atoms/Button'
import LandingSection from '@landing-sections/LandingSection'
import { useInView } from 'react-intersection-observer'
import { useAnimatedElementsRefs } from '../../hooks/use-animated-elements-refs'
import { usePanelScrollingAnimationLogic } from '../../hooks/use-panel-scrolling-animation-logic'
import { BREAKPOINT_MD, BREAKPOINT_SM } from '../../constants/constants'
// import TextAnimation from '@landing-sections/TextAnimation'
import '../utils/splitType'
import { useResponsive } from '../atoms/Responsive'
// import NumberBlock from '@landing-sections/NumberBlock'
import MediaModal from './MediaModal'
import { useMediaModal } from '../../hooks/use-media-modal'
import * as animationBarcodeData from './animations/barcode.json'
// import * as animationBadgeData from './animations/badge.json'
import * as animationNumbersData from './animations/numbers.json'

// import { ReactComponent as ArrowIcon } from '../../images/svg/arrow.svg'
import { getPath } from '../utils/paths'

function DecorItemTemplate({ index }) {
  return (
    <DecorItem index={index} data-line={index}>
      {Array.from(new Array([0, 1].includes(index) ? 3 : 1)).map(
        (_, lineIndex) => {
          return <div key={lineIndex} data-line-element={lineIndex} />
        }
      )}
    </DecorItem>
  )
}

function VideoItemTemplate({
  index,
  image,
  name,
  videoPath,
  onMouseEnter,
  onOpen
}) {
  return (
    <>
      <VideoItem index={index} onMouseEnter={onMouseEnter}>
        <VideoTitle className="font-family-video" tw="hidden lg:block">
          &quot;{name}&quot;
        </VideoTitle>
        <VideoImageWrapper>
          <PlayButtonWrapper>
            <PlayButton dark={true} small onClick={() => onOpen(videoPath)} />
          </PlayButtonWrapper>
          <div tw="absolute inset-0 bg-black bg-opacity-10 z-10" />
          <VideoImagePreview tw="w-full max-h-full" data-image={index}>
            <GatsbyImage
              tw="w-full"
              alt="Video Placeholder"
              image={getImage(image)}
            />
          </VideoImagePreview>
        </VideoImageWrapper>
        <DecorItemTemplate index={index} />
      </VideoItem>
      <TextHeadline className="font-family-video" tw="lg:hidden">
        Pro Files: “{name}”
      </TextHeadline>
    </>
  )
}

function TextItem({
  headline,
  content,
  index,
  shouldSplitLines,
  onLinesAreSplit
}) {
  const containerRef = React.useRef(null)
  const linesAreSplit = React.useRef(false)

  React.useEffect(() => {
    if (linesAreSplit.current) {
      return
    }
    if (!shouldSplitLines) {
      return
    }
    const headlineEl = containerRef.current.querySelector('[data-headline]')
    const contentEl = containerRef.current.querySelector('[data-content]')
    if (!window.SplitType) {
      return
    }
    new window.SplitType(headlineEl, {
      split: 'chars'
    })
    new window.SplitType(contentEl, {
      split: 'lines'
    })
    contentEl.querySelectorAll('.line').forEach(lineEl => {
      new window.SplitType(lineEl, {
        split: 'chars'
      })
    })
    linesAreSplit.current = true
    onLinesAreSplit?.()
  }, [shouldSplitLines])

  return (
    <StyledTextItem data-text={index} ref={containerRef}>
      <TextItemInner>
        <TextHeadline className="font-family-video" data-headline={index}>
          PRO Files: “{headline}”
        </TextHeadline>
        <Text className="font-family-video" data-content>
          {content}
        </Text>
        <div data-button>
          <Button to={getPath.findALocation()} smallOnMobile>
            Find Your Local SERVPRO
          </Button>
        </div>
      </TextItemInner>
    </StyledTextItem>
  )
}

const ProFilesSection = () => {
  // const numbers = '162 33 22 87 013'
  const containerRef = React.useRef(null)
  const [inViewRef, inView] = useInView()
  const animatedElements = useAnimatedElementsRefs(containerRef)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const timelineRef = React.useRef(null)
  const responsiveContext = useResponsive()
  const lineAnimationDuration = 1
  const lineAnimationDelay = 0.3
  const linesAreSplitCount = React.useRef(0)
  const [allLinesAreSplit, setAllLinesAreSplit] = React.useState(false)

  const defaultBarcodeOptions = {
    loop: true,
    autoplay: true,
    animationData: animationBarcodeData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  // const defaultBadgeOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationBadgeData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // }

  const defaultNumbersOptions = {
    loop: true,
    autoplay: true,
    animationData: animationNumbersData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const { image1, image2, image3 } = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "video-placeholder-6.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 365
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image2: file(relativePath: { eq: "video-placeholder-8.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 365
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image3: file(relativePath: { eq: "video-placeholder-7.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 365
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  usePanelScrollingAnimationLogic({
    inView,
    animatedElements
  })

  const text =
    'When you’re the leader in disaster cleanup and restoration, you’ve got to be prepared for anything, and we mean – anything. Seriously, you wouldn’t believe how the smallest objects can cause the biggest damage. From pastries to action figures, check out our PRO Files and hear about some of the most unbelievable disasters.'

  const items = React.useMemo(() => {
    return [
      {
        name: 'Pigeon',
        image: image1,
        videoPath: 'https://vimeo.com/640845581',
        textContent: text
      },
      {
        name: 'Pastry',
        image: image2,
        videoPath: 'https://vimeo.com/640845621',
        textContent: text
      },
      {
        name: 'Action-Figure',
        image: image3,
        videoPath: 'https://vimeo.com/640845553',
        textContent: text
      }
    ]
  }, [image1, image2, image3])

  React.useEffect(() => {
    if (!responsiveContext.isDesktop) {
      return
    }
    if (!allLinesAreSplit) {
      return
    }
    animateItem(currentIndex)
  }, [currentIndex, responsiveContext.isDesktop, allLinesAreSplit])

  function animateItem(index) {
    function animateImage() {
      const image = containerRef.current.querySelector(
        `[data-image="${index}"]`
      )
      const tl = gsap.timeline()
      tl.to(image, { opacity: 0.3, duration: 0.02 })
      tl.to(image, { opacity: 1, duration: 0.02 }, '+=0.125')
      tl.set(image, { opacity: 0.3, duration: 0.02 }, '+=0.1')
      tl.set(image, { opacity: 1, duration: 0.02 }, '+=0.09')
      // tl.set(image, { opacity: 0.3, duration: 0.02 }, '+=0.075')
      // tl.set(image, { opacity: 1, duration: 0.02 }, '+=0.075')
    }

    function animateLine() {
      function isOdd(num) {
        return num % 2
      }

      function adjustHeightForSecondLineElement(secondLineElement) {
        if (!secondLineElement) {
          return
        }
        const headline = containerRef.current.querySelector(
          `[data-headline="${index}"]`
        )
        const { top: headlineTop } = headline.getBoundingClientRect()
        const { top: lineTop } = secondLineElement.getBoundingClientRect()
        const direction = lineTop > headlineTop ? -1 : 1
        const delta = Math.abs(lineTop - headlineTop) + direction * 22
        gsap.set(secondLineElement, {
          height: delta
        })
      }

      const lines = containerRef.current.querySelectorAll('[data-line]')
      lines.forEach(element => {
        element
          .querySelectorAll('[data-line-element]')
          .forEach((lineElement, lineIndex) => {
            const vars = isOdd(lineIndex)
              ? {
                  scaleY: 0
                }
              : {
                  scaleX: 0
                }
            gsap.set(lineElement, vars)
          })
      })
      timelineRef.current?.kill()
      timelineRef.current = gsap.timeline({ delay: lineAnimationDelay })
      const line = containerRef.current.querySelector(`[data-line="${index}"]`)
      const lineElements = line.querySelectorAll('[data-line-element]')
      adjustHeightForSecondLineElement(lineElements[1])
      lineElements.forEach((lineElement, lineIndex) => {
        const vars = isOdd(lineIndex)
          ? {
              scaleY: 1
            }
          : {
              scaleX: 1
            }
        const duration = lineAnimationDuration / lineElements.length
        timelineRef.current.to(lineElement, {
          duration,
          ...vars
        })
      })
    }

    function animateText() {
      gsap.killTweensOf(containerRef.current.querySelectorAll('.char'))
      gsap.set(containerRef.current.querySelectorAll(`[data-text]`), {
        autoAlpha: 0
      })
      gsap.set(containerRef.current.querySelectorAll('.char'), {
        opacity: 0
      })
      const buttons = containerRef.current.querySelectorAll('[data-button]')
      gsap.set(buttons, { autoAlpha: 0 })
      const textContainer = containerRef.current.querySelector(
        `[data-text="${index}"]`
      )
      const headline = textContainer.querySelector('[data-headline]')
      const content = textContainer.querySelector('[data-content]')
      gsap.set(textContainer, { autoAlpha: 1 })
      const delay = lineAnimationDuration + lineAnimationDelay - 0.15
      gsap.fromTo(
        textContainer.querySelector('[data-button]'),
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          delay,
          duration: 0.25,
          ease: 'power1.easeOut'
        }
      )
      gsap.fromTo(
        headline.querySelectorAll('.char'),
        { opacity: 0, scale: 1.3 },
        {
          duration: 0.2,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          delay,
          ease: 'power1.easeOut'
        }
      )
      gsap.fromTo(
        content.querySelectorAll('.char'),
        { opacity: 0, scale: 1.3 },
        {
          duration: 0.2,
          opacity: 1,
          scale: 1,
          delay,
          stagger: 0.01,
          ease: 'power1.easeOut'
        }
      )
    }

    animateImage()
    animateLine()
    animateText()
  }

  function handleLinesAreSplit() {
    linesAreSplitCount.current += 1
    if (linesAreSplitCount.current === items.length) {
      setAllLinesAreSplit(true)
    }
  }

  // Swiper logic
  SwiperCore.use([Navigation])

  const swiperInstance = React.useRef(null)

  const onBeforeInit = swiper => {
    swiperInstance.current = swiper
  }

  const swiperOptions = {
    onBeforeInit,
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 30,
    scrollEnabled: true,
    breakpoints: {
      375: {
        spaceBetween: 36
      }
    }
  }

  const mediaModal = useMediaModal({
    paths: items.map(item => item.videoPath)
  })

  return (
    <StyledProFilesSection ref={containerRef}>
      <div tw="h-full" data-switch-visibility ref={inViewRef}>
        <div tw="pt-16 pb-16 lg:pb-20 lg:py-8 h-full">
          <StyledContainer tw="relative z-20 flex flex-col h-full justify-center">
            <div tw="hidden lg:flex flex-col-reverse justify-between w-full lg:(flex-row items-center)">
              <VideoGrid>
                {items.map((item, index) => {
                  return (
                    <VideoItemTemplate
                      key={index}
                      index={index}
                      active={currentIndex === index}
                      name={item.name}
                      image={item.image}
                      videoPath={item.videoPath}
                      onMouseEnter={() => setCurrentIndex(index)}
                      onOpen={mediaModal.open}
                    />
                  )
                })}
              </VideoGrid>
              <TextWrapper data-show-animation>
                <div>
                  {items.map((item, index) => {
                    return (
                      <TextItem
                        key={index}
                        index={index}
                        visible={currentIndex === index}
                        headline={item.name}
                        content={item.textContent}
                        shouldSplitLines={inView}
                        onLinesAreSplit={handleLinesAreSplit}
                      />
                    )
                  })}
                </div>
              </TextWrapper>
            </div>
            {!responsiveContext.isDesktop && (
              <SwiperContainer tw="relative">
                <Swiper {...swiperOptions}>
                  {items.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <VideoItemTemplate
                          index={index}
                          active={currentIndex === index}
                          name={item.name}
                          image={item.image}
                          videoPath={item.videoPath}
                          onOpen={mediaModal.open}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                <Text className="font-family-video" data-content>
                  {text}
                </Text>
                <div data-button>
                  <Button to={getPath.findALocation()} smallOnMobile>
                    Find Your Local SERVPRO
                  </Button>
                </div>
              </SwiperContainer>
            )}
          </StyledContainer>
        </div>
        <NumberBlockWrapper>
          {/* <NumberBlock> */}
          <Lottie options={defaultNumbersOptions} isStopped={!inView} />
          {/* <TextAnimation shouldRun={inView}>{numbers}</TextAnimation> */}
          {/* </NumberBlock> */}
        </NumberBlockWrapper>
      </div>
      <BarcodeWrapper>
        <Lottie options={defaultBarcodeOptions} isStopped={!inView} />
      </BarcodeWrapper>
      {/*<BadgeWrapper>*/}
      {/*  <Lottie options={defaultBadgeOptions} isStopped={!inView} />*/}
      {/*</BadgeWrapper>*/}
      <BackgroundImageWrapper>
        <StaticImage
          width={2200}
          tw="absolute inset-0 w-full h-full"
          alt="Background Image"
          formats={['AUTO', 'WEBP', 'AVIF']}
          src="../../images/bg-5.jpg"
        />
      </BackgroundImageWrapper>
      <MediaModal {...mediaModal} />
    </StyledProFilesSection>
  )
}

const StyledProFilesSection = styled(LandingSection)`
  color: #95c73c;
  ${tw`relative`}
`
const StyledContainer = styled(ContainerAlt)`
  max-width: 1624px;
  ${tw`2xl:px-8`}
`
const VideoGrid = styled.div`
  ${tw`relative z-10 lg:grid`};

  @media (min-width: ${BREAKPOINT_SM}px) {
    gap: 70px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    max-height: 70vh;
    gap: 50px 30px;
    grid-template-columns: 200px 200px;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (min-width: 1320px) {
    gap: 50px 40px;
    grid-template-columns: 325px 325px;
  }

  @media (min-width: 1536px) {
    max-height: 75vh;
    gap: 70px 40px;
    grid-template-columns: 365px 365px;
  }
`
const VideoItem = styled.div(({ index }) => [
  css`
    margin-bottom: 30px;

    @media (min-width: 500px) {
    }

    @media (min-width: ${BREAKPOINT_MD}px) {
      width: auto;
      max-width: none;
      margin-bottom: 0;
    }
  `,
  tw`relative z-0`,
  index === 0 &&
    `
    @media (min-width: 1024px) {
      grid-row: 1 / 3; grid-column: 1 / 2
    }`,
  index === 1 &&
    `
    @media (min-width: 1024px) {
      grid-row: 3 / 5; grid-column: 1 / 2
    }`,
  index === 2 &&
    `
    @media (min-width: 1024px) {
      grid-row: 2 / 4; grid-column: 2 / 3
    }`
])
const VideoTitle = styled.h4`
  ${tw`font-semibold lg:absolute -top-9 opacity-75`}
  font-size: 18px;
  letter-spacing: 0.055em;
`
const VideoImageWrapper = styled.div`
  ${tw`relative z-10 max-h-full overflow-hidden flex items-center justify-center`}
  aspect-ratio: 16/10;

  @media (min-width: ${BREAKPOINT_MD}px) {
    aspect-ratio: auto;
  }
`
const VideoImagePreview = styled.div`
  will-change: transform;
`
const DecorItem = styled.div`
  ${tw`absolute z-0 hidden lg:block`};

  div {
    ${tw`bg-secondary`};
    transform-origin: left;
  }

  ${({ index }) =>
    index === 0 &&
    css`
      top: 70px;
      width: auto;
      height: auto;
      right: -130%;

      @media (min-width: 1320px) {
        right: -125%;
      }

      @media (min-width: 1420px) {
        right: -134%;
      }

      div:first-of-type {
        position: absolute;
        top: 0;
        right: 0;

        height: 1px;
        transform: scale(0, 1);
        width: 900px;
      }

      div:nth-of-type(2) {
        width: 1px;
        height: 1px;
        transform: scale(1, 0);
        transform-origin: top;
      }

      div:last-of-type {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        height: 1px;
        transform: scale(0, 1);
        width: 30px;

        @media (min-width: 1180px) {
          width: 50px;
        }

        @media (min-width: 1320px) {
          width: 30px;
        }

        @media (min-width: 1380px) {
          width: 50px;
        }
      }
    `}

  ${({ index }) =>
    index === 1 &&
    css`
      right: -130%;
      bottom: 35%;
      width: auto;
      height: auto;

      @media (min-width: 1320px) {
        right: -126%;
      }

      @media (min-width: 1536px) {
        right: -140%;
      }

      div:first-of-type {
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        width: 600px;
        height: 1px;
        transform: scale(0, 1);
      }

      div:nth-of-type(2) {
        width: 1px;
        height: 1px;
        transform: scale(1, 0);
        transform-origin: bottom;
      }

      div:last-of-type {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 1px;
        transform: scale(0, 1);
        width: 30px;

        @media (min-width: 1380px) {
          width: 54px;
        }
      }
    `};

  ${({ index }) =>
    index === 2 &&
    css`
      top: 50px;
      left: -60px;
      width: 300px;
      height: 1px;

      div {
        width: 100%;
        height: 100%;
        transform: scale(0, 1);
      }

      @media (min-width: 1320px) {
        width: 430px;
      }

      @media (min-width: 1536px) {
        width: 500px;
      }
    `}
`
const BackgroundImageWrapper = styled.div`
  ${tw`absolute inset-0 w-full h-full`};
  background-image: url('/images/landing-bg.jpg');
  background-repeat: repeat;
  transform: scale(1.3);

  @media (min-width: ${BREAKPOINT_MD}px) {
    transform: none;
    background-image: none;
  }

  img {
    display: none;

    @media (min-width: ${BREAKPOINT_MD}px) {
      display: block;
    }
  }
`
const TextWrapper = styled.div`
  position: relative;
  margin-bottom: 80px;

  @media (min-width: ${BREAKPOINT_SM}px) {
    height: 250px;
  }

  @media (min-width: ${BREAKPOINT_MD}px) {
    position: absolute;
    height: auto;
    width: 44vw;
    left: 53%;
    margin-top: 70px;
  }

  @media (min-width: 1320px) {
    left: 63%;
    width: 35vw;
    max-width: 570px;
  }
`
const StyledTextItem = styled.div`
  ${tw`lg:(absolute top-0 left-0 right-0 opacity-0) flex flex-col justify-center items-start `}

  .char {
    @media (min-width: ${BREAKPOINT_MD}px) {
      opacity: 0;
      will-change: transform;
    }
  }
`
const TextItemInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: ${BREAKPOINT_MD}px) {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
`
const TextHeadline = styled.h5`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.07em;
  ${tw`mb-2 opacity-70`};

  @media (min-width: ${BREAKPOINT_SM}px) {
    font-size: 28px;
  }

  @media (min-width: 1380px) {
    font-size: 32px;
  }
`
const Text = styled.p`
  line-height: 2.15;
  letter-spacing: 0;
  font-size: 14px;

  @media (min-width: ${BREAKPOINT_SM}px) {
    font-size: 16px;
  }

  @media (min-width: 1380px) {
    font-size: 20px;
  }

  ${tw`mb-4 lg:mb-10 opacity-70 max-w-3xl lg:max-w-none w-full`}
`
const PlayButtonWrapper = tw.div`absolute inset-0 z-20 flex justify-center items-center`
const BarcodeWrapper = styled.div`
  bottom: -170px;
  left: 32px;
  opacity: 80;
  width: 30px;
  height: 250px;
  z-index: 1;
  ${tw`hidden lg:block absolute`}
`

// const BadgeWrapper = styled.div`
//   width: 535px;
//   height: 190px;
//   ${tw`absolute top-14 left-1/2`}
// `

const NumberBlockWrapper = styled.div`
  width: 290px;
  height: 20px;
  position: absolute;
  z-index: 10;
  top: 119px;
  right: 56px;
`
// const SwiperButton = styled.button`
//   padding: 5px;
//
//   &:disabled {
//     opacity: 0.5;
//     pointer-events: none;
//   }
//
//   svg {
//     height: 30px;
//     width: 20px;
//     fill: white;
//   }
// `
const SwiperContainer = styled.div`
  .swiper {
    overflow: visible;
    width: 72vw;
    margin-right: auto;
    margin-left: unset;
  }

  .swiper-slide {
    opacity: 0.5;
    transition: opacity 0.55s ease-in-out;
  }

  .swiper-slide-active {
    opacity: 1;
  }
`

export default ProFilesSection
