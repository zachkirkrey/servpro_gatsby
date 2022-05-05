import React from 'react'
import { styled, css } from 'twin.macro'
import isPropValid from '@emotion/is-prop-valid'
import gsap from 'gsap'

const TextAnimation = ({
  shouldRun,
  children,
  duration = 3,
  delay = 0.3,
  isText = false,
  isBright
}) => {
  const textRef = React.useRef(null)
  const decorationRef = React.useRef(null)
  const isAnimationRunning = React.useRef(false)
  const TEXT_SPACE = '&nbsp;&nbsp;'

  function animateIn() {
    if (isAnimationRunning.current) {
      return
    }
    isAnimationRunning.current = true

    if (!textRef.current) {
      return
    }

    const original = children
    let counter = 0
    const maxCounter = original.length * duration * 2
    const breakpoint = maxCounter / 2
    const step = duration

    function update() {
      counter += 1
      let content
      if (isText) {
        content = String(generateText())
      } else {
        content = generateNumber()
      }

      if (counter >= maxCounter - 2) {
        content = original
      }

      if (!textRef.current) {
        return
      }

      textRef.current.innerHTML = content
    }

    function generateNumber() {
      let result = ''
      for (let i = 0; i < original.length; i += 1) {
        if (counter < breakpoint && counter < (original.length - i) * step) {
          result += original[i]
          continue
        }

        if (
          counter > breakpoint &&
          counter - breakpoint > (original.length - i) * step
        ) {
          result += original[i]
          continue
        }

        if (original[i] !== ' ') {
          result += Math.floor(Math.random() * 10)
        } else {
          result += ' '
        }
      }
      return result
    }

    function generateText() {
      let result = ''
      for (let i = 0; i < original.length; i += 1) {
        if (counter < step) {
          result += TEXT_SPACE
          continue
        }

        if (
          counter - (original.length - 2) * step >=
          (original.length - i) * step
        ) {
          result += original[i]
        } else if (counter >= (original.length - i) * step) {
          result += Math.floor(Math.random() * 10)
        } else {
          result += TEXT_SPACE
        }
      }
      return result
    }

    if (decorationRef.current) {
      gsap.set(decorationRef.current, { scaleX: 0 })
    }

    setTimeout(() => {
      gsap.ticker.fps(original.length * 2)
      gsap.ticker.add(update)
      setTimeout(() => {
        isAnimationRunning.current = false
        gsap.ticker.remove(update)
      }, (duration + 1) * 1000)
      if (decorationRef.current) {
        gsap.fromTo(
          decorationRef.current,
          duration,
          { scaleX: 0 },
          { scaleX: 1, ease: 'power1.easeOut' }
        )
      }
    }, delay * 1000)
  }

  React.useEffect(() => {
    if (shouldRun) {
      animateIn()
    } else {
      isAnimationRunning.current = false
    }
  }, [shouldRun])

  return (
    <>
      <Text isText={isText} isBright={isBright}>
        <div tw="relative">
          <span tw="absolute right-0 whitespace-nowrap" ref={textRef}>
            {children}
          </span>
          <span tw="opacity-0">{children}</span>
        </div>
        {isText && <TextDecoration ref={decorationRef} />}
      </Text>
    </>
  )
}

const Text = styled('div', {
  shouldForwardProp: prop =>
    isPropValid(prop) && !['isText', 'isBright'].includes(prop)
})`
  position: relative;
  color: #306e34;
  letter-spacing: 0.225em;
  ${props =>
    props.isText &&
    css`
      color: #6aa420;
      letter-spacing: 0.2em;
    `}
  ${props =>
    props.isBright &&
    css`
      color: #77bd20;
    `}
`

const TextDecoration = styled.span`
  position: absolute;
  right: 0;
  bottom: 2px;
  display: block;
  width: 100%;
  height: 2px;
  background-color: #65a11c;
  transform-origin: right;
  will-change: transform;
`

export default TextAnimation
