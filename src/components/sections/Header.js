import React, { useEffect, useState } from 'react'
import Headroom from 'react-headroom'
import tw, { styled, css } from 'twin.macro'

import { ReactComponent as ArrowDropdown } from '../../images/svg/arrow-header-dropdown.svg'
import Container from '@atoms/Container'
import Logo from '@atoms/Logo'
import HeaderDropdown from './HeaderDropdown'
import { ReactComponent as NavIcon } from '../../images/svg/header-nav.svg'
import { PHONE_NUMBER } from '@constants/constants'
import { useLocator } from '@hooks/use-locator'
import formatPhoneLink from '@utils/format-phone-link'
import GlobalNav from '@sections/GlobalNav'
import StickyButton from '@atoms/StickyButton'
import { useHideLocalCta } from '../../hooks/use-hide-local-cta'
import { BREAKPOINT_MD } from '../../constants/constants'
import ChangeLocationDrawer from '@sections/ChangeLocationDrawer'

const Header = ({
  alwaysFixed,
  small,
  localCtaData,
  handleChangeLocation,
  hiddenForced
}) => {
  const { franchise: locatorFranchise } = useLocator()
  const franchise = localCtaData?.franchise
    ? localCtaData?.franchise
    : locatorFranchise

  const { yext } = franchise ?? {}
  const { mainPhone: frPhone } = yext ?? {}
  const hideLocalCta = useHideLocalCta()

  const [isGlobalNavVisible, setIsGlobalNavVisible] = useState(false)
  const [isDropdownMenuVisible, setIsDropdownMenuVisible] = useState(false)
  const [locationChangeVisible, setLocationChangeVisible] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = isGlobalNavVisible ? 'hidden' : ''
  }, [isGlobalNavVisible])

  const toggleDropdown = () => {
    const newState = franchise ? !isDropdownMenuVisible : false
    setIsDropdownMenuVisible(newState)
  }

  return (
    <>
      <HeadroomWrapper alwaysFixed={alwaysFixed} hiddenForced={hiddenForced}>
        <header css={[tw`w-full bg-white py-4 lg:py-8`, small && tw`lg:py-2`]}>
          <Container tw="flex items-center justify-between">
            <HeaderCol css={[tw`w-52 lg:w-72`, small && tw`lg:w-64`]}>
              <Logo />
            </HeaderCol>
            <div tw="flex items-center">
              <div tw="hidden mr-16 lg:block">
                <p
                  css={[
                    tw`text-primary text-lg mb-2 text-center`,
                    small && tw`mb-1`
                  ]}>
                  Call Today - 24/7 Emergency Services
                </p>
                <HeaderCol>
                  {!hideLocalCta && (
                    <>
                      <LocationFinder>
                        <LocationFinderLabel>
                          Your Local SERVPRO
                          {frPhone ? (
                            <PhoneLink href={`tel:${frPhone}`}>
                              {formatPhoneLink(frPhone)}
                            </PhoneLink>
                          ) : (
                            <span tw="block h-6 w-36 bg-warmGray-300 animate-pulse rounded-sm" />
                          )}
                        </LocationFinderLabel>
                        <button
                          tw="relative block ml-4 mr-2"
                          onMouseDown={event => event.stopPropagation()}
                          onClick={event => {
                            event.stopPropagation()
                            toggleDropdown()
                          }}>
                          <div tw="absolute -inset-1.5" />
                          <StyledArrowDropdown
                            menuopen={isDropdownMenuVisible ? 'true' : ''}
                          />
                        </button>
                        <HeaderDropdown
                          isVisible={isDropdownMenuVisible ? 'true' : ''}
                          onClose={() => setIsDropdownMenuVisible(false)}
                          onChangeLocation={() => {
                            setLocationChangeVisible(true)
                            setIsDropdownMenuVisible(false)
                          }}
                          handleChangeLocation={handleChangeLocation}
                          localCtaData={localCtaData}
                        />
                      </LocationFinder>
                      <DividerWrap>
                        <Divider />
                      </DividerWrap>
                    </>
                  )}
                  <ContactInfo>
                    National Call Center
                    <div tw="flex items-center">
                      <PhoneLink
                        className="hover-default"
                        href={`tel:${PHONE_NUMBER}`}>
                        1-800-SERVPRO
                      </PhoneLink>
                    </div>
                  </ContactInfo>
                </HeaderCol>
              </div>
              <button
                className="hover-default"
                onClick={() => setIsGlobalNavVisible(true)}>
                <NavIcon />
                <MenuText>Menu</MenuText>
              </button>
            </div>
          </Container>
        </header>
      </HeadroomWrapper>
      <ChangeLocationDrawer
        visible={locationChangeVisible}
        onClose={() => setLocationChangeVisible(false)}
      />
      <GlobalNav
        onClose={() => setIsGlobalNavVisible(false)}
        isVisible={isGlobalNavVisible}
      />
      {!hideLocalCta && (
        <StickyButton
          handleChangeLocation={handleChangeLocation}
          localCtaData={localCtaData}
          inverse={isGlobalNavVisible}
        />
      )}
    </>
  )
}

const HeadroomWrapper = styled(Headroom, {
  shouldForwardProp: prop => prop !== 'alwaysFixed'
})`
  position: relative;
  z-index: 200;

  ${props =>
    props.alwaysFixed &&
    css`
      @media (min-width: ${BREAKPOINT_MD}px) {
        .headroom {
          transition: transform 0.25s ease-out;
          transform: none !important;
        }
      }
    `};

  ${props =>
    props.hiddenForced &&
    css`
      @media (min-width: ${BREAKPOINT_MD}px) {
        .headroom {
          transition: transform 0.15s ease-in;
          transform: translate3d(0px, -100%, 0px) !important;
        }
      }
    `};
`
const HeaderCol = tw.div`flex items-center justify-end max-w-full`

const LocationFinder = styled.aside`
  ${tw`hidden relative lg:flex flex-row items-center justify-between pr-8`}
`
const LocationFinderLabel = tw.p`text-sm text-right`

const DividerWrap = tw.div`pr-8`
const Divider = styled.div`
  width: 1px;
  ${tw`content block bg-trueGray-300 h-14`}
`

const ContactInfo = tw.aside`
  hidden lg:flex
  flex-col
  text-sm text-right`
const PhoneLink = tw.a`block text-lg font-medium text-primary`
const StyledArrowDropdown = styled(ArrowDropdown)(({ menuopen }) => [
  tw`transform transition-transform`,
  menuopen && tw`rotate-180`
])

const MenuText = tw.span`hidden lg:block text-sm`

export default Header
