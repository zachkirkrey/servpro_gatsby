import React from 'react'
import { Link } from 'gatsby'
import { styled } from 'twin.macro'
// import isOutsideLink from '@utils/isOutsideLink'
import withLocation from '@utils/withLocation'

function AccessibleLink({
  className,
  children,
  to,
  type = 'button',
  onClick,
  // location,
  ...rest
}) {
  if (to) {
    // Is '#null' from the CMS or begins with a '/'
    const isRelative = to === '#null' || /^\/(?!\/)/.test(to)
    const isAnchor = !!to && typeof to === 'string' && to.startsWith('#')
    // const target = isOutsideLink(to, location) ? '_blank' : null

    return isRelative || isAnchor ? (
      <Link
        to={to}
        className={`hover-default ${className ? className : ''}`}
        onClick={onClick}
        {...rest}>
        {children}
      </Link>
    ) : (
      <a
        href={to}
        className={`hover-default ${className ? className : ''}`}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Button
      className={`hover-default active:outline-none ${
        className ? className : ''
      }`}
      type={type}
      onClick={onClick}
      {...rest}>
      {children}
    </Button>
  )
}

const Button = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 0;
  -webkit-appearance: none;
  text-decoration: none;
  user-select: none;

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export default withLocation(AccessibleLink)
