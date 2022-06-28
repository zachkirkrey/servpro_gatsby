import React, { useState } from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled } from 'twin.macro'
import Button from '@atoms/Button'
import { useLocator } from '@hooks/use-locator'
import formatPhoneLink from '@utils/format-phone-link'
import { RatingSummary } from '../atoms/RatingSummary'
import ChangeLocationDrawer from '@sections/ChangeLocationDrawer'

const NearestVertical = () => {
  const { geo, franchise } = useLocator()
  const {
    FranchiseNumber: frId,
    permalink: frLink,
    review_count,
    average_rating,
    yext
  } = franchise ?? {}
  const { name: frName, mainPhone: frPhone } = yext ?? {}
  const [locationChangeVisible, setLocationChangeVisible] = useState(false)

  return (
    <>
      <NearestWrap>
        <NearestHeading>Contact your local SERVPRO, serving:</NearestHeading>{' '}
        <div tw="flex flex-col sm:(flex-row items-end)">
          <NearestLocation>
            {!!geo && !!geo.city ? (
              `${geo?.city}${geo?.state_short ? `, ${geo.state_short}` : ''}`
            ) : (
              <div tw="h-8 w-48 bg-warmGray-300 animate-pulse rounded-sm" />
            )}
          </NearestLocation>
          <div tw="sm:ml-6">
            <AccessibleLink
              tw="underline"
              href="/"
              onClick={() => setLocationChangeVisible(true)}
              className="change-location-open-cta">
              <span tw="underline">change location ›</span>
            </AccessibleLink>
          </div>
        </div>
        <DividerWrap>
          <Divider />
        </DividerWrap>
        <p tw="text-sm">SERVPRO of: </p>
        {frName ? (
          <p tw="mb-5 text-sm">{frName.slice(10)}</p>
        ) : (
          <div tw="h-3 w-64 pt-2 mt-2 mb-6 bg-warmGray-300 animate-pulse rounded-sm" />
        )}
        <div tw="flex items-start mb-5">
          {frPhone ? (
            <Button to={`tel:${formatPhoneLink(frPhone)}`} isBig={true}>
              {formatPhoneLink(frPhone)}
            </Button>
          ) : (
            <span tw="h-12 w-64 bg-orange-600 animate-pulse rounded-sm rounded-full" />
          )}
        </div>
        {review_count !== 0 && (
          <RatingSummary count={review_count} rating={average_rating} />
        )}
        <p tw="text-primary text-xl font-semibold tracking-wider">
          24/7 Emergency Service
        </p>
        {!!frId && (
          <div tw="mb-7">
            <AccessibleLink
              className="hover-default"
              tw="font-semibold text-lg lg:pl-6"
              to={frLink}>
              Find Out More ›
            </AccessibleLink>
          </div>
        )}
      </NearestWrap>

      <ChangeLocationDrawer
        visible={locationChangeVisible}
        onClose={() => setLocationChangeVisible(false)}
      />
    </>
  )
}

const NearestWrap = styled.div`
  @media (min-width: 768px) {
    width: 465px;
  }

  ${tw`
  bg-white
  pt-5 px-6 pb-6
  sm:(pt-10 px-12 pb-12)
  shadow-xl`}
`
const NearestHeading = styled.h2`
  letter-spacing: 0.07em;
  ${tw`text-sm text-primary`}
`
const NearestLocation = tw.div`text-32px font-semibold leading-9`
const DividerWrap = tw.div`mt-2 mb-3`
const Divider = styled.div`
  height: 2px;
  ${tw`w-full bg-trueGray-100`}
`

export default NearestVertical
