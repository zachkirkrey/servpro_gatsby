import React from 'react'
import gsap from 'gsap'
import tw, { styled } from 'twin.macro'

const PlayButton = ({ onClick, small, dark, ...props }) => {
  const buttonRef = React.useRef(null)

  function handleClick(event) {
    const tl = gsap.timeline()
    tl.set(buttonRef.current, { opacity: 0 })
    tl.set(buttonRef.current, { opacity: 1 }, '+=0.1')
    tl.set(buttonRef.current, { opacity: 0 }, '+=0.1')
    tl.set(buttonRef.current, { opacity: 1 }, '+=0.1')
    tl.set(buttonRef.current, { opacity: 0 }, '+=0.1')
    tl.set(buttonRef.current, { opacity: 1 }, '+=0.1')
    setTimeout(() => {
      onClick?.(event)
    }, 240)
  }

  return (
    <PlayButtonContent
      isSmall={small}
      isDark={dark}
      ref={buttonRef}
      {...props}
      onClick={handleClick}>
      <SvgWrapper isSmall={small}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
          {dark ? (
            <path
              stroke="none"
              fill="#5b9119"
              d="M26.401923788647 5.1532124826824a3 3 0 0 1 5.1961524227066 0l25.803847577293 44.693575034635a3 3 0 0 1 -2.5980762113533 4.5l-51.607695154587 0a3 3 0 0 1 -2.5980762113533 -4.5"
            />
          ) : (
            <path
              stroke="none"
              fill="#65a11c"
              d="M26.401923788647 5.1532124826824a3 3 0 0 1 5.1961524227066 0l25.803847577293 44.693575034635a3 3 0 0 1 -2.5980762113533 4.5l-51.607695154587 0a3 3 0 0 1 -2.5980762113533 -4.5"
            />
          )}
        </svg>
      </SvgWrapper>
    </PlayButtonContent>
  )
}

const PlayButtonContent = styled.button(({ isSmall, isDark }) => [
  `display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  width: 90px;
  height: 90px;
  border: 7px solid #65a11c;
  border-radius: 15px;
  filter: blur(0.5px);
  opacity: 0.8;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  transition: transform 0.55s ease-out;
  will-change: transform;
  box-shadow: 0 0 8px #65a11c, inset 0 0 8px #65a11c;

  @media (min-width: 1024px) {
    width: 125px;
    height: 125px;
    filter: blur(1px);
  }

  &:hover {
    transform: scale(1.1);

    svg {
      transform: scale(1.05) rotate(90deg);
      transition-duration: 0.6s;
    }
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`,
  isSmall &&
    `
  border-width: 6px;
  width: 70px;
  height: 70px;
  box-shadow: 0 0 12px rgba(0,0,0, 0.2), inset 0 0 12px rgba(0,0,0, 0.2), 0 0 8px #65a11c, inset 0 0 8px #65a11c;

  @media (min-width: 1024px) {
    width: 100px;
    height: 100px;
    filter: blur(1px);
  }`,
  isDark &&
    'border: 6px solid #5b9119; box-shadow: 0 0 8px #5b9119, inset 0 0 8px #5b9119; opacity: 0.9;'
])

const SvgWrapper = styled.div(({ isSmall }) => [
  `
  position: relative;
  width: 40px;
  height: 40px;

  @media (min-width: 1024px) {
    width: 58px;
    height: 58px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  svg {
    width: 40px;
    height: 40px;
    filter: drop-shadow(0 0 5px #65a11c);
    transform: rotate(90deg);

    @media (min-width: 1024px) {
      width: 58px;
      height: 58px;
    }
  }`,
  isSmall &&
    `
  width: 25px;
  height: 25px;

  @media (min-width: 1024px) {
    width: 45px;
    height: 45px;
  }
  svg {
    width: 25px;
    height: 25px;
    filter: drop-shadow(0 0 5px #65a11c);
    transform: rotate(90deg);

    @media (min-width: 1024px) {
      width: 45px;
      height: 45px;
    }
  }`
])

export default PlayButton
