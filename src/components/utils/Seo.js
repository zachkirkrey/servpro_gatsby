import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({
  description,
  lang = 'en-US',
  meta = [],
  title: titleProp,
  imageUrl
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata?.description
  const title = titleProp || site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title || ''}
      titleTemplate={title ? `%s | SERVPRO` : ''}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `og:image`,
          content: imageUrl
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: `twitter:image`,
          content: imageUrl
        },
        {
          name: `theme-color`,
          content: `#ffffff`
        },
        {
          name: `msapplication-navbutton-color`,
          content: `#ffffff`
        },
        {
          name: `apple-mobile-web-app-status-bar-style`,
          content: `#ffffff`
        }
      ]
        .filter(item => item.content)
        .concat(meta)}
    />
  )
}

export default Seo
