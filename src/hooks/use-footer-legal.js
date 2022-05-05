import { useStaticQuery, graphql } from 'gatsby'

export const useFooterLegal = () => {
  const { cmsLegal: StaticFooterDisclaimer } = useStaticQuery(
    graphql`
      query FooterLegal {
        cmsLegal {
          title
          copy
        }
      }
    `
  )
  return StaticFooterDisclaimer
}
