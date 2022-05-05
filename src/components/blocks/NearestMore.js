import React from 'react'
import tw, { styled } from 'twin.macro'
import NearestItem from '@blocks/NearestItem'
import AccessibleLink from '@atoms/AccessibleLink'

const algoliaToNearestItem = fr => {
  const {
    permalink: frLink,
    average_rating,
    review_count,
    ServicesProvided,
    yext
  } = fr
  const { name: franchiseName, mainPhone: franchiseMainPhone } = yext ?? {
    name: '',
    mainPhone: ''
  }

  return {
    heading: franchiseName,
    phone: franchiseMainPhone,
    rating: average_rating,
    number_of_reviews: review_count,
    link: { title: 'Find out more >', href: frLink },
    services: ServicesProvided
  }
}

const NearestMore = props => {
  const franchises = props.data

  return (
    <NearestMoreWrap>
      <NearestTitle>Other Nearby Locations</NearestTitle>
      {franchises ? (
        franchises
          .filter((fr, idx) => idx < props.maxItems)
          .map((fr, idx) => (
            <NearestItem
              key={idx}
              data={algoliaToNearestItem(fr)}
              isFull={false}
            />
          ))
      ) : (
        <div tw="space-y-3 -mt-6">
          <NearestMorePlaceholder />
          <NearestMorePlaceholder />
          <NearestMorePlaceholder />
          <NearestMorePlaceholder />
          <NearestMorePlaceholder />
        </div>
      )}
      <NearestMoreLink to="/locations">See More Locations ›</NearestMoreLink>
    </NearestMoreWrap>
  )
}

const NearestMoreWrap = styled.div`
  width: 465px;
  ${tw`
  text-primary-black
  pt-10 pb-12`}
`
const NearestTitle = styled.h4`
  ${tw`text-primary text-3xl font-medium mb-10`}
`
const NearestMoreLink = styled(AccessibleLink)`
  font-size: 24px;
  ${tw`block text-primary font-semibold mt-9`}
`
const NearestMorePlaceholder = styled.div`
  width: 100%;
  height: 70px;
  ${tw`bg-warmGray-300 animate-pulse rounded-sm`}
`

export default NearestMore
