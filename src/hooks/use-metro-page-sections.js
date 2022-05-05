import { useStaticQuery, graphql } from 'gatsby'

export const useMetroPageSections = () => {
  const { cmsMetroPageSections: MetroPageSections } = useStaticQuery(
    graphql`
      query MetroPageSections {
        cmsMetroPageSections {
          ...BlogrollMetroData
        }
      }
    `
  )
  return MetroPageSections
}
