import React from 'react'
import Lottie from 'react-lottie'
import tw, { styled } from 'twin.macro'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

import ContainerAlt from '@landing-sections/ContainerAlt'
import LandingSection from '@landing-sections/LandingSection'
import { useAnimatedElementsRefs } from '../../hooks/use-animated-elements-refs'
import { useInView } from 'react-intersection-observer'
import { usePanelScrollingAnimationLogic } from '../../hooks/use-panel-scrolling-animation-logic'
import TextAnimation from '@landing-sections/TextAnimation'
import NumberBlock from '@landing-sections/NumberBlock'
import ImageSlider from '@landing-sections/ImageSlider'
import { BREAKPOINT_MD } from '../../constants/constants'
import MediaModal from './MediaModal'
import { useMediaModal } from '../../hooks/use-media-modal'
import * as animationRadialData from './animations/radial-bg.json'

const ImageGallery = () => {
  const numbers = '232 33 12 65 71 7'
  const containerRef = React.useRef(null)
  const [inViewRef, inView] = useInView()
  const animatedElements = useAnimatedElementsRefs(containerRef)
  const title = 'Image Gallery'

  const {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11
  } = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "gallery-image.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image2: file(relativePath: { eq: "gallery-image-2.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image3: file(relativePath: { eq: "gallery-image-3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image4: file(relativePath: { eq: "gallery-image-4.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image5: file(relativePath: { eq: "gallery-image-5.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image6: file(relativePath: { eq: "gallery-image-6.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image7: file(relativePath: { eq: "gallery-image-9.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image8: file(relativePath: { eq: "gallery-image-10.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image9: file(relativePath: { eq: "gallery-image-11.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image10: file(relativePath: { eq: "gallery-image-7.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image11: file(relativePath: { eq: "gallery-image-8.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 660
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const galleryImages = [
    {
      image: image1,
      imagePath: '/images/gallery-image.jpg'
    },
    {
      image: image2,
      imagePath: '/images/gallery-image-2.jpg'
    },
    {
      image: image3,
      imagePath: '/images/gallery-image-3.jpg'
    },
    {
      image: image4,
      imagePath: '/images/gallery-image-4.jpg'
    },
    {
      image: image5,
      imagePath: '/images/gallery-image-5.jpg'
    },
    {
      image: image6,
      imagePath: '/images/gallery-image-6.jpg'
    },
    {
      image: image7,
      imagePath: '/images/gallery-image-9.jpg'
    },
    {
      image: image8,
      imagePath: '/images/gallery-image-10.jpg'
    },
    {
      image: image9,
      imagePath: '/images/gallery-image-11.jpg'
    },
    {
      image: image10,
      imagePath: '/images/gallery-image-7.jpg'
    },
    {
      image: image11,
      imagePath: '/images/gallery-image-8.jpg'
    }
  ]

  usePanelScrollingAnimationLogic({
    inView,
    animatedElements
  })

  const mediaModal = useMediaModal({
    paths: galleryImages.map(item => item.imagePath)
  })

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationRadialData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <>
      <GalleryWrapper ref={containerRef}>
        <RadialAnimationContainer>
          <Lottie options={defaultOptions} isStopped={!inView} />
        </RadialAnimationContainer>
        <div tw="h-full">
          <NumberBlockWrapper>
            <NumberBlock>
              <TextAnimation shouldRun={inView}>{numbers}</TextAnimation>
            </NumberBlock>
          </NumberBlockWrapper>
          <div tw="py-8 h-full">
            <div
              tw="flex flex-col h-full justify-center items-center"
              data-switch-visibility
              ref={inViewRef}>
              <StyledContainer>
                <Title className="font-family-video" data-show-animation>
                  <TextAnimation
                    shouldRun={inView}
                    isText={true}
                    duration={1.15}>
                    {title}
                  </TextAnimation>
                </Title>
                <GalleryItems data-show-animation>
                  {galleryImages.map((image, index) => {
                    return (
                      <GalleryItem
                        key={index}
                        index={index}
                        onClick={() => mediaModal.open(image.imagePath)}>
                        <div tw="w-full h-full max-h-full">
                          <GatsbyImage
                            tw="w-full h-full"
                            objectFit="cover"
                            alt="Gallery Image"
                            image={getImage(image.image)}
                          />
                        </div>
                      </GalleryItem>
                    )
                  })}
                </GalleryItems>
              </StyledContainer>
            </div>
          </div>
        </div>
        <BackgroundImageWrapper>
          <StaticImage
            width={1920}
            tw="absolute inset-0 w-full h-full"
            alt="Background Image"
            formats={['AUTO', 'WEBP', 'AVIF']}
            src="../../images/bg-4.jpg"
          />
        </BackgroundImageWrapper>
        <MediaModal {...mediaModal} />
      </GalleryWrapper>
      <ImageSlider galleryImages={galleryImages} />
    </>
  )
}

const GalleryWrapper = styled(LandingSection)`
  ${tw`relative`}
`

const StyledContainer = styled(ContainerAlt)`
  max-width: 1684px;
  ${tw`relative z-10 flex flex-col h-full justify-center 2xl:px-8`}
`
const GalleryItems = styled.div`
  @media (max-width: ${BREAKPOINT_MD}px) {
    display: none;
  }
  ${tw`overflow-hidden`}
  font-size: 0;
  line-height: 0;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    max-height: 80vh;
    grid-template-columns:
      minmax(0, 280px) minmax(0, 150px) minmax(0, 125px) minmax(0, 300px)
      minmax(0, 80px) minmax(0, 270px) minmax(0, 400px);
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
`
const GalleryItem = styled.div(({ index }) => [
  tw`relative border border-white cursor-pointer`,
  `@media (max-width: 1023px) {
      aspect-ratio: 16/10;
    }`,
  index === 0 &&
    `
      @media (min-width: 1024px) {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
      }
    `,
  index === 1 &&
    `
      @media (min-width: 1024px) {
        grid-row: 1 / 2;
        grid-column: 2 / 4;
      }
    `,
  index === 2 &&
    `
      @media (min-width: 1024px) {
        grid-row: 1 / 2;
        grid-column: 4 / 7;
      }
    `,
  index === 3 &&
    `
      @media (min-width: 1024px) {
        grid-row: 1 / 2;
        grid-column: 7 / 8;
      }
    `,
  index === 4 &&
    `
      @media (min-width: 1024px) {
          grid-row: 2 / 3;
          grid-column: 1 / 3;
      }
    `,
  index === 5 &&
    `
      @media (min-width: 1024px) {
        grid-row: 2 / 3;
        grid-column: 3 / 5;
      }
    `,
  index === 6 &&
    `
      @media (min-width: 1024px) {
        grid-row: 2 / 3;
        grid-column: 5 / 7;
      }
    `,
  index === 7 &&
    `
      @media (min-width: 1024px) {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
      }
    `,
  index === 8 &&
    `
      @media (min-width: 1024px) {
        grid-row: 3 / 4;
        grid-column: 2 / 6;
      }
    `,
  index === 9 &&
    `
      @media (min-width: 1024px) {
        grid-row: 3 / 4;
        grid-column: 6 / 7;
      }
    `,
  index === 10 &&
    `
      @media (min-width: 1024px) {
        grid-row: 2 / 4;
        grid-column: 7 / 8;
      }
     `
])

const Title = styled.div`
  margin-bottom: 30px;
  color: #65a11c;
  ${tw`text-lg lg:text-3xl ml-auto self-end`}
`

const BackgroundImageWrapper = styled.div`
  ${tw`absolute inset-0 w-full h-full`}
  background-image: url('/images/bg-4-mobile.jpg');
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

const NumberBlockWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 135px;
  left: 32px;
`

const RadialAnimationContainer = styled.div`
  position: absolute;
  left: 50%;
  top: -112px;
  width: 300px;
  height: 300px;
  transform: translateX(-50%);
  z-index: 10;
  opacity: 0.3;
  pointer-events: none;

  @media (min-width: ${BREAKPOINT_MD}px) {
    top: -30vw;
    width: 70vw;
    height: 70vw;
  }
`

export default ImageGallery
