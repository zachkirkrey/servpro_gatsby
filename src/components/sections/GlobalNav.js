import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'
import Searchbar from '@atoms/Searchbar'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import { usePrimaryNav } from '@hooks/use-primary-nav'
import { useHideNationalCta } from '@hooks/use-hide-national-cta'

import CloseButton from '@atoms/CloseButton'
import { ReactComponent as LinkedinIcon } from '../../images/svg/linkedin.svg'
import { ReactComponent as TwitterIcon } from '../../images/svg/twitter.svg'
import { ReactComponent as YoutubeIcon } from '../../images/svg/youtube.svg'
import { ReactComponent as FacebookIcon } from '../../images/svg/facebook.svg'
import { ReactComponent as ArrowIcon } from '../../images/svg/arrow.svg'

import {
  SOCIAL_URL_FACEBOOK,
  SOCIAL_URL_LINKEDIN,
  SOCIAL_URL_TWITTER,
  SOCIAL_URL_YOUTUBE
} from '../../constants/constants'
import { SITE_SEARCH_PLACEHOLDER } from '../../constants/constants'

const GlobalNav = ({ isVisible, onClose }) => {
  const { nav_items: primaryNavLinks } = usePrimaryNav()
  const navWrapRef = React.useRef(null)

  const handleDocumentKeyDown = React.useCallback(event => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [])

  React.useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleDocumentKeyDown)
    } else {
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }

    return () => document.removeEventListener('keydown', handleDocumentKeyDown)
  }, [isVisible])

  React.useEffect(() => {
    if (!navWrapRef.current) {
      return
    }

    if (isVisible) {
      navWrapRef.current.style.visibility = 'visible'
    } else {
      setTimeout(() => {
        navWrapRef.current.style.visibility = 'hidden'
      }, 300)
    }
  }, [isVisible])

  return (
    <NavWrap isVisible={isVisible} ref={navWrapRef}>
      <div tw="hidden lg:block">
        <GlobalNavDesktop navItems={primaryNavLinks} onClose={onClose} />
      </div>
      <div tw="block lg:hidden">
        <GlobalNavMobile navItems={primaryNavLinks} onClose={onClose} />
      </div>
    </NavWrap>
  )
}

const GlobalNavDesktop = ({ onClose, navItems }) => {
  const [indexActiveItem, setIndexActiveItem] = useState(0)
  const { out_of_service_mode } = useHideNationalCta()

  const changeIndexActiveItem = index => {
    setIndexActiveItem(index)
  }

  function handleSearchbarFocus() {
    onClose()
  }

  return (
    <div tw="flex min-h-screen">
      <LeftWrap>
        <ul tw="mb-16 space-y-2">
          {navItems.map((navItem, index) => {
            const { nav_item_link, columns = [] } = navItem
            const { href, title } = nav_item_link
            return (
              <NavListItem
                key={index}
                isActive={index === indexActiveItem}
                onClick={() => changeIndexActiveItem(index)}>
                {columns.length > 0 ? (
                  <AccessibleLink>{title}&nbsp;+</AccessibleLink>
                ) : (
                  <AccessibleLink to={href}>{title}</AccessibleLink>
                )}
              </NavListItem>
            )
          })}
        </ul>
        <div tw="mt-auto">
          <SearchbarWrap>
            <Searchbar
              isWhite={true}
              placeholder={SITE_SEARCH_PLACEHOLDER}
              siteSearch
              onFocus={handleSearchbarFocus}
            />
          </SearchbarWrap>
          <div tw="w-48 mb-16">
            {!out_of_service_mode && (
              <>
                <p tw="font-bold text-lg mb-1">National Call Center</p>
                <p tw="font-bold text-lg mb-6">1-800-SERVPRO</p>
              </>
            )}
            <p>801 Industrial Blvd Gallatin, TN 37066</p>
          </div>
          <div tw="flex items-center space-x-9 mb-7">
            <SocialLink to={SOCIAL_URL_LINKEDIN} target="_blank">
              <LinkedinIcon />
            </SocialLink>
            <SocialLink to={SOCIAL_URL_TWITTER} target="_blank">
              <TwitterIcon />
            </SocialLink>
            <SocialLink to={SOCIAL_URL_YOUTUBE} target="_blank">
              <YoutubeIcon />
            </SocialLink>
            <SocialLink to={SOCIAL_URL_FACEBOOK} target="_blank">
              <FacebookIcon />
            </SocialLink>
          </div>
          <div tw="flex space-x-8 mb-9 text-xs">
            <AccessibleLink>Privacy Policy</AccessibleLink>
            <AccessibleLink>Terms of Service</AccessibleLink>
          </div>
          <p tw="text-xs">© 2020 SERVPRO. All rights reserved.</p>
        </div>
      </LeftWrap>
      <div tw="pl-16 pt-36">
        <CloseButton tw="top-10 right-16" onClick={onClose} />

        {navItems.map((item, index) => {
          const { columns } = item

          return (
            !!item?.columns &&
            index === indexActiveItem && (
              <div tw="grid pl-1 pt-5 xl:grid-cols-2 " key={index}>
                {columns.map((col, columnIndex) => {
                  const { group: groups } = col
                  return (
                    <LinksCol key={columnIndex}>
                      {groups.map((group, groupIndex) => {
                        const { category_link: link, icon, subgroup } = group

                        return (
                          <React.Fragment key={groupIndex}>
                            {/* eslint-disable-next-line no-nested-ternary */}
                            {!!subgroup && subgroup.length > 0 ? (
                              <LinksGroupBase key={link.title}>
                                {icon?.url ? (
                                  <LinkWithIcon to={link.href}>
                                    <SvgSafeGatsbyImage
                                      tw="mr-1 w-12"
                                      image={icon}
                                      alt={link.title}
                                    />
                                    {link.title}
                                  </LinkWithIcon>
                                ) : (
                                  <div tw="font-medium text-2xl ml-14">
                                    {link.href ? (
                                      <LinkWithoutIcon to={link.href}>
                                        {link.title}
                                      </LinkWithoutIcon>
                                    ) : (
                                      <TextLinkWithoutIcon>
                                        {link.title}
                                      </TextLinkWithoutIcon>
                                    )}
                                  </div>
                                )}

                                {subgroup.map(subgroupItem => (
                                  <LinksGroupWithHeading
                                    key={subgroupItem.title}>
                                    {subgroupItem.title !== '' &&
                                      !!subgroupItem.subgroup_link?.href && (
                                        <LinksGroupLinkHeading
                                          to={subgroupItem.subgroup_link.href}
                                          title={
                                            subgroupItem.subgroup_link.title
                                          }>
                                          {subgroupItem.title}
                                        </LinksGroupLinkHeading>
                                      )}
                                    {subgroupItem.title !== '' &&
                                      !subgroupItem.subgroup_link?.href && (
                                        <LinksGroupHeading>
                                          {subgroupItem.title}
                                        </LinksGroupHeading>
                                      )}
                                    <div tw="space-y-2 pl-5 pb-1">
                                      {subgroupItem.links.map(
                                        ({ href, title }) => (
                                          <BaseLink key={title} to={href}>
                                            {title}
                                          </BaseLink>
                                        )
                                      )}
                                    </div>
                                  </LinksGroupWithHeading>
                                ))}
                              </LinksGroupBase>
                            ) : icon?.url ? (
                              <>
                                <LinkWithIcon to={link.href}>
                                  <SvgSafeGatsbyImage
                                    tw="mr-1 w-12"
                                    image={icon}
                                    alt={link.title}
                                  />
                                  {link.title}
                                </LinkWithIcon>
                                <Divider />
                              </>
                            ) : (
                              <div tw="ml-14 font-medium text-2xl">
                                {link.href ? (
                                  <LinkWithoutIcon to={link.href}>
                                    {link.title}
                                  </LinkWithoutIcon>
                                ) : (
                                  <TextLinkWithoutIcon>
                                    {link.title}
                                  </TextLinkWithoutIcon>
                                )}
                              </div>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </LinksCol>
                  )
                })}
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

const GlobalNavMobile = ({ onClose, navItems }) => {
  const [indexActiveItem, setIndexActiveItem] = useState(null)

  const changeIndexActiveItem = index => {
    setIndexActiveItem(index)
  }

  const returnIndexActiveItem = () => {
    setIndexActiveItem(null)
  }

  function handleSearchbarFocus() {
    onClose()
  }

  return (
    <div tw="flex flex-col bg-primary text-white pt-28 min-h-screen">
      <CloseButton tw="top-5 right-5 bg-none" onClick={onClose} />
      <div tw="px-10 pb-14">
        <ul tw="space-y-2 mb-10">
          {navItems.map((navItem, index) => {
            const { nav_item_link, columns = [] } = navItem
            const { href, title } = nav_item_link

            return (
              <React.Fragment key={index}>
                {columns.length > 0 ? (
                  <NavListItem
                    key={index}
                    isActive={index === indexActiveItem}
                    onClick={() => changeIndexActiveItem(index)}>
                    <AccessibleLink>{title}&nbsp;+</AccessibleLink>
                  </NavListItem>
                ) : (
                  <NavListItem key={index} isActive={index === indexActiveItem}>
                    <AccessibleLink to={href}>{title}</AccessibleLink>
                  </NavListItem>
                )}
              </React.Fragment>
            )
          })}
        </ul>
        <div tw="mb-12">
          <Searchbar
            isWhite={true}
            placeholder={SITE_SEARCH_PLACEHOLDER}
            siteSearch
            onFocus={handleSearchbarFocus}
          />
        </div>
        <p tw="text-sm mb-12">
          24/7 Nationwide <br /> Service{' '}
          <span tw="text-2xl">1-800-SERVPRO</span>
        </p>
      </div>
      {indexActiveItem !== null && (
        <ActiveSection>
          <ActiveSectionHeading onClick={returnIndexActiveItem}>
            <ArrowIcon tw="mr-6" />
            {navItems[indexActiveItem].title}
          </ActiveSectionHeading>
          <div tw="pl-10 pr-10 mb-9">
            {navItems[indexActiveItem].columns &&
              navItems[indexActiveItem].columns.length > 0 &&
              navItems[indexActiveItem].columns.map(column => {
                return column.group.map(
                  ({ category_link, icon_inverse, subgroup }) => {
                    return (
                      <React.Fragment key={category_link.title}>
                        {subgroup.length > 0 ? (
                          <>
                            <div tw="flex items-center whitespace-nowrap">
                              {!!icon_inverse?.url && (
                                <SvgSafeGatsbyImage
                                  tw="mr-1 w-12"
                                  image={icon_inverse}
                                  alt={category_link.title}
                                />
                              )}
                              <MobileLink to={category_link.href}>
                                {category_link.title}
                              </MobileLink>
                            </div>
                            {subgroup.map(
                              ({ title, subgroup_link, links }, index) => {
                                const { href: linkHref, title: linkTitle } =
                                  subgroup_link
                                return (
                                  <React.Fragment key={index}>
                                    {title !== '' && !!linkHref && (
                                      <MobileSubgroupLink
                                        to={linkHref}
                                        title={linkTitle}>
                                        {title}
                                      </MobileSubgroupLink>
                                    )}
                                    {title !== '' && !linkHref && (
                                      <p tw="font-semibold text-xl ml-3">
                                        {title}
                                      </p>
                                    )}
                                    {links.map(
                                      (
                                        { href, title: subgroupLinkTitle },
                                        linkIndex
                                      ) => {
                                        return (
                                          <MobileLinkSmall
                                            key={linkIndex}
                                            to={href}>
                                            {subgroupLinkTitle}
                                          </MobileLinkSmall>
                                        )
                                      }
                                    )}
                                  </React.Fragment>
                                )
                              }
                            )}
                          </>
                        ) : (
                          <div tw="flex items-center">
                            {!!icon_inverse?.url && (
                              <SvgSafeGatsbyImage
                                tw="mr-1 w-12"
                                image={icon_inverse}
                                alt={category_link.title}
                              />
                            )}
                            <MobileLink to={category_link.href}>
                              {category_link.title}
                            </MobileLink>
                          </div>
                        )}
                      </React.Fragment>
                    )
                  }
                )
              })}
          </div>
          <div tw="px-10 mt-auto">
            <div tw="mb-12">
              <Searchbar
                isWhite
                placeholder={SITE_SEARCH_PLACEHOLDER}
                siteSearch
                onFocus={handleSearchbarFocus}
              />
            </div>
            <p tw="text-sm mb-12">
              24/7 Nationwide <br /> Service{' '}
              <span tw="text-2xl">1-800-SERVPRO</span>
            </p>
          </div>
        </ActiveSection>
      )}
    </div>
  )
}

const NavWrap = styled.div(({ isVisible }) => [
  tw`invisible opacity-0 transition-opacity duration-300 ease-out fixed z-250 top-0 left-0 w-full h-full bg-white`,
  `overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  will-change: opacity;
  `,
  isVisible && tw`opacity-100`
])

const SocialLink = styled(AccessibleLink)`
  svg {
    fill: white;
  }
`
const LeftWrap = styled.div`
  ${tw`flex flex-col bg-primary text-white pl-32 pr-24 pt-20 pb-10`}
  @media (min-width: 1025px) {
    max-width: 612px;
    width: 100%;
    clip-path: polygon(0% 0%, 74% 0%, 100% 50%, 74% 100%, 0% 100%);
  }
`
const NavListItem = styled.li(({ isActive }) => [
  `font-weight: 350; button {font-weight: 350}`,
  tw`text-36px opacity-100 xl:(text-42px opacity-70)`,
  isActive && tw`xl:opacity-100`
])
const LinksCol = styled.div`
  ${tw`space-y-6 pl-1`}
  &:last-of-type {
    ${tw`xl:ml-9`}
  }
`
const Divider = styled.div`
  background-color: #f5f5f5;
  height: 1px;
  ${tw`w-full`};
`
const LinksGroupWithHeading = styled.div`
  padding-left: 54px;
  padding-bottom: 10px;
`
const LinksGroupBase = tw.div`space-y-1`
const LinksGroupHeading = tw.p`font-semibold text-lg mb-3`
const LinksGroupLinkHeading = tw(AccessibleLink)`font-semibold text-lg mb-3`
const LinkWithIcon = styled(AccessibleLink)`
  ${tw`flex items-center font-medium text-2xl focus:outline-none`}
`
const LinkWithoutIcon = styled(AccessibleLink)`
  ${tw`flex focus:outline-none`}
`
const TextLinkWithoutIcon = styled.span`
  ${tw`flex cursor-default`}
`
const BaseLink = tw(AccessibleLink)`
  flex text-lg pl-1`
const SearchbarWrap = styled.div`
  max-width: 306px;
  ${tw`pt-2 mb-14`}
`
const ActiveSection = styled.div`
  padding: 65px 0 65px;
  min-height: 960px;
  ${tw`flex flex-col bg-primary absolute top-0 w-full min-h-screen z-20`}
`
const ActiveSectionHeading = styled.h3`
  svg {
    fill: white;
  }
  ${tw`flex items-center mb-4 px-10 text-4xl`}
`
const MobileLink = tw(AccessibleLink)`
  text-2xl text-white my-3
`
const MobileLinkSmall = styled(AccessibleLink)`
  font-size: 21px;
  ${tw`block text-white ml-6 mt-2 mb-3`}
`

const MobileSubgroupLink = tw(AccessibleLink)`
  font-semibold text-xl ml-3
`

export default GlobalNav
