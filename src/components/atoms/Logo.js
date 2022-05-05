import React from 'react'
import tw from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'

import { ReactComponent as IconLogo } from '../../images/svg/logo.svg'

function Logo() {
  return (
    <StyledLink to="/">
      <IconLogo />
    </StyledLink>
  )
}

const StyledLink = tw(AccessibleLink)`w-full inline-block`

export default Logo
