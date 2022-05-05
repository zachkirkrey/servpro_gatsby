import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import AccessibleLink from '@atoms/AccessibleLink'
import { ReactComponent as ArrowDownIcon } from '@images/svg/arrow-down.svg'

const Subnav = ({ data }) => {
  const { subnav } = data
  const { title, nav_link: links } = subnav ? subnav[0] : []
  const [mobileDropdownVisible, setMobileDropdownVisible] =
    React.useState(false)

  return (
    <Nav aria-labelledby="subnav-label">
      <NavLabel id="subnav-label">{`${title} Sub Navigation`}</NavLabel>
      <Container>
        <NavLinks>
          {links.map(link => (
            <NavLink className="hover-default" to={link.href} key={link.title}>
              {link.title}
            </NavLink>
          ))}
        </NavLinks>
        <div
          tw="relative xl:hidden bg-primary text-white text-2xl"
          onClick={() => setMobileDropdownVisible(state => !state)}>
          <AccessibleLink tw="flex items-center justify-center w-full">
            {title}
            <ArrowDownIcon
              css={[tw`ml-12 transform transition`, mobileDropdownVisible && tw`rotate-180`]}
            />
          </AccessibleLink>
        </div>
      </Container>
      <MobileDropdown
        tw="absolute top-full left-0 w-full z-30 bg-primary xl:hidden"
        visible={mobileDropdownVisible}>
        <Container tw="flex flex-col items-center">
          {links.map(link => {
            return (
              <AccessibleLink
                className="hover-default"
                tw="py-4 text-lg"
                to={link.href}
                key={link.title}>
                {link.title}
              </AccessibleLink>
            )
          })}
        </Container>
      </MobileDropdown>
    </Nav>
  )
}

const Nav = tw.nav`relative text-white bg-primary py-3 xl:py-4`
const NavLabel = tw.h3`sr-only`
const NavLinks = tw.ul`hidden justify-start flex-nowrap xl:flex`
const NavLink = styled(AccessibleLink)`
  border-right: 1px solid white;
  padding-right: 9px;
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
    border-color: transparent;
  }
  ${tw`font-normal`}
`

const MobileDropdown = styled.div`
  transition: max-height 0.5s ease-in;
  max-height: 0;
  overflow: hidden;

  ${props =>
    props.visible &&
    `
    max-height: 1500px;
    transition-duration: 1s;
  `};
`

export const query = graphql`
  fragment SubnavData on CmsPageBuilderBlocks {
    subnav_stripe {
      subnav {
        title
        nav_link {
          href
          title
        }
      }
    }
  }
`

export default Subnav
