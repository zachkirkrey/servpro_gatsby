import React from 'react'
import tw, { css, styled } from 'twin.macro'
import gsap from 'gsap'

import { scrollLocker } from '../utils/scrollLocker'
import { useIsElementOutsideClick } from '../../hooks/is-element-outside-click'
import CloseButton from '../atoms/CloseButton'
import { BREAKPOINT_MD, BREAKPOINT_SM } from '../../constants/constants'
import LoadingSpinner from '../atoms/loading/LoadingSpinner'

import { ReactComponent as ArrowIcon } from '../../images/svg/arrow.svg'
import ReactPlayer from 'react-player'

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif']

function MediaModal({
  paths,
  currentIndex,
  mediaPath,
  visible,
  prev,
  next,
  close
}) {
  const containerRef = React.useRef(null)
  const modalBoxRef = React.useRef(null)
  useIsElementOutsideClick({
    element: modalBoxRef.current,
    enabled: visible,
    actionCallback: close
  })
  const [spinnerIsHidden, setSpinnerIsHidden] = React.useState(false)
  const canDoPrev = paths.length > 0 && currentIndex > 0
  const canDoNext = paths.length > 0 && currentIndex < paths.length - 1

  const isVideoLink = React.useMemo(() => {
    if (!mediaPath) {
      return false
    }
    const extension = mediaPath.split('.').slice(-1)[0]
    return !IMAGE_EXTENSIONS.includes(extension)
  }, [mediaPath])

  const handleDocumentKeyDown = React.useCallback(
    event => {
      if (event.key === 'Escape') {
        close()
      }
      if (event.key === 'ArrowRight' && canDoNext) {
        next()
      }
      if (event.key === 'ArrowLeft' && canDoPrev) {
        prev()
      }
    },
    [prev, next]
  )

  React.useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleDocumentKeyDown)
      setSpinnerIsHidden(false)
    } else {
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }
    return () => document.removeEventListener('keydown', handleDocumentKeyDown)
  }, [visible, prev, next])

  React.useEffect(() => {
    if (!containerRef.current) {
      return
    }

    gsap.killTweensOf([containerRef.current, modalBoxRef.current])

    if (visible) {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.55,
          ease: 'power1.easeOut'
        }
      )
      gsap.fromTo(
        modalBoxRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          delay: 0.2,
          ease: 'power1.easeOut'
        }
      )
      scrollLocker.lock()
    } else {
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power1.easeIn',
        delay: 0.2
      })
      gsap.to(modalBoxRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.55
      })
      scrollLocker.unlock()
    }
  }, [visible])

  function handleBoxClick(event) {
    event.stopPropagation()
  }

  function handleVideoLoaded() {
    setSpinnerIsHidden(true)
  }

  function renderVideoPlayer() {
    return (
      mediaPath && (
        <StyledPlayer
          url={mediaPath}
          className="react-player"
          playing={true}
          controls={true}
          onReady={handleVideoLoaded}
        />
      )
    )
  }

  return (
    <StyledMediaModal tw="fixed inset-0" ref={containerRef}>
      <div tw="absolute inset-0 bg-black opacity-60" />
      <div tw="absolute inset-0 flex items-center justify-center">
        <ModalBox
          isVideo={isVideoLink}
          ref={modalBoxRef}
          onClick={event => event.stopPropagation()}>
          {!spinnerIsHidden && (
            <SpinnerContainer tw="absolute inset-0 flex items-center justify-center bg-black">
              <LoadingSpinner />
            </SpinnerContainer>
          )}
          <div tw="flex items-center justify-between absolute inset-0 -right-10 -left-10 lg:(-right-16 -left-16)">
            <ModalButton
              css={[!canDoPrev && tw`invisible`]}
              onMouseDown={event => {
                event.stopPropagation()
                prev()
              }}>
              <StyledArrowIcon />
            </ModalButton>
            <ModalButton
              css={[!canDoNext && tw`invisible`]}
              onMouseDown={event => {
                event.stopPropagation()
                next()
              }}>
              <StyledArrowIcon tw="transform rotate-180" />
            </ModalButton>
          </div>
          <div tw="relative w-full h-full" onClick={handleBoxClick}>
            {isVideoLink ? (
              renderVideoPlayer()
            ) : (
              <img src={mediaPath} alt="Media Image" />
            )}
          </div>
          <CloseButton
            tw="absolute -right-1 top-0 transform lg:translate-x-full -translate-y-full"
            onClick={() => close()}
          />
        </ModalBox>
      </div>
    </StyledMediaModal>
  )
}

const StyledMediaModal = styled.div`
  z-index: 3000;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
`
const ModalBox = styled.div`
  position: relative;
  opacity: 0;
  will-change: transform;
  min-height: 150px;
  min-width: 300px;
  max-width: 85vw;

  @media (min-width: ${BREAKPOINT_SM}px) {
    min-height: 300px;
    min-width: 450px;
    max-width: 80vw;
  }

  @media (min-width: ${BREAKPOINT_MD}px) {
    max-width: 90vw;
  }

  ${props =>
    !props.isVideo &&
    css`
      img {
        max-height: 80vh;
      }
    `};
`

const StyledArrowIcon = styled(ArrowIcon)`
  fill: white;
`
const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;

  svg {
    width: 30px;
    height: 30px;
  }
`

const SpinnerContainer = styled.div`
  z-index: -1;
  pointer-events: none;
`

const StyledPlayer = styled(ReactPlayer)`
  width: 80vw !important;
  height: auto !important;
  max-height: 100vh;

  &:before {
    content: '';
    padding-top: 56.25%;
    display: block;
  }

  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

export default MediaModal
