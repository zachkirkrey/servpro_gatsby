import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'

import { ReactComponent as StarFill } from '@images/svg/star-fill.svg'
import { ReactComponent as StarEmpty } from '@images/svg/star-empty.svg'
import Container from '@atoms/Container'
import NearestVertical from '@blocks/NearestVertical'
import paddingDefault from '@utils/paddingDefault'

const ReviewGrid = ({ data }) => {
  const { settings, reviews } = data
  const hasWidget = !!settings?.has_widget

  const RenderRating = ({ rating }) => {
    return [...Array(5).keys()].map(i => {
      return i < rating ? (
        <StarFill width={22} height={22} key={i} />
      ) : (
        <StarEmpty width={22} height={22} key={i} />
      )
    })
  }

  return (
    <Container tw="flex items-start justify-between" css={paddingDefault()}>
      <ReviewsGridContainer hasWidget={hasWidget}>
        {reviews.map(review => {
          const { full_name, byline, quote, rating } = review.customer

          return (
            <ReviewItem key={full_name}>
              <div tw="flex mb-6">
                <HeadingWrap>
                  <p>{full_name}</p>
                  <p>{byline}</p>
                </HeadingWrap>
              </div>
              <div tw="flex space-x-1 mb-5">
                <RenderRating rating={rating} />
              </div>
              <p tw="text-primary-black text-lg leading-6">{quote}</p>
            </ReviewItem>
          )
        })}
      </ReviewsGridContainer>
      {hasWidget && <NearestVertical />}
    </Container>
  )
}

const ReviewItem = styled.div`
  max-width: 304px;
`
const HeadingWrap = styled.div`
  letter-spacing: 1.71px;
  ${tw`text-gray-400`}
`
const ReviewsGridContainer = styled.div(({ hasWidget }) => [
  tw`grid grid-cols-1 gap-8 lg:(gap-x-12 gap-y-28)`,
  hasWidget
    ? tw`md:(grid-cols-2 w-full) lg:(grid-cols-2 w-2/3)`
    : tw`md:(grid-cols-2) lg:(grid-cols-3 w-full)`
])

export const query = graphql`
  fragment ReviewGridData on CmsPageBuilderBlocks {
    review_grid {
      settings {
        has_widget
      }
      reviews {
        customer {
          full_name
          byline
          quote
          rating
        }
      }
    }
  }
`

export default ReviewGrid
