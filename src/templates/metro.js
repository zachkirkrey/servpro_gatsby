import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'
import { Hero, MetroDetail, Blogroll } from '@blocks'
import { useMetroPageSections } from '@hooks/use-metro-page-sections'
import { useLocator } from '@hooks/use-locator'
import { useIsUserNearbyFranchise } from '@hooks/use-is-user-nearby-franchise'
import Seo from '../components/utils/Seo'

const MetroPage = ({ data, pageContext }) => {
  const { hero, page_content, downtown_page } = data.cmsMetroPage

  const {
    franchises: metro_franchises,
    city,
    state_abbr,
    metro_geo,
    title,
    seo
  } = pageContext

  const { changeLocation, nearby } = useLocator()
  const isUserNearby = useIsUserNearbyFranchise(metro_geo)

  const local_cta_data = isUserNearby
    ? {}
    : {
        geo: {
          city,
          state_short: state_abbr
        },
        franchise: !!metro_franchises.length > 0 ? metro_franchises[0] : []
      }

  useEffect(() => {
    if (isUserNearby) {
      setLocalCtaData(null)
    }
  }, [isUserNearby])

  const [localCtaData, setLocalCtaData] = useState(local_cta_data)

  const handleChangeLocation = address => {
    changeLocation(address)
    setLocalCtaData(null)
  }

  const hero_data = { ...hero, ...{ has_location_widget: true } }
  let disable_nearby = false
  let nearby_franchises = []

  if (downtown_page) {
    // Downtown Page
    // =======
    // Horizontal CTA: True
    // Nearby: False
    // Client Side CTA: False
    disable_nearby = true
    nearby_franchises = metro_franchises
  } else if (isUserNearby) {
    // Standard, Nearby, User < 50 mi.
    // =======
    // Horizontal CTA: True
    // Nearby: True
    // Client Side CTA: True
    hero_data.has_location_widget = true
    nearby_franchises = nearby
    // setLocalCtaData(null) causes infinite loop :(
  } else {
    // Standard, User > 50 mi / SEO / Default
    // =======
    // Horizontal CTA: False
    // Nearby: True
    // Client Side CTA: True
    hero_data.has_location_widget = false
    nearby_franchises = metro_franchises
  }

  const { blogroll } = useMetroPageSections()

  return (
    <Layout
      localCtaData={localCtaData}
      handleChangeLocation={handleChangeLocation}>
      <Seo
        title={seo?.meta_title || title}
        description={seo?.meta_description}
        imageUrl={seo?.meta_image?.url}
      />
      <Hero
        data={hero_data}
        localCtaData={localCtaData}
        handleChangeLocation={handleChangeLocation}
      />
      <MetroDetail
        data={page_content}
        disableNearby={!!disable_nearby}
        nearbyData={!disable_nearby ? nearby_franchises : {}}
      />
      <Blogroll data={blogroll} />
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    cmsMetroPage(url: { eq: $slug }) {
      title
      url
      downtown_page
      franchise_number
      seo {
        meta_title
        meta_description
      }
      hero {
        fullwidth_background
        heading
        subheading
        copy
        button_link {
          href
          title
        }
        image {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(
                width: 720
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
      page_content {
        copy
      }
    }
  }
`

export default MetroPage
