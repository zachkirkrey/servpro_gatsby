import React from 'react'
import tw from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'

const DummyLogo = () => (
  <LogoPlaceholder>
    <AccessibleLink className="hover-default" to="/">
      Servpro Logo
    </AccessibleLink>
  </LogoPlaceholder>
)

const LogoPlaceholder = tw.h1`
  inline-flex items-center justify-center
  h-16 w-72 max-w-full
  bg-primary`

export default DummyLogo
