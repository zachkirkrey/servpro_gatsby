import React from 'react'
import tw, { styled } from 'twin.macro'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

gsap.registerPlugin(TextPlugin)

function Corner(props, ref) {
  return (
    <StyledCorner {...props} ref={ref}>
      <CornerInner />
    </StyledCorner>
  )
}

Corner = React.forwardRef(Corner)

function BoxedText({ text, smallPadding, shouldRunAnimation, ...rest }) {
  const containerRef = React.useRef(null)
  const textRef = React.useRef(null)
  const textGlitchRef = React.useRef(null)
  const cornersRef = React.useRef(null)
  const cornerTopLeftRef = React.useRef(null)
  const cornerTopRightRef = React.useRef(null)
  const cornerBottomLeftRef = React.useRef(null)
  const cornerBottomRightRef = React.useRef(null)

  const animateIn = React.useCallback(() => {
    function animateCorners() {
      gsap.fromTo(
        cornersRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power1.easeOut' }
      )

      gsap.fromTo(
        cornersRef.current,
        { scale: 0.85 },
        { scale: 1, duration: 0.7, ease: 'power1.easeOut' }
      )
      gsap.set(cornersRef.current, { opacity: 0, delay: 0.3 })
      gsap.set(cornersRef.current, { opacity: 0.8, delay: 0.45 })

      const width = cornersRef.current.offsetWidth
      const height = cornersRef.current.offsetHeight
      const cornerWidth = cornerTopLeftRef.current.offsetWidth
      const cornerHeight = cornerTopLeftRef.current.offsetHeight
      function createCornerToVars() {
        return { x: 0, y: 0, delay: 0.5, duration: 0.5, ease: 'power1.easeOut' }
      }
      gsap.fromTo(
        cornerTopLeftRef.current,
        {
          x: width / 2 - cornerWidth / 2,
          y: height / 2 - cornerHeight / 2
        },
        createCornerToVars()
      )
      gsap.fromTo(
        cornerTopRightRef.current,
        {
          x: -width / 2 + cornerWidth / 2,
          y: height / 2 - cornerHeight / 2
        },
        createCornerToVars()
      )
      gsap.fromTo(
        cornerBottomLeftRef.current,
        {
          x: width / 2 - cornerWidth / 2,
          y: -height / 2 + cornerHeight / 2
        },
        createCornerToVars()
      )
      gsap.fromTo(
        cornerBottomRightRef.current,
        {
          x: -width / 2 + cornerWidth / 2,
          y: -height / 2 + cornerHeight / 2
        },
        createCornerToVars()
      )
    }

    gsap.to(cornersRef.current, { x: -80, y: -20, delay: 1, duration: 0.04 })
    gsap.to(cornersRef.current, { x: 0, y: 0, delay: 1.04, duration: 0.04 })

    gsap.set(textGlitchRef.current, {
      opacity: 1,
      delay: 0.98
    })
    gsap.to(textGlitchRef.current, {
      x: -50,
      y: -10,
      delay: 0.98,
      duration: 0.04,
      ease: 'power4.easeInOut'
    })
    gsap.to(textGlitchRef.current, {
      opacity: 0,
      clearProps: 'all',
      delay: 1.04,
      duration: 0.02,
      ease: 'power4.easeInOut'
    })

    gsap.fromTo(
      textRef.current,
      { x: -20, y: -20 },
      { x: 0, y: 0, duration: 0.4, delay: 0.6, ease: 'power1.easeOut' }
    )

    gsap.fromTo(
      textRef.current,
      { text: '' },
      {
        text,
        duration: 1.2,
        delay: 0.6,
        ease: 'none'
      }
    )

    animateCorners()
  }, [])

  React.useEffect(() => {
    if (shouldRunAnimation) {
      animateIn()
    } else {
      gsap.killTweensOf(textRef.current)
      textRef.current.innerText = ''
    }

    return () => {
      gsap.killTweensOf(textRef.current)
    }
  }, [shouldRunAnimation])

  return (
    <StyledBoxedText className="font-family-video" ref={containerRef} {...rest}>
      <Corners ref={cornersRef} smallPadding={smallPadding}>
        <Corner ref={cornerTopLeftRef} data-position="top-left" />
        <Corner ref={cornerTopRightRef} data-position="top-right" />
        <Corner ref={cornerBottomLeftRef} data-position="bottom-left" />
        <Corner ref={cornerBottomRightRef} data-position="bottom-right" />
      </Corners>
      <TextWrapper>
        <GlitchedText
          ref={textGlitchRef}
          dangerouslySetInnerHTML={{ __html: text }}
          tw="opacity-0"
        />
        <Text ref={textRef} tw="absolute left-0 top-0" />
      </TextWrapper>
    </StyledBoxedText>
  )
}

const StyledBoxedText = styled.div`
  ${tw`relative py-6 px-8 md:px-8`}
  width: 100%;
  color: #76b32c;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    width: 360px;
    min-height: 200px;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    width: 560px;
    min-height: 285px;
  }
`
const Text = styled.p`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.21em;
  line-height: 1.45;
  text-shadow: 3px 3px 20px rgb(0, 0, 0, 0.3);

  @media (min-width: 1024px) {
    font-size: 40px;
    white-space: nowrap;
  }
`
const GlitchedText = styled(Text)`
  clip-path: inset(10% 0 56%);
`
const Corners = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  filter: blur(1px);
  will-change: transform;
  opacity: 0;
  background: rgba(0, 0, 0, 0.4);
`
const CornerInner = styled.div`
  display: flex;

  &::before,
  &::after {
    display: block;
    background-color: currentColor;
    content: '';
    transform-origin: top left;
  }
`
const StyledCorner = styled.div`
  position: absolute;
  will-change: transform;

  ${CornerInner} {
    &:before {
      width: 4px;
      height: 32px;
    }

    &:after {
      width: 26px;
      height: 4px;
    }
  }

  &[data-position='top-left'] {
    top: 0;
    left: 0;
  }

  &[data-position='top-right'] {
    top: 0;
    right: 0;

    ${CornerInner} {
      transform: scaleX(-1);
    }
  }

  &[data-position='bottom-left'] {
    bottom: 0;
    left: 0;

    ${CornerInner} {
      transform: scaleY(-1);
    }
  }

  &[data-position='bottom-right'] {
    bottom: 0;
    right: 0;

    ${CornerInner} {
      transform: scale(-1, -1);
    }
  }
`
const TextWrapper = styled.div(() => [tw`relative`])

export default BoxedText
