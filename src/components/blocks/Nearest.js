import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled } from 'twin.macro'
import Button from '@atoms/Button'
import { useLocator } from '@hooks/use-locator'
import formatPhoneLink from '@utils/format-phone-link'
import { RatingSummary } from '../atoms/RatingSummary'

const Nearest = ({ localCtaData, onChangeLocation }) => {
  const { geo: locatorGeo, franchise: locatorFranchise } = useLocator()

  const geo = localCtaData?.geo ? localCtaData?.geo : locatorGeo
  const franchise = localCtaData?.franchise
    ? localCtaData?.franchise
    : locatorFranchise

  const {
    FranchiseNumber: frId,
    permalink: frLink,
    average_rating,
    review_count,
    yext
  } = franchise ?? {}
  const { name: frName, mainPhone: frPhone } = yext ?? {}

  return (
    <NearestWrap>
      <div tw="flex justify-between items-center h-36">
        <div>
          <NearestHeading>Contact your local SERVPRO, serving:</NearestHeading>
          <div tw="mb-5">
            <NearestLocation>
              <>
                {!!geo && !!geo.city ? (
                  `${geo?.city} ${geo?.state_short}`
                ) : (
                  <div tw="h-8 w-48 bg-warmGray-300 animate-pulse rounded-sm" />
                )}
              </>
            </NearestLocation>

            <AccessibleLink
              onClick={onChangeLocation}
              className="change-location-open-cta">
              <span tw="underline">change location ›</span>
            </AccessibleLink>
          </div>

          {frName ? (
            <p tw="text-sm">{frName}</p>
          ) : (
            <div tw="h-3 w-64 pt-2 mt-2 bg-warmGray-300 animate-pulse rounded-sm" />
          )}
        </div>
        <div>
          <PrimaryTitle>24/7 Emergency Service</PrimaryTitle>
          {!!average_rating && review_count !== 0 && (
            <RatingSummary
              rating={average_rating}
              count={review_count}
              stacked={true}
            />
          )}
        </div>
        <div>
          <div tw="flex items-start pt-2 mb-2">
            {frPhone ? (
              <Button to={`tel:${formatPhoneLink(frPhone)}`} isBig={true}>
                {formatPhoneLink(frPhone)}
              </Button>
            ) : (
              <span tw="h-12 w-64 bg-orange-600 animate-pulse rounded-full" />
            )}
          </div>
          {!!frId && (
            <AccessibleLink
              className="hover-default"
              tw="font-semibold pl-3 text-lg"
              to={frLink}>
              Find Out More ›
            </AccessibleLink>
          )}
        </div>
      </div>
    </NearestWrap>
  )
}

const NearestWrap = styled.div`
  max-width: 1300px;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.135359);
  ${tw`w-full bg-white py-8 px-10 mx-auto my-8 xl:px-24`}
`
const NearestHeading = styled.h2`
  letter-spacing: 0.08em;
  ${tw`text-primary mb-4`}
`
const NearestLocation = tw.div`text-32px font-semibold leading-9 mb-1 2xl:mb-0`
const PrimaryTitle = styled.p`
  font-size: 21px;
  letter-spacing: 0.08em;
  ${tw`text-primary font-semibold mb-4`}
`

export default Nearest
