import React from 'react'
import Lottie from 'react-lottie'
import tw, { styled } from 'twin.macro'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import gsap from 'gsap'

import ContainerAlt from '@landing-sections/ContainerAlt'
import PlayButton from '@landing-sections/PlayButton'
import LandingSection from '@landing-sections/LandingSection'
import { useInView } from 'react-intersection-observer'
import { useAnimatedElementsRefs } from '../../hooks/use-animated-elements-refs'
import { usePanelScrollingAnimationLogic } from '../../hooks/use-panel-scrolling-animation-logic'
import { graphql, useStaticQuery } from 'gatsby'
import TextAnimation from '@landing-sections/TextAnimation'
import { BREAKPOINT_MD } from '../../constants/constants'
import { useMediaModal } from '../../hooks/use-media-modal'
import MediaModal from './MediaModal'
import * as animationBarcodeData from './animations/barcode.json'

function VideoItem({ index, image, videoPath, onOpen }) {
  return (
    <StyledVideoItem index={index} data-show-animation>
      <PlayButtonWrapper>
        <PlayButton onClick={() => onOpen(videoPath)} />
      </PlayButtonWrapper>
      <GatsbyImage
        tw="w-full max-h-full h-full"
        alt="Video Placeholder"
        image={getImage(image)}
      />
    </StyledVideoItem>
  )
}

const VideoGallery = () => {
  const containerRef = React.useRef(null)
  const [inViewRef, inView] = useInView()
  const animatedElements = useAnimatedElementsRefs(containerRef)
  const title = 'Video Gallery'
  const bottomLineRef = React.useRef(null)

  const { image1, image2, image3 } = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "video-placeholder-3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1000
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image2: file(relativePath: { eq: "video-placeholder-4.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 500
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image3: file(relativePath: { eq: "video-placeholder-5.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 500
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const galleryItems = [
    {
      image: image1,
      videoPath: 'https://vimeo.com/639546441',
      showPreviewOnPage: true
    },
    {
      image: image2,
      videoPath: 'https://vimeo.com/639546126',
      showPreviewOnPage: true
    },
    {
      image: image3,
      videoPath: 'https://vimeo.com/639546257',
      showPreviewOnPage: true
    },
    { videoPath: 'https://vimeo.com/639546301', showPreviewOnPage: false },
    { videoPath: 'https://vimeo.com/639546348', showPreviewOnPage: false },
    { videoPath: 'https://vimeo.com/639546408', showPreviewOnPage: false }
  ]

  const animateIn = React.useCallback(() => {
    gsap.to(bottomLineRef.current, {
      scaleX: 1,
      duration: 0.7,
      delay: 0.5,
      ease: 'power2.easeOut'
    })
  }, [])

  const animateOut = React.useCallback(() => {
    gsap.to(bottomLineRef.current, {
      duration: 0.25,
      scaleX: 0,
      ease: 'power2.easeIn'
    })
  }, [])

  usePanelScrollingAnimationLogic({
    animateIn,
    animateOut,
    inView,
    animatedElements
  })

  const mediaModal = useMediaModal({
    paths: galleryItems.map(item => item.videoPath)
  })

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationBarcodeData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <GalleryWrapper ref={containerRef}>
      <div tw="py-8 h-full">
        <div
          tw="h-full flex flex-col justify-center"
          data-switch-visibility
          ref={inViewRef}>
          <ContainerAlt tw="relative z-20 flex flex-col h-full justify-center">
            <Title className="font-family-video" data-show-animation>
              <TextAnimation shouldRun={inView} isText={true} duration={1.15}>
                {title}
              </TextAnimation>
            </Title>
            <VideoGrid>
              {galleryItems.map((item, index) => {
                return (
                  item.showPreviewOnPage && (
                    <VideoItem
                      key={index}
                      index={index}
                      image={item.image}
                      videoPath={item.videoPath}
                      onOpen={mediaModal.open}
                    />
                  )
                )
              })}
              <BarcodeWrapper>
                <Lottie options={defaultOptions} isStopped={!inView} />
              </BarcodeWrapper>
            </VideoGrid>
          </ContainerAlt>
        </div>
      </div>
      <BackgroundImageWrapper>
        <StaticImage
          width={1920}
          tw="absolute inset-0 w-full h-full"
          alt="Background Image"
          formats={['AUTO', 'WEBP', 'AVIF']}
          src="../../images/bg-3.jpg"
        />
      </BackgroundImageWrapper>
      <BottomLine ref={bottomLineRef} />
      <MediaModal {...mediaModal} />
    </GalleryWrapper>
  )
}

const GalleryWrapper = styled(LandingSection)`
  ${tw`relative`}
`
const BottomLine = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1000px;
  height: 2px;
  background-color: #65a11c;
  transform: scaleX(0);
  transform-origin: right;
  will-change: transform;
`
const Title = styled.div`
  color: #65a11c;
  margin-bottom: 30px;
  ${tw`text-lg lg:text-3xl mr-auto`}
`
const BackgroundImageWrapper = styled.div`
  ${tw`absolute inset-0 w-full h-full`}
  background-image: url('/images/bg-3-mobile.jpg');
  background-repeat: repeat;

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
const VideoGrid = styled.div`
  @media (min-width: 1024px) {
    max-height: 85%;
  }
  gap: 10px;
  ${tw`relative flex flex-col space-y-3 md:(space-y-0 grid grid-cols-3 grid-rows-2)`}
`
const StyledVideoItem = styled.div(({ index }) => [
  tw`relative`,
  index === 0 && `grid-row: 1 / 3; grid-column: 1 / 3`,
  index === 1 && `grid-row: 1 / 2; grid-column: 3 / 4`,
  index === 2 && `grid-row: 2 / 3; grid-column: 3 / 4`
])
const PlayButtonWrapper = tw.div`absolute inset-0 flex justify-center items-center`
const BarcodeWrapper = styled.div`
  top: -34px;
  right: -60px;
  height: 273px;
  width: 30px;
  opacity: 90;
  ${tw`hidden lg:block absolute z-10`}
`

export default VideoGallery
