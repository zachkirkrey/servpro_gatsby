import React, { useEffect } from 'react'
import tw from 'twin.macro'
import NearestItem from '@blocks/NearestItem'
import Container from '@atoms/Container'
import paddingDefault from '@utils/paddingDefault'
import triggerInvoca from '@utils/trigger-invoca'

const algoliaToSearchResult = loc => {
  if (!loc || loc === undefined) {
    return {}
  }
  const {
    permalink: frLink,
    average_rating,
    review_count,
    ServicesProvided,
    yext
  } = loc
  if (!yext) {
    return {}
  }
  const { name: frName, mainPhone: frPhone } = yext

  return {
    heading: frName ?? '',
    phone: frPhone,
    rating: average_rating,
    number_of_reviews: review_count,
    link: { title: 'Find out more >', href: frLink },
    services: ServicesProvided
  }
}

const NearestLocations = ({ locations, isLoading, qry }) => {
  useEffect(() => triggerInvoca())

  const { franchises } = locations || null
  return (
    <Section css={paddingDefault()}>
      <Container>
        <h3 tw="mb-6 text-2xl">Results for &quot;{qry}&quot;</h3>
        {!!isLoading && (
          <div tw="mt-6 space-y-4">
            <div tw="h-52 w-full bg-warmGray-300 animate-pulse rounded-sm" />
            <div tw="h-52 w-full bg-warmGray-300 animate-pulse rounded-sm" />
            <div tw="h-52 w-full bg-warmGray-300 animate-pulse rounded-sm" />
            <div tw="h-52 w-full bg-warmGray-300 animate-pulse rounded-sm" />
            <div tw="h-52 w-full bg-warmGray-300 animate-pulse rounded-sm" />
          </div>
        )}
        {!!franchises?.length && (
          <ul>
            {franchises
              .filter(fr => fr !== null)
              .map((fr, idx) => {
                const uiData = algoliaToSearchResult(fr)
                return uiData ? (
                  <NearestItem
                    key={`${idx}:${fr.objectID}`}
                    data={uiData}
                    isFull={true}
                  />
                ) : (
                  <></>
                )
              })}
          </ul>
        )}
      </Container>
    </Section>
  )
}

const Section = tw.section``

export default NearestLocations
