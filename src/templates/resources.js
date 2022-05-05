import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'
import { Hero, MultiBlogrollAlt, ResourceDetail, Subnav } from '@blocks'
import { useResourcesSubnav } from '@hooks/use-resources-subnav'
import { truncate } from '@utils/Truncate'
import Seo from '../components/utils/Seo'

const ResourceLandingPage = ({ data, pageContext }) => {
  // Resources Subnav
  const resourcesSubnav = useResourcesSubnav()
  const subnavData = { subnav: [resourcesSubnav] }
  const { title: pageTitle } = pageContext

  // CMS Content Type: Resource Page
  const { hero, seo } = data.cmsResourcesPage ?? ''
  // Blogroll data / page context from node
  const { articles, showSubNav } = pageContext
  const { isIndex, primaryArticle, subblog } = articles

  const articleToResourceDetail = article => {
    const { title: articleTitle, content, featured_image, url } = article || ''

    return {
      title: articleTitle,
      copy: `${truncate(content, 500)}`,
      image: featured_image,
      read_more: url
    }
  }
  return (
    <Layout>
      <Seo
        title={seo?.meta_title || pageTitle}
        description={seo?.meta_description}
        imageUrl={seo?.meta_image?.url}
      />
      {!!hero && <Hero data={hero} />}
      {!!showSubNav && <Subnav data={subnavData} />}
      {!!primaryArticle && (
        <ResourceDetail data={articleToResourceDetail(primaryArticle)} />
      )}
      <MultiBlogrollAlt data={{ subblog, isIndex }} />
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    cmsResourcesPage(url: { eq: $slug }) {
      title
      url
      seo {
        meta_title
        meta_description
      }
      hero {
        fullwidth_background
        heading
        subheading
        copy
        button_link {
          href
          title
        }
        image {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(
                width: 720
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`

export default ResourceLandingPage
