import React from 'react'
import tw, { styled } from 'twin.macro'

import AccessibleLink from '@atoms/AccessibleLink'
import Button from '@atoms/Button'
import formatPhoneLink from '@utils/format-phone-link'
import { RatingSummary } from '../atoms/RatingSummary'
import { useLocator } from '@hooks/use-locator'
import { useIsElementOutsideClick } from '../../hooks/is-element-outside-click'

const HeaderDropdown = props => {
  const { localCtaData, onChangeLocation } = props

  const { geo: locatorGeo, franchise: locatorFranchise } = useLocator()

  const geo = localCtaData?.geo ? localCtaData?.geo : locatorGeo
  const franchise = localCtaData?.franchise
    ? localCtaData?.franchise
    : locatorFranchise

  const {
    FranchiseNumber: frId,
    permalink: frLink,
    review_count,
    average_rating,
    yext
  } = franchise ?? {}
  const { name: frName, mainPhone: frPhone } = yext ?? {}
  const containerRef = React.useRef(null)

  useIsElementOutsideClick({
    element: containerRef.current,
    enabled: props.isVisible,
    actionCallback: () => props?.onClose()
  })

  return (
    <StyledHeaderDropdown
      isVisible={props.isVisible}
      ref={containerRef}
      onMouseDown={event => event.stopPropagation()}>
      <div>
        <DropdownSubtitle>
          Contact your local SERVPRO, serving:
        </DropdownSubtitle>
        <div tw="flex justify-between items-end mb-2 flex-wrap">
          {!!geo && !!geo.city ? (
            <p tw="text-3xl font-semibold">{`${geo?.city}${
              geo?.state_short ? `, ${geo.state_short}` : ''
            }`}</p>
          ) : (
            <div tw="h-8 w-48 bg-warmGray-300 animate-pulse rounded-sm" />
          )}
          <RightCol>
            <AccessibleLink
              className="change-location-open-cta"
              onClick={onChangeLocation}>
              <span tw="whitespace-nowrap underline">change location ›</span>
            </AccessibleLink>
          </RightCol>
        </div>

        <div tw="flex justify-between flex-wrap my-5">
          <div>
            {frName ? (
              <p tw="text-sm">{frName}</p>
            ) : (
              <div tw="h-3 w-64 pt-2 my-2 bg-warmGray-300 animate-pulse rounded-sm" />
            )}

            {review_count !== 0 && (
              <RatingSummary count={review_count} rating={average_rating} />
            )}
          </div>
          <RightCol>
            <p tw="text-primary text-xl font-semibold w-20 leading-5 mr-16">
              24/7 Emergency Service
            </p>
          </RightCol>
        </div>

        <div tw="flex items-center w-full justify-between flex-wrap">
          {frPhone ? (
            <Button to={`tel:${formatPhoneLink(frPhone)}`} isBig={true}>
              {formatPhoneLink(frPhone)}
            </Button>
          ) : (
            <span tw="h-12 w-64 bg-orange-600 animate-pulse rounded-full" />
          )}
          <RightCol>
            {!!frId && <LinkMore to={frLink}>Find Out More ›</LinkMore>}
          </RightCol>
        </div>
      </div>
    </StyledHeaderDropdown>
  )
}

const StyledHeaderDropdown = styled.div(({ isVisible }) => [
  `box-shadow: 6px 7px 14px 1px rgba(0, 0, 0, 0.105359);`,
  `width: 524px;`,
  tw`hidden absolute top-20 right-0 px-10 pt-2 pb-4 bg-white z-50`,
  isVisible && tw`block`
])

const RightCol = styled.div`
  flex-basis: 150px;
`

const DropdownSubtitle = styled.p`
  ${tw`text-primary`}
`
const LinkMore = styled(AccessibleLink)`
  margin-right: 10px;
  letter-spacing: 0.08em;
  ${tw`block font-semibold`}
`

export default HeaderDropdown
