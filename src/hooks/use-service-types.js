import { useStaticQuery, graphql } from 'gatsby'

export const useServiceTypes = () => {
  const { allCmsServiceTypes: ServiceTypes } = useStaticQuery(
    graphql`
      query ServiceTypes {
        allCmsServiceTypes {
          edges {
            node {
              title
              sort
              franchise_service_mapping
              icon {
                title
                url
              }
            }
          }
        }
      }
    `
  )
  return ServiceTypes
}
