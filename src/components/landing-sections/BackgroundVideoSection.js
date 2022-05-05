import React from 'react'
import tw, { styled } from 'twin.macro'
import { StaticImage } from 'gatsby-plugin-image'
import gsap from 'gsap'
import { useInView } from 'react-intersection-observer'
import ReactPlayer from 'react-player'

import ContainerAlt from '@landing-sections/ContainerAlt'
import PlayButton from '@landing-sections/PlayButton'
import BoxedText from '@landing-sections/BoxedText'
import LandingSection from '@landing-sections/LandingSection'
import { defaultShowAnimation } from '../utils/defaultAnimations'
import { useAnimatedElementsRefs } from '../../hooks/use-animated-elements-refs'
import { usePanelScrollingAnimationLogic } from '../../hooks/use-panel-scrolling-animation-logic'
import LoadingSpinner from '../atoms/loading/LoadingSpinner'

function BackgroundVideoSection() {
  const containerRef = React.useRef(null)
  const videoRef = React.useRef(null)
  const [playing, setPlaying] = React.useState(false)
  const [inViewRef, inView] = useInView()
  const animatedElements = useAnimatedElementsRefs(containerRef)
  const [spinnerVisible, setSpinnerVisible] = React.useState(false)

  function handleDocumentKeyDown(event) {
    if (event.key === 'Escape' && playing) {
      pause()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown)

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }
  }, [playing])

  React.useEffect(() => {
    setSpinnerVisible(playing)
  }, [playing])

  function handlePlayClick() {
    play()
  }

  const animateIn = React.useCallback(() => {
    defaultShowAnimation(animatedElements.current)
  }, [])

  usePanelScrollingAnimationLogic({
    animateIn,
    inView,
    animatedElements
  })

  function play() {
    gsap.to('[data-hide-on-play]', { duration: 0.35, y: -20, autoAlpha: 0 })
    gsap.fromTo(
      videoRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35 }
    )
    setPlaying(true)
  }

  function pause() {
    setPlaying(false)
    gsap.set('[data-hide-on-play]', { y: 0, autoAlpha: 1 })
    gsap.to(videoRef.current, { autoAlpha: 0, duration: 0.35 })
  }

  return (
    <TextSectionWrapper ref={containerRef}>
      <div
        tw="relative z-20 pt-16 pb-4 h-full md:pb-10 lg:py-6 2xl:py-0"
        data-switch-visibility
        ref={inViewRef}>
        <ContainerAlt tw="relative z-10 h-full flex flex-col-reverse justify-start items-start lg:(flex-row-reverse items-center justify-center)">
          <div tw="flex justify-center items-center flex-1 w-full xs:py-4 md:(absolute inset-0 left-1/2 w-1/2 h-1/2) lg:(relative left-0 w-full h-full)">
            <PlayButtonWrapper>
              <ButtonWrapper data-hide-on-play>
                <PlayButton onClick={handlePlayClick} />
              </ButtonWrapper>
            </PlayButtonWrapper>
          </div>
          <div
            tw="flex flex-col items-start relative z-20 lg:px-14 2xl:px-4"
            data-hide-on-play>
            <div tw="mb-8 lg:mb-14">
              <BoxedText
                smallPadding
                text="By Being Prepared</br>For Anything."
                shouldRunAnimation={inView}
              />
            </div>
            <TextContent tw="text-white" data-show-animation>
              Have you ever wondered how SERVPRO makes &quot;Like it&nbsp;never
              even happened<sup>®</sup>&quot;, happen? By&nbsp;being prepared
              for anything. We&nbsp;put our PROs to&nbsp;the ultimate test
              to&nbsp;prove that no&nbsp;matter what comes your way, we&rsquo;re
              faster to&nbsp;any size disaster. From our top-of-the-line gear to
              our specialized PROs, find out how SERVPRO remains the best in
              restoration and cleanup.
            </TextContent>
          </div>
        </ContainerAlt>
      </div>
      <BackgroundImageWrapper>
        <StaticImage
          width={1920}
          tw="absolute inset-0 w-full h-full"
          alt="Background Image"
          formats={['AUTO', 'WEBP', 'AVIF']}
          src="../../images/bg-2.jpg"
        />
      </BackgroundImageWrapper>
      <BackgroundVideoWrapper
        css={[
          tw`fixed top-0 left-0 w-full h-full object-cover invisible`,
          !playing && 'hidden'
        ]}
        ref={videoRef}>
        {playing && (
          <StyledPlayer
            url="https://vimeo.com/639546004"
            autoplay
            width="100%"
            height="100%"
            playing={playing}
            controls
            onStart={() => setSpinnerVisible(false)}
            onPause={pause}
            onEnded={pause}
          />
        )}
        {spinnerVisible && (
          <SpinnerContainer tw="absolute inset-0 flex items-center justify-center bg-black">
            <LoadingSpinner />
          </SpinnerContainer>
        )}
      </BackgroundVideoWrapper>
    </TextSectionWrapper>
  )
}

const TextSectionWrapper = styled(LandingSection)`
  border-bottom: 2px solid #f26a36;
  ${tw`relative`}
`
const BackgroundImageWrapper = styled.div`
  &::before {
    display: block;
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.15);
    content: '';
  }
  ${tw`absolute inset-0 w-full h-full`}
`

const BackgroundVideoWrapper = styled.div`
  z-index: 1000;
`

const TextContent = styled.p`
  max-width: 575px;
  font-size: 18px;
  line-height: 1.65;
  @media (min-width: 1024px) {
    font-size: 26px;
    margin-left: 24px;
  }
`
const PlayButtonWrapper = tw.div`2xl:(absolute inset-0 flex justify-center items-center)`

const StyledPlayer = styled(ReactPlayer)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;

  iframe {
    width: 100%;
    height: 100%;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 125px;
`

const SpinnerContainer = styled.div`
  pointer-events: none;
`

export default BackgroundVideoSection
