import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import throttle from 'lodash/throttle'

import { ReactComponent as IconPhone } from '@images/svg/phone.svg'
import { ReactComponent as IconArrowInCircle } from '@images/svg/arrow-in-circle.svg'
import LocationDetail from '@sections/LocationDetail'
import isPropValid from '@emotion/is-prop-valid'
import formatPhoneLink from '../utils/format-phone-link'
import AccessibleLink from './AccessibleLink'
import { useLocator } from '../../hooks/use-locator'

const StickyButton = ({ inverse, handleChangeLocation, localCtaData }) => {
  const [isLocationDetailVisible, setIsLocationDetailVisible] = useState(false)
  const [isBottomContentVisible, setIsBottomContentVisible] = useState(true)
  const lastScrollTop = React.useRef(0)

  const { franchise: locatorFranchise } = useLocator()

  const franchise = localCtaData?.franchise
    ? localCtaData?.franchise
    : locatorFranchise

  const { yext } = franchise ?? {}

  const { mainPhone: frPhone } = yext ?? {}

  React.useEffect(() => {
    document.documentElement.style.overflow = isLocationDetailVisible
      ? 'hidden'
      : ''
  }, [isLocationDetailVisible])

  React.useEffect(() => {
    const scrollHandler = throttle(() => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop

      if (currentScrollTop === 0 || lastScrollTop.current === 0) {
        setIsBottomContentVisible(true)
      } else {
        setIsBottomContentVisible(currentScrollTop < lastScrollTop.current)
      }

      lastScrollTop.current = currentScrollTop
    }, 200)

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <>
      <FooterMobileStickyWrapper
        isBottomContentVisible={isBottomContentVisible}
        inverse={inverse}>
        <FooterMobileBigButton onClick={() => setIsLocationDetailVisible(true)}>
          <div tw="relative flex items-center">
            <StyledIconPhone inverse={inverse} tw="mr-4" />
            <p tw="xs:text-xl font-semibold tracking-wide">Call for Service</p>
          </div>
          <ArrowIconWrapper>
            <StyledIconArrow inverse={inverse} />
          </ArrowIconWrapper>
        </FooterMobileBigButton>
        <MobileButtonsWrap isBottomContentVisible={isBottomContentVisible}>
          <FooterMobileButton to={`tel: +${formatPhoneLink(frPhone)}`}>
            Your Local SERVPRO <br />
            {frPhone ? (
              <span tw="text-sm xs:text-lg">{formatPhoneLink(frPhone)}</span>
            ) : (
              <div tw="h-2 w-full xs:(h-4 w-[140px]) pt-2 mt-2 bg-warmGray-300 animate-pulse rounded-md" />
            )}
          </FooterMobileButton>
          <Divider inverse={inverse} />
          <FooterMobileButton to={`tel: +${formatPhoneLink(frPhone)}`}>
            National Call Center <br />
            <span tw="text-sm xs:text-lg">1-800-SERVPRO</span>
          </FooterMobileButton>
        </MobileButtonsWrap>
      </FooterMobileStickyWrapper>
      <LocationDetail
        onClose={() => setIsLocationDetailVisible(false)}
        isVisible={isLocationDetailVisible}
        handleChangeLocation={handleChangeLocation}
        localCtaData={localCtaData}
      />
    </>
  )
}

const Divider = styled.div(({ inverse }) => [
  tw`w-[1px] h-[30px] mx-1 xs:(mx-3 h-[40px])`,
  inverse ? tw`bg-primary` : tw`bg-white`
])
const FooterMobileStickyWrapper = styled.div(
  ({ inverse, isBottomContentVisible }) => [
    `max-width: 100vw;
    font-size: 16px;
    z-index: 250;`,
    tw`fixed bottom-0 bg-primary text-center text-white transition-colors w-full lg:hidden`,
    inverse && tw`bg-white text-primary`,
    `transition: transform 0.15s ease-in;`,
    isBottomContentVisible && `translate-y-0`,
    !isBottomContentVisible &&
      `
      transform: translate3d(0px, 41px, 0px) !important;
      @media (min-width: 376px) {
        transform: translate3d(0px, 53px, 0px) !important;
      }`
  ]
)
const FooterMobileBigButton = styled.button`
  ${tw`relative flex items-center justify-center w-full lg:hidden py-4 w-full xs:py-6`}
`
const ArrowIconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  ${tw`flex items-center`}
`

const StyledIconArrow = styled(IconArrowInCircle, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'inverse'
})(({ inverse }) => [
  `
    width: 20px;
    fill: white;`,
  tw`transition-colors`,
  inverse && `fill: #FF6600;`
])
const StyledIconPhone = styled(IconPhone, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'inverse'
})(({ inverse }) => [
  tw`transition-colors`,
  `fill: white;`,
  inverse && `fill: #FF6600;`
])

const FooterMobileButton = styled(AccessibleLink)`
  font-size: 12px;
  flex-grow: 1;
  text-align: left;
  font-weight: 600;
  line-height: 1;
  padding: 0 3px 7px 10px;
  white-space: nowrap;

  @media (min-width: 376px) {
    font-size: 16px;
    padding: 0 5px 10px 15px;
  }
`
const MobileButtonsWrap = styled.div(({ isBottomContentVisible }) => [
  tw`flex px-[10px] transform`,
  `transition: transform 0.15s ease-in;`,
  `font-display: block`,
  isBottomContentVisible && `translate-y-0`,
  !isBottomContentVisible &&
    `
    transform: translate3d(0px, 41px, 0px) !important;
    @media (min-width: 376px) {
      transform: translate3d(0px, 53px, 0px) !important;
    }`
])

export default StickyButton
