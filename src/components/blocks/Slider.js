import React from 'react'
import { graphql } from 'gatsby'
import tw from 'twin.macro'
import Alert from '@atoms/Alert'
import BlogrollSlider from '@sections/BlogrollSlider'
import IconBlurbsSlider from '@sections/IconBlurbsSlider'
import IconButtonsSlider from '@sections/IconButtonsSlider'
import MediaShowcaseSlider from '@sections/MediaShowcaseSlider'
import TestimonialsSlider from '@sections/TestimonialsSlider'
import TimelineSlider from '@sections/TimelineSlider'

const Slider = ({ data }) => {
  const { variants } = data || []
  const slider = variants ? variants[0] : []
  console.info(data)

  // eslint-disable-next-line no-confusing-arrow
  const getVariant = () =>
    slider
      ? Object.keys(slider)
          .filter(k => slider[k] != null)
          .toString()
      : ''

  const Sliders = slider
    ? Object.freeze({
        blogroll: <BlogrollSlider data={slider[getVariant()]} />,
        icon_blurbs: <IconBlurbsSlider data={slider[getVariant()]} />,
        icon_buttons: <IconButtonsSlider data={slider[getVariant()]} />,
        media_showcase: <MediaShowcaseSlider data={slider[getVariant()]} />,
        testimonials: <TestimonialsSlider data={slider[getVariant()]} />,
        timeline: <TimelineSlider data={slider[getVariant()]} />
      })
    : null

  return (
    <SliderSection>
      {slider ? (
        Sliders[getVariant()]
      ) : (
        <Alert warning>
          <strong>Warning:</strong> No slider variant selected.
        </Alert>
      )}
    </SliderSection>
  )
}

const SliderSection = tw.section``

export const query = graphql`
  fragment SliderData on CmsPageBuilderBlocks {
    slider {
      variants {
        blogroll {
          heading
          articles {
            title
            content
            url
            featured_image {
              filename
              title
              description
              url
              localAsset {
                childImageSharp {
                  gatsbyImageData(
                    width: 400
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                  )
                }
              }
            }
          }
        }
        icon_blurbs {
          heading
          sub_headline
          spacing {
            top_gutter
            bottom_gutter
          }
          settings {
            dark_mode
            icon_on_left
            number_of_slides
          }
          slides {
            heading
            copy
            icon {
              filename
              title
              url
              localAsset {
                childImageSharp {
                  gatsbyImageData(
                    width: 100
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                  )
                }
              }
            }
          }
        }
        icon_buttons {
          slides {
            label
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
            link {
              href
              title
            }
          }
        }
        media_showcase {
          heading
          slides {
            heading
            copy
            image {
              filename
              title
              url
              localAsset {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
            }
            video {
              title
              url
            }
          }
        }
        testimonials {
          slides {
            author_name
            author_company
            quote
            image {
              filename
              title
              url
              localAsset {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
            }
          }
        }
        timeline {
          heading
          slides {
            year
            heading
            copy
            image {
              filename
              title
              url
              localAsset {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Slider
