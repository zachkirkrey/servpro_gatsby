import React from 'react'
import tw from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'

const dummyData = {
  crumbs: [
    {
      href: '/',
      text: 'Breadcrumb 1'
    },
    {
      href: '/',
      text: 'Breadcrumb 2'
    },
    {
      href: '/',
      text: 'Breadcrumb 3'
    }
  ]
}

const Breadcrumbs = ({ data }) => {
  const { crumbs } = data || dummyData
  const enabled = false;
  
  return (enabled) ? (
    <Nav aria-labelledby="breadcrumbs-label">
      <NavLabel id="breadcrumbs-label">Breadcrumbs</NavLabel>
      <NavLinks>
        {crumbs.map(crumb => (
          <NavLink className="hover-default" key={crumb.text} to={crumb.href}>
            {crumb.text}
          </NavLink>
        ))}
      </NavLinks>
    </Nav>
  ) : (<></>)
}

const Nav = tw.nav`text-primary pb-8`
const NavLabel = tw.h3`sr-only`
const NavLinks = tw.ul`
  flex flex-wrap items-center
  divide-x divide-primary`
const NavLink = tw(AccessibleLink)`tracking-wider text-sm font-medium px-2`

export default Breadcrumbs
