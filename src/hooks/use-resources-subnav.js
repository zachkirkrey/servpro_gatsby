import { useStaticQuery, graphql } from 'gatsby'

export const useResourcesSubnav = () => {
  const { cmsSubnav: ResourcesSubnav } = useStaticQuery(
    graphql`
      query ResourcesSubnav {
        cmsSubnav(title: { eq: "Resources" }) {
          title
          nav_link {
            href
            title
          }
        }
      }
    `
  )
  return ResourcesSubnav
}
