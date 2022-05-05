import { useStaticQuery, graphql } from 'gatsby'

export const usePrimaryNav = () => {
  const { cmsPrimaryNav: PrimaryNav } = useStaticQuery(
    graphql`
      query PrimaryNav {
        cmsPrimaryNav {
          nav_items {
            nav_item_link {
              href
              title
            }
            columns {
              group {
                category_link {
                  href
                  title
                }
                icon {
                  title
                  url
                }
                icon_inverse {
                  title
                  url
                }
                subgroup {
                  title
                  subgroup_link {
                    href
                    title
                  }
                  links {
                    href
                    title
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  return PrimaryNav
}
