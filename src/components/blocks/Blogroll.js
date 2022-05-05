import React from 'react'
import { graphql } from 'gatsby'
import tw from 'twin.macro'
import Container from '@atoms/Container'
import ArticleCard from '@sections/ArticleCard'
import paddingDefault from '@utils/paddingDefault'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const Blogroll = ({ data }) => {
  const { heading, subheading, related_content } = data

  return (
    <BlogrollSection css={paddingDefault()}>
      <Container>
        {related_content && related_content.length > 0 && (
          <BlogrollHeading>
            {heading ? apCaseOnlyTitleTags(heading) : 'Recommended for You'}
          </BlogrollHeading>
        )}
        <BlogrollSubheading
          css={RichTextEditorStyles}
          dangerouslySetInnerHTML={{ __html: subheading }}
        />
        <BlogrollGrid>
          {!!related_content &&
            related_content.map(item => {
              // Check if there's raw content at the top
              const { content, sections, seo, title, url } = item ?? {}
              const { meta_title, meta_description, meta_image } = seo ?? {}

              const articleFromHero = () => {
                const { hero } = sections?.length ? sections[0] : {}

                // eslint-disable-next-line no-nested-ternary
                const cardTitle = hero?.heading
                  ? hero.heading
                  : meta_title
                  ? meta_title
                  : title

                // eslint-disable-next-line no-nested-ternary
                const cardImage = hero?.image
                  ? hero.image
                  : meta_image
                  ? meta_image
                  : ''

                // eslint-disable-next-line no-nested-ternary
                const cardContent = hero?.copy
                  ? hero.copy
                  : meta_description
                  ? meta_description
                  : ''

                return {
                  title: cardTitle,
                  featured_image: cardImage,
                  content: cardContent,
                  url
                }
              }

              return content ? (
                <BlogrollGridItem key={item.title}>
                  <ArticleCard article={item} />
                </BlogrollGridItem>
              ) : (
                <BlogrollGridItem key={item.title}>
                  <ArticleCard article={articleFromHero()} />
                </BlogrollGridItem>
              )
            })}
        </BlogrollGrid>
      </Container>
    </BlogrollSection>
  )
}

const BlogrollSection = tw.section``
const BlogrollHeading = tw.h2`text-center text-32px leading-tight mb-4 lg:(mb-6)`
const BlogrollSubheading = tw.div`text-center text-lg mx-auto lg:(text-xl max-w-3xl mb-8) whitespace-pre-line`
const BlogrollGrid = tw.ul`grid grid-cols-1 gap-8 md:(grid-cols-2 gap-y-16) lg:(grid-cols-3)`
const BlogrollGridItem = tw.li`
  flex-auto
  w-full`

export const query = graphql`
  fragment BlogrollData on CmsPageBuilderBlocks {
    blogroll {
      heading
      subheading
      related_content {
        ...BlogrollArticleFrag
        ...BlogrollPressFrag
        ...BlogrollServiceFrag
        ...BlogrollPageFrag
      }
    }
  }
  fragment BlogrollMetroData on Cms_metro_page_sections {
    blogroll {
      heading
      subheading
      related_content {
        ...BlogrollArticleFrag
        ...BlogrollPressFrag
        ...BlogrollServiceFrag
        ...BlogrollPageFrag
      }
    }
  }
  fragment BlogrollArticleFrag on Cms_article {
    title
    content
    url
    featured_image {
      filename
      title
      url
      localAsset {
        childImageSharp {
          gatsbyImageData(
            width: 1440
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }

  fragment BlogrollPressFrag on Cms_press_release {
    title
    content
    url
    featured_image {
      filename
      title
      url
      localAsset {
        childImageSharp {
          gatsbyImageData(
            width: 1440
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }

  fragment BlogrollServiceFrag on Cms_service_detail {
    title
    url
    sections {
      hero {
        heading
        copy
        image {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(
                width: 1440
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
    seo {
      meta_title
      meta_description
      meta_image {
        filename
        title
        url
        localAsset {
          childImageSharp {
            gatsbyImageData(
              width: 1440
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }

  fragment BlogrollPageFrag on Cms_page_builder {
    title
    url
    sections {
      hero {
        heading
        copy
        image {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(
                width: 1440
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
    seo {
      meta_title
      meta_description
      meta_image {
        filename
        title
        url
        localAsset {
          childImageSharp {
            gatsbyImageData(
              width: 1440
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default Blogroll
