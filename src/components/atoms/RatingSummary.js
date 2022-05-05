import React from 'react'
import tw, { styled } from 'twin.macro'
import { ReactComponent as StarFill } from '@images/svg/star-fill.svg'
import { ReactComponent as StarEmpty } from '@images/svg/star-empty.svg'

const StarRating = ({ rating, smallSize }) => {
  function getStarWidth(i) {
    if (i < Math.floor(rating)) {
      return '100%'
    }

    return `${Math.round(100 * (rating % 1))}%`
  }

  return [...Array(5).keys()].map(i => (
    <div tw="relative" key={i}>
      <StarEmpty width={smallSize ? 15 : 22} />
      {i < Math.ceil(rating) && (
        <div
          tw="absolute top-0 overflow-hidden w-1/2"
          style={{ width: getStarWidth(i) }}>
          <StarFill width={smallSize ? 15 : 22} />
        </div>
      )}
    </div>
  ))
}

export const RatingSummary = ({
  rating,
  count,
  stacked = false,
  smallSize = false
}) => {
  if (!rating) {
    return (
      <div tw="h-5 w-64 pt-2 mt-2 mb-6 bg-warmGray-300 animate-pulse rounded-sm" />
    )
  }

  return (
    <>
      <Rating stacked={stacked} smallSize={smallSize}>
        <div tw="flex space-x-1 items-center">
          <StarRating smallSize={smallSize} rating={rating} />
          <RatingNumber smallSize={smallSize}>
            {parseFloat(rating).toFixed(1)}
          </RatingNumber>
        </div>
        <RatingCount stacked={stacked} tw="mt-1">
          ({count} reviews)
        </RatingCount>
      </Rating>
    </>
  )
}

const Rating = styled.div(({ stacked, smallSize }) => [
  tw`flex space-x-1 items-center text-gray-800`,
  stacked ? tw`flex-col items-start` : tw``,
  smallSize && tw`flex-col md:flex-row`
])

const RatingCount = styled.div(({ stacked }) => [
  tw`text-xs text-left`,
  stacked ? tw`pl-0` : tw`pl-1`
])

const RatingNumber = styled.span(({ smallSize }) => [
  tw`font-bold mt-1`,
  smallSize && tw`text-xs`
])
