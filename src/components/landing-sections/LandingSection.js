import React from 'react'
import { styled, css } from 'twin.macro'

import { BREAKPOINT_MD } from '../../constants/constants'

function LandingSection({ children, isHero, ...props }, ref) {
  return (
    <StyledLandingSection ref={ref} isHero={isHero}>
      <Inner {...props}>{children}</Inner>
    </StyledLandingSection>
  )
}

LandingSection = React.forwardRef(LandingSection)

const StyledLandingSection = styled.section`
  overflow: hidden;

  @media (min-width: ${BREAKPOINT_MD}px) {
    position: relative;
    width: 100%;
    height: 100vh;
    //scroll-snap-align: start;
    //scroll-snap-stop: always;

    ${props =>
      props.isHero &&
      css`
        //height: 200vh;
      `};
  }
`

const Inner = styled.div`
  @media (min-width: ${BREAKPOINT_MD}px) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-top: 66px;
  }
`

export default LandingSection
