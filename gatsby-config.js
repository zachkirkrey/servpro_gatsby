require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  // Metadata for `react-helmet` / SEO, will likely be replaced by CMS.
  siteMetadata: {
    title: 'SERVPRO',
    description: '',
    author: '@servpro',
    siteUrl: process.env.URL || 'https://www.servpro.com'
  },
  flags: {
    /* Enable all experiments aimed at improving develop server start time */
    FAST_DEV: true,
    /* Server Side Render (SSR) pages on full reloads during develop. */
    DEV_SSR: true,
    /* Run all source plugins at the same time instead of serially. */
    PARALLEL_SOURCING: true,
    /* Preserve file downloads through cache clearing events excl. `gatsby clean` */
    PRESERVE_FILE_DOWNLOAD_CACHE: true
    /* Store nodes in a persistent embedded database (vs in-memory). Lowers peak memory usage. */
    // LMDB_STORE: true,
    /* Parallelize page queries to improve speed of gatsby build. */
    // PARALLEL_QUERY_RUNNING: true,
  },
  plugins: [
    // SiteMap
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/'
      }
    },
    // SEO
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://www.servpro.com`
      }
    },
    // Image Optimization
    {
      resolve: 'gatsby-plugin-image'
    },
    // Static folder for images
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
        ignore: ['./svg/**/*.svg']
      }
    },
    // Static folder for self-hosted fonts
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: `${__dirname}/src/fonts`
      }
    },
    // GraphQL source from Contentstack CMS
    {
      resolve: `gatsby-source-contentstack`,
      options: {
        // Required: API Key is a unique key assigned to each stack.
        api_key: `blt0a0cb058815d4d96`,
        // Required: Delivery Token is a read-only credential.
        delivery_token:
          process.env.CONTENTSTACK_DELIVERY_TOKEN ||
          `cs6a671f48ca9d62580df0bc07`,
        // Required: Environment where you published your data.
        environment: process.env.CONTENTSTACK_ENVIRONMENT || `production`,
        // Improves `gatsby build`, keep 'false' for local, set to 'true' for deploy.
        expediteBuild: process.env.OPTIMIZE_CMS_FOR_PROD || false,
        // Optional: Specify a different prefix for types.
        type_prefix: `Cms`,
        // Optional: Download all contentstack images locally?
        downloadImages: true
      }
    },
    // Image Optimization
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    // CSS-in-JS solution (alternative to `styled-components`)
    'gatsby-plugin-emotion',
    // PWA Manifest Metadata
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/logo.svg'
      }
    },
    // Disable sourcemaps when building JavaScript
    'gatsby-plugin-no-sourcemaps',
    // First-party hosting plugin.
    'gatsby-plugin-gatsby-cloud',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-W2LKHJL',
        includeInDevelopment: true,
        defaultDataLayer: {}
      }
    },
    'gatsby-plugin-svgr',
    `gatsby-plugin-netlify`,
    `gatsby-plugin-remove-trailing-slashes`
  ]
}
