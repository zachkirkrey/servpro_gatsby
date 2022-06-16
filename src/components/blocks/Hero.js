import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import FullwidthHero from '@sections/FullwidthHero'
import SplitHero from '@sections/SplitHero'
import { useStateOutOfService } from '@hooks/use-state-out-of-service'
import { useLocator } from '@hooks/use-locator'
const Hero = ({ data, localCtaData, handleChangeLocation }) => {
  const [stateOutOfService, setStateOutOfService] = useState(false)

  const { states_out_of_service } = useStateOutOfService()
  const { geo } = useLocator()

  //remove '/' from states
  const stateNamesOutOfService = states_out_of_service.map(({ url }) =>
    url.replace(/^.*\/(.*)$/, '$1').toUpperCase()
  )
  useEffect(() => {
    const ticker = stateNamesOutOfService.includes(geo?.state_short)
    setStateOutOfService(ticker)
  }, [geo?.state_short])

  return (
    <>
      {data?.fullwidth_background ? (
        <FullwidthHero
          data={data}
          localCtaData={localCtaData}
          handleChangeLocation={handleChangeLocation}
          stateOutOfService={stateOutOfService}
        />
      ) : (
        <SplitHero
          data={data}
          localCtaData={localCtaData}
          handleChangeLocation={handleChangeLocation}
          stateOutOfService={stateOutOfService}
        />
      )}
    </>
  )
}
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
