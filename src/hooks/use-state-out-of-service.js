import { useStaticQuery, graphql } from 'gatsby'

export const useStateOutOfService = () => {
  const { cmsSiteSettings: siteSetting } = useStaticQuery(
    graphql`
      query siteSetting {
        cmsSiteSettings {
          out_of_service_mode
          states_out_of_service {
            url
          }
        }
      }
    `
  )
  return siteSetting
}
