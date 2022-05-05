import React from 'react'
import { graphql } from 'gatsby'
import IconButtonsSlider from '@sections/IconButtonsSlider'

const ServicesSlider = ({ data }) => {
  const { services } = data

  const getServicesAsIconButtonSlides = () => {
    if (!!services && services.length > 0) {
      const slides = services.map(service => {
        const { title, icon, link, sort } = service
        const { title: linkTitle, href: linkHref } = link
        const slide = {
          label: title,
          icon,
          link: { href: linkHref, title: linkTitle },
          sort
        }
        return slide
      })

      return slides
    }
    return []
  }

  return (
    <IconButtonsSlider data={{ slides: getServicesAsIconButtonSlides() }} />
  )
}

export const query = graphql`
  fragment ServicesSliderData on CmsPageBuilderBlocks {
    services_slider {
      services {
        title
        link {
          title
          href
        }
        icon {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
            }
          }
        }
        sort
      }
    }
  }
`

export default ServicesSlider
