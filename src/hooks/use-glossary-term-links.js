import { useStaticQuery, graphql } from 'gatsby'

export const useGlossaryTermLinks = () => {
  const { allCmsGlossaryTerm: GlossaryTermLinks } = useStaticQuery(
    graphql`
      query GlossaryTermLinks {
        allCmsGlossaryTerm {
          edges {
            node {
              title
              url
            }
          }
        }
      }
    `
  )
  return GlossaryTermLinks
}
