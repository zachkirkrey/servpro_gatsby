import React from 'react'
import tw from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'

function BackLink({ to, children, ...rest }) {
  return (
    <AccessibleLink css={tw`font-semibold text-xl`} to={to ?? '/'} {...rest}>
      ‹ Back To {children}
    </AccessibleLink>
  )
}

export default BackLink
