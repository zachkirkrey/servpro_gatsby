import React from 'react'
import { graphql } from 'gatsby'
import FullwidthHero from '@sections/FullwidthHero'
import SplitHero from '@sections/SplitHero'

const Hero = ({ data, localCtaData, handleChangeLocation }) => (
  <>
    {data?.fullwidth_background ? (
      <FullwidthHero
        data={data}
        localCtaData={localCtaData}
        handleChangeLocation={handleChangeLocation}
      />
    ) : (
      <SplitHero
        data={data}
        localCtaData={localCtaData}
        handleChangeLocation={handleChangeLocation}
      />
    )}
  </>
)
export const query = graphql`
  fragment HeroData on CmsPageBuilderBlocks {
    hero {
      has_location_widget
      fullwidth_background
      heading
      subheading
      copy
      hero_offset
      button_link {
        href
        title
      }
      button_link_2 {
        href
        title
      }
      image {
        filename
        title
        description
        url
        localAsset {
          childImageSharp {
            gatsbyImageData(
              width: 1920
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default Hero
