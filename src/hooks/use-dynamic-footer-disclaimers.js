import { useStaticQuery, graphql } from 'gatsby'

export const useDynamicFooterDisclaimers = () => {
  const { allCmsFooterDisclaimers: DynamicFooterDisclaimers } = useStaticQuery(
    graphql`
      query DynamicFooterDisclaimers {
        allCmsFooterDisclaimers {
          edges {
            node {
              page_match
              content_before
              content
            }
          }
        }
      }
    `
  )
  return DynamicFooterDisclaimers
}
