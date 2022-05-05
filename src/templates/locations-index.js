import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw from 'twin.macro'
import Layout from '@components/Layout'
import Container from '@atoms/Container'

const LocationsListPage = ({ pageContext }) => {
  const { locations } = pageContext

  return (
    <Layout>
      <Container>
        <Heading>Locations Index Page</Heading>
        {locations?.length ? (
          <ul>
            {locations.map(loc => (
              <li key={loc.text}>
                <AccessibleLink to={loc.url}>{loc.text}</AccessibleLink>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>Fetching the live data from Algolia...</p>
            <ul>
              {Array.from(Array(8), (_, i) => (
                <ListItem key={i} />
              ))}
            </ul>
          </>
        )}
      </Container>
    </Layout>
  )
}

const Heading = tw.h1`text-3xl pt-12 pb-4`
const ListItem = tw.li`block h-4 w-48 animate-pulse rounded-sm bg-warmGray-200 my-1`

export default LocationsListPage
