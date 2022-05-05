import { useStaticQuery, graphql } from 'gatsby'

export const useLocationPageSections = () => {
  const { cmsLocationPageSections: LocationPageSections } = useStaticQuery(
    graphql`
      query LocationPageSections {
        cmsLocationPageSections {
          sections {
            ...ContactBannerData
            ...HeroData
            ...IconBulletsData
            ...MediaContentData
            ...PartnerLogosData
            ...SliderData
          }
        }
      }
    `
  )
  return LocationPageSections
}
