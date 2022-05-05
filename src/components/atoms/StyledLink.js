import React from 'react'
import tw from 'twin.macro'
import AccessibleLink from './AccessibleLink'

function StyledLink(props) {
  return <Link {...props} />
}

const Link = tw(AccessibleLink)`text-primary`

export default StyledLink
