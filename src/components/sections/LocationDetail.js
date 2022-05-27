import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'

import AccessibleLink from '@atoms/AccessibleLink'
import Button from '@atoms/Button'
import { useLocator } from '@hooks/use-locator'
import formatPhoneLink from '@utils/format-phone-link'
import { RatingSummary } from '@atoms/RatingSummary'
import ChangeLocationDrawer from '@sections/ChangeLocationDrawer'

const FooterLocationDetail = ({ isVisible, onClose, localCtaData }) => {
  const { geo: locatorGeo, franchise: locatorFranchise } = useLocator()

  const geo = localCtaData?.geo ? localCtaData?.geo : locatorGeo
  const franchise = localCtaData?.franchise
    ? localCtaData?.franchise
    : locatorFranchise

  const {
    FranchiseNumber: frId,
    permalink: frLink,
    yext,
    average_rating,
    review_count
  } = franchise ?? {}

  const { name: frName, mainPhone: frPhone } = yext ?? {}

  const locationDetailRef = React.useRef(null)
  const [locationChangeVisible, setLocationChangeVisible] = useState(false)

  React.useEffect(() => {
    if (isVisible) {
      locationDetailRef.current.style.visibility = 'visible'
    } else {
      setTimeout(() => {
        locationDetailRef.current.style.visibility = 'hidden'
      }, 300)
    }
  }, [isVisible])

  return (
    <>
      <LocationDetailWrap ref={locationDetailRef}>
        <LocationDetail isVisible={isVisible}>
          <CloseButton onClick={onClose}>
            <CloseButtonRow />
            <CloseButtonRow />
          </CloseButton>
          <p tw="text-primary font-bold text-2xl ml-1 mb-10">
            24/7 Emergency Service
          </p>
          <div>
            <p tw="text-primary mb-2 leading-none">
              Contact your local SERVPRO, serving:
            </p>
            <div tw="mb-2">
              <LocationName>
                {!!geo && !!geo.city ? (
                  `${geo?.city}${
                    geo?.state_short ? `, ${geo.state_short}` : ''
                  }`
                ) : (
                  <span tw="inline-block h-8 w-48 bg-warmGray-300 animate-pulse rounded-sm" />
                )}
              </LocationName>
              {!!frName && (
                <AccessibleLink
                  className="change-location-open-cta"
                  onClick={() => setLocationChangeVisible(true)}>
                  <span tw="whitespace-nowrap underline">
                    change location ›
                  </span>
                </AccessibleLink>
              )}
              <p tw="mt-6">
                SERVPRO of{' '}
                {frName ? (
                  <span>{frName.slice(10)}</span>
                ) : (
                  <span tw="inline-block h-3 w-64 ml-2 bg-warmGray-300 animate-pulse rounded-sm" />
                )}
              </p>
            </div>

            <div tw="flex items-center mb-4">
              {!!average_rating && review_count !== 0 && (
                <RatingSummary rating={average_rating} count={review_count} />
              )}
            </div>

            <div tw="mt-7 mb-4">
              {frPhone ? (
                <Button to={`tel:${formatPhoneLink(frPhone)}`} isBig={true}>
                  {formatPhoneLink(frPhone)}
                </Button>
              ) : (
                <span tw="h-12 w-64 bg-orange-600 animate-pulse rounded-sm rounded-full" />
              )}
            </div>

            {!!frId && (
              <AccessibleLink
                className="hover-default"
                tw="font-semibold text-lg ml-2"
                to={frLink}>
                Find Out More ›
              </AccessibleLink>
            )}
          </div>
          <div tw="h-px w-full bg-gray-300 mt-7 mb-8" />
          <p tw="text-2xl font-semibold mb-3">National Call Center:</p>
          <Button to={`tel: +${formatPhoneLink(frPhone)}`} isBig={true}>
            1-800-SERVPRO
          </Button>
        </LocationDetail>
      </LocationDetailWrap>

      <ChangeLocationDrawer
        visible={locationChangeVisible}
        onClose={() => setLocationChangeVisible(false)}
      />
    </>
  )
}

const LocationDetailWrap = styled.div(() => [
  `z-index: 300;`,
  tw`invisible fixed top-0 left-0 w-full h-full`,
  `overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  `
])
const LocationDetail = styled.div(({ isVisible }) => [
  `max-width: 100vw;
  min-height: 100vh;
  padding-top: 74px;`,
  tw`relative w-full bg-white px-4 xs:px-7 pb-6 transform translate-y-full transition-transform`,
  isVisible && tw`transform translate-y-0`
])
const CloseButton = styled.button`
  top: 30px;
  ${tw`absolute w-8 h-8 right-5 z-30`}
`
const CloseButtonRow = styled.div`
  width: 3px;
  height: 26px;
  ${tw`absolute top-0 right-1/2 bg-primary-black transform rotate-45`}

  &:last-of-type {
    ${tw`-rotate-45`}
  }
`
const LocationName = styled.p`
  font-size: 34px;
  ${tw`font-semibold mb-2`}
`

export default FooterLocationDetail
