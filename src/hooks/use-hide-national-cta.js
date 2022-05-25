import { useStaticQuery, graphql } from 'gatsby'

export const useHideNationalCta = () => {
  const { cmsSiteSettings: siteSetting } = useStaticQuery(
    graphql`
      query siteSetting {
        cmsSiteSettings {
          out_of_service_mode
        }
      }
    `
  )
  return siteSetting
}
