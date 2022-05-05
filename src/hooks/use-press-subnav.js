import { useStaticQuery, graphql } from 'gatsby'

export const usePressSubnav = () => {
  const { cmsSubnav: PressSubnav } = useStaticQuery(
    graphql`
      query PressSubnav {
        cmsSubnav(title: { eq: "Press" }) {
          title
          nav_link {
            href
            title
          }
        }
      }
    `
  )
  return PressSubnav
}
