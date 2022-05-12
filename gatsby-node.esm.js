import path from 'path'
import {
  reverseGeoCode,
  rankedFranchiseByCoord,
  franchiseById
} from './src/api/utils/geo/geoHelpers'

/* Algolia Source for Pages */
const algoliasearch = require('algoliasearch')
const client = algoliasearch('SXQTSMSLU9', 'ee5fa3035d420655ffa33ec9bd348ac1')
const index = client.initIndex('franchise_locations_prod')

// Slugify function for URL paths, replaces:
//   whitespace -> dashes
//   unicode characters -> ascii letter, sans accents
// const slugify = string => {
//   const a =
//     'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
//   const b =
//     'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
//   const p = new RegExp(a.split('').join('|'), 'g')

//   return (
//     string
//       .toString()
//       .toLowerCase()
//       .replace(/\s+/g, '-') // Replace spaces with -
//       .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
//       .replace(/&/g, '-and-') // Replace & with 'and'
//       // TODO: probably get rid of unnecessary slashes and test if it works normally
//       // eslint-disable-next-line no-useless-escape
//       .replace(/[^\w\-]+/g, '') // Remove all non-word characters
//       // TODO: probably get rid of unnecessary slashes and test if it works normally
//       // eslint-disable-next-line no-useless-escape
//       .replace(/\-\-+/g, '-') // Replace multiple - with single -
//       .replace(/^-+/, '') // Trim - from start of text
//       .replace(/-+$/, '')
//   ) // Trim - from end of text
// }

// Create aliases to prevent deep nested relative linking
exports.onCreateWebpackConfig = ({ actions }) => {
  /*
  If aliases give you an eslint [import/no-unresolved]
  error with "Unable to resolve path to module":
    1. Install `eslint-import-resolver-alias`
    2. Create .eslintrc
    3. Add: settings > import/resolver > alias > fields
*/
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@landing-sections': path.resolve(
          __dirname,
          'src/components/landing-sections'
        ),
        '@atoms': path.resolve(__dirname, 'src/components/atoms'),
        '@blocks': path.resolve(__dirname, 'src/components/blocks'),
        '@sections': path.resolve(__dirname, 'src/components/sections'),
        '@utils': path.resolve(__dirname, 'src/components/utils'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        // '@pages': path.resolve(__dirname, 'src/pages'),
        '@templates': path.resolve(__dirname, 'src/templates')
      }
    }
  })
}

// Explicitly declare block schemas
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Map CMS data to GraphQL Fields
  const typeDefs = `
    union allCmsBlocksUnion =
      CmsBlockBasicCTA
    | CmsBlockBlogroll
    | CmsBlockCommunityBanner
    | CmsBlockContactBanner
    | CmsBlockFaqs
    | CmsBlockFranchiseDisclosure
    | CmsBlockGallery
    | CmsBlockHero
    | CmsBlockIconBullets
    | CmsBlockIngredientsDisclosure
    | CmsBlockInsurerGrid
    | CmsBlockMediaContent
    | CmsBlockMediacontentFaqs
    | CmsBlockMetroDetail
    | CmsBlockMultiBlogroll
    | CmsBlockPartnerLogos
    | CmsBlockQuicklinks
    | CmsBlockResourceDetail
    | CmsBlockReviewGrid
    | CmsBlockRichtext
    | CmsBlockServicesDetail
    | CmsBlockServicesSlider
    | CmsBlockSlider
    | CmsBlockSubnav
    | CmsBlockTeamMembers
    | CmsBlockTestimonial
    | CmsBlockTextBanner
    | CmsBlockForm
    | CmsAnchor

    union CmsBlockBlogrollReferencesUnion =
      Cms_article
    | Cms_press_release
    | Cms_service_detail
    | Cms_page_builder


    interface Cms_PageBuilder_SinglePage implements Node {
      id: ID!
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }


    type Cms_about implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_community_page implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_corporate_careers implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_customer_reviews_page implements Node & Cms_PageBuilder_SinglePage  @dontInfer{
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_franchise_disclosure_document implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
      page_title: String
    }
    type Cms_own_a_franchise implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_ingredients_disclosure_page implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_insurer_partners implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_insurer_professionals implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_press_photos implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_leadership_index implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }


    type Cms_article implements Node {
      title: String
      url: String
      seo: CmsGroupSeo
      settings: CmsGroupArticleSettings
      featured_image: Cms_assets @link(by: "id", from: "featured_image___NODE")
      show_date: Boolean
      authors: String
      content: String
      publish_details: CmsGroupArticlePublishDetails
      sidebar_widgets: [CmsGroupArticleSidebarWidgets]
    }
    type Cms_footer_disclaimers implements Node {
      title: String
      page_match: String
      content_before: String
      content: String
    }
    type Cms_press_release implements Node {
      title: String
      url: String
      seo: CmsGroupSeo
      featured_image: Cms_assets @link(by: "id", from: "featured_image___NODE")
      show_date: Boolean
      authors: String
      content: String
      publish_details: CmsGroupArticlePublishDetails
      sidebar_widgets: [CmsGroupArticleSidebarWidgets]
    }
    type Cms_metro_page implements Node {
      title: String
      url: String
      seo: CmsGroupSeo
      city: String
      state: [Cms_metro_parents] @link(by: "id", from: "state___NODE")
      hero: CmsBlockHero
      downtown_page: Boolean
      franchise_number: String
      page_content: CmsBlockMetroDetail
    }
    type Cms_metro_parents implements Node {
      title: String
      url: String
      seo: CmsGroupSeo
    }

    type Cms_metro_page_sections implements Node {
      blogroll: CmsBlockBlogroll
    }
    type Cms_location implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_location_page_sections implements Node {
      title: String
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_franchise_search_sections implements Node {
      title: String
      seo: CmsGroupSeo
      headline: String
      subheadline: String
      copy: String
      image: Cms_assets @link(by: "id", from: "image___NODE")
    }
    type Cms_page_builder implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_resources_page implements Node @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      show_press_releases: Boolean
      service_line: [Cms_service_types] @link(by: "id", from: "service_line___NODE")
      hero: CmsBlockHero
    }
    type Cms_service_detail implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }
    type Cms_service_types implements Node {
      title: String
      link: CmsFieldLink
      sort: Int
      icon: Cms_assets @link(by: "id", from: "icon___NODE")
      icon_inverse: Cms_assets @link(by: "id", from: "icon_inverse___NODE")
    }
    type Cms_faqs_page implements Node & Cms_PageBuilder_SinglePage @dontInfer {
      id: ID!
      title: String
      url: String
      seo: CmsGroupSeo
      sections: [CmsPageBuilderBlocks]
    }


    type Cms_assetsPublish_details {
      environment: String
      locale: String
      time: Date @dateformat
      user: String
    }
    type Cms_assetsDimension {
      height: Int
      width: Int
    }
    type Cms_assets implements Node @derivedTypes @dontInfer {
      uid: String
      created_at: Date @dateformat
      updated_at: Date @dateformat
      created_by: String
      updated_by: String
      content_type: String
      file_size: String
      tags: [String]
      filename: String
      url: String
      is_dir: Boolean
      _version: Int
      title: String
      publish_details: Cms_assetsPublish_details
      dimension: Cms_assetsDimension
      localAsset: File @link(by: "id", from: "localAsset___NODE")
      parent_uid: String
      description: String
    }


    type CmsFieldLink {
      title: String
      href: String
    }
    type CmsFieldSliderVariant {
      blogroll: CmsSliderVariantBlogroll
      icon_blurbs: CmsSliderVariantIconBlurbs
      icon_buttons: CmsSliderVariantIconButtons
      media_showcase: CmsSliderVariantMediaShowcase
      testimonials: CmsSliderVariantTestimonials
      timeline: CmsSliderVariantTimeline
    }


    type CmsGroupArticleSidebarWidgets {
      heading: String
      copy: String
    }
    type CmsGroupArticlePublishDetails {
      environment: String
      locale: String
      time: Date @dateformat
      user: String
    }
    type CmsGroupArticleSettings {
      is_featured: Boolean
      service_line: [Cms_service_types] @link(by: "id", from: "service_line___NODE")
    }
    type CmsGroupFaq {
      question: String!
      answer: String
    }
    type CmsGroupFaqsSettings {
      dark_mode: Boolean
    }
    type CmsGroupIconBlurb {
      icon: Cms_assets @link(by: "id", from: "icon___NODE")
      responsive: Boolean
      icon_on_left: Boolean
      heading: String
      content: String
      link: CmsFieldLink
      link_as_text: Boolean
    }
    type CmsGroupIconBulletsSettings {
      dark_mode: Boolean!
      one_column: Boolean!
      number_of_grid_columns: Int
      style: String
    }
    type CmsGroupIngredient {
      label: String
      disclosure_file: Cms_assets @link(by: "id", from: "disclosure_file___NODE")
      safety_datasheet_file: Cms_assets @link(by: "id", from: "safety_datasheet_file___NODE")
    }
    type CmsGroupInsurer {
      name: String
      logo: Cms_assets @link(by: "id", from: "logo___NODE")
      excerpt: String
    }
    type CmsGroupMediaContentContent {
      headline: String
      headline_type: String
      copy: String
      link: CmsFieldLink
      enable_local_cta: Boolean
    }
    type CmsGroupMediaContentMedia {
      external_video_embed: String
      external_video_embed_mobile: String
      video: Cms_assets @link(by: "id", from: "video___NODE")
      is_autoplay: Boolean
      image: Cms_assets @link(by: "id", from: "image___NODE")
    }
    type CmsGroupMediaContentSettings {
      background_color: String
      format: String
      has_breadcrumbs: Boolean
      hide_background: Boolean
      is_flipped: Boolean
      media_fill: Boolean
      media_full_width: Boolean
    }
    type CmsGroupMediacontentFaqsMediacontent {
      image: Cms_assets @link(by: "id", from: "image___NODE")
      content: String
      disable_background_dots: Boolean
    }
    type CmsGroupMediacontentFaqsFaqs {
      heading: String
      questions: [Cms_faqs_data] @link(by: "id", from: "questions___NODE")
      link: CmsFieldLink
    }
    type CmsGroupPartners {
      logo: Cms_assets @link(by: "id", from: "logo___NODE")
      link: CmsFieldLink
    }
    type CmsGroupReviewGridSettings {
      has_widget: Boolean
    }
    type CmsGroupSeo {
      meta_title: String
      meta_description: String
      meta_image: Cms_assets @link(by: "id", from: "meta_image___NODE")
    }
    type CmsGroupSplitTextBannerSettings {
      dark_mode: Boolean
      hide_background: Boolean
      has_breadcrumbs: Boolean
    }
    type CmsGroupSplitTextBannerHeadlinesFields {
      headline: String
      subheadline: String
    }
    type CmsGroupSplitTextBannerColFields {
      headline: String
      copy: String
      link: CmsFieldLink
    }
    type CmsGroupTestimonial {
      author_name: String
      author_company: String
      quote: String
      image: Cms_assets @link(by: "id", from: "image___NODE")
    }
    type CmsGroupTextBannerSettings {
      dark_mode: Boolean
      hide_background: Boolean
      has_breadcrumbs: Boolean
      headline_center: Boolean
      copy_center: Boolean
    }
    type CmsGroupFormSettings {
      hide_background: Boolean
    }
    type CmsGroupSpacing {
      top_gutter: Int
      bottom_gutter: Int
    }

    type CmsSliderVariantBlogroll {
      heading: String
      spacing: CmsGroupSpacing
      articles: [Cms_article] @link(by: "id", from: "articles___NODE")
    }
    type CmsSlideIconBlurb {
      icon: Cms_assets @link(by: "id", from: "icon___NODE")
      heading: String
      copy: String
    }
    type CmsSliderVariantIconBlurbsSettings {
      dark_mode: Boolean
      icon_on_left: Boolean
      number_of_slides: Int
    }
    type CmsSliderVariantIconBlurbs {
      heading: String
      sub_headline: String
      settings: CmsSliderVariantIconBlurbsSettings
      spacing: CmsGroupSpacing
      slides: [CmsSlideIconBlurb]
    }
    type CmsSlideIconButtons {
      icon: Cms_assets @link(by: "id", from: "icon___NODE")
      label: String
      link: CmsFieldLink
    }
    type CmsSliderVariantIconButtons {
      heading: String
      spacing: CmsGroupSpacing
      slides: [CmsSlideIconButtons]
    }
    type CmsSlideMediaShowcase {
      heading: String
      copy: String
      image: Cms_assets @link(by: "id", from: "image___NODE")
      video: Cms_assets @link(by: "id", from: "video___NODE")
    }
    type CmsSliderVariantMediaShowcase {
      heading: String
      spacing: CmsGroupSpacing
      slides: [CmsSlideMediaShowcase]
    }
    type CmsSliderVariantTestimonials {
      spacing: CmsGroupSpacing
      slides: [CmsGroupTestimonial]
    }
    type CmsSlideTimeline {
      year: Int
      heading: Date @dateformat
      copy: String
      image: Cms_assets @link(by: "id", from: "image___NODE")
    }
    type CmsSliderVariantTimeline {
      heading: String
      spacing: CmsGroupSpacing
      slides: [CmsSlideTimeline]
    }


    type CmsPageBuilderBlocks @dontInfer {
      basic_cta: CmsBlockBasicCTA
      blogroll: CmsBlockBlogroll
      community_banner: CmsBlockCommunityBanner
      contact_banner: CmsBlockContactBanner
      faqs: CmsBlockFaqs
      franchise_disclosure: CmsBlockFranchiseDisclosure
      gallery: CmsBlockGallery
      hero: CmsBlockHero
      icon_bullets: CmsBlockIconBullets
      ingredients_disclosure: CmsBlockIngredientsDisclosure
      insurer_grid: CmsBlockInsurerGrid
      media_content: CmsBlockMediaContent
      mediacontent_faqs: CmsBlockMediacontentFaqs
      metro_detail: CmsBlockMetroDetail
      multi_blogroll: CmsBlockMultiBlogroll
      partner_logos: CmsBlockPartnerLogos
      quicklinks: CmsBlockQuicklinks
      resource_detail: CmsBlockResourceDetail
      review_grid: CmsBlockReviewGrid
      richtext_block: CmsBlockRichtext
      services_detail: CmsBlockServicesDetail
      services_slider: CmsBlockServicesSlider
      slider: CmsBlockSlider
      split_text_banner: CmsBlockSplitTextBanner
      subnav_stripe: CmsBlockSubnav
      team_member_grid: CmsBlockTeamMembers
      testimonial: CmsBlockTestimonial
      text_banner: CmsBlockTextBanner
      form: CmsBlockForm
      anchor: CmsAnchor
    }


    type CmsBlockBasicCTA {
      use_default_cta: Boolean
      disable_mobile: Boolean
      disable_desktop: Boolean
      background_image: Cms_assets @link(by: "id", from: "background_image___NODE")
      heading: String
      subheading: String
      button_link: CmsFieldLink
    }
    type CmsBlockBlogroll {
      heading: String
      subheading: String
      related_content: [CmsBlockBlogrollReferencesUnion] @link(by: "id", from: "related_content___NODE")
    }
    type CmsGroupCommunityBannerBackground {
      image: Cms_assets @link(by: "id", from: "image___NODE")
      fill_screen_height: Boolean
    }
    type CmsGroupCommunityBannerContent {
      disable_content: Boolean
      alignment: String
      icon: Cms_assets @link(by: "id", from: "icon___NODE")
      headline: String
      copy: String
      button_link: CmsFieldLink
    }
    type CmsBlockCommunityBanner {
      background: CmsGroupCommunityBannerBackground
      content: CmsGroupCommunityBannerContent
    }
    type CmsBlockContactBanner {
      content: [Cms_contact_banner_data] @link(by: "id", from: "content___NODE")
    }
    type CmsBlockFaqs {
      settings: CmsGroupFaqsSettings
      link: CmsFieldLink
      headline: String
      byline: String
      questions: [Cms_faqs_data] @link(by: "id", from: "questions___NODE")
    }
    type CmsGroupLinkList {
      list_heading: String
      links: [CmsFieldLink]
    }
    type CmsBlockFranchiseDisclosure {
      page_heading: String
      lists: [CmsGroupLinkList]
    }
    type CmsBlockGallery {
      heading: String
      subheading: String
      images: [Cms_assets] @link(by: "id", from: "images___NODE")
    }
    type CmsBlockHero {
      has_location_widget: Boolean
      fullwidth_background: Boolean
      hero_offset: Boolean
      heading: String
      subheading: String
      copy: String
      button_link: CmsFieldLink
      button_link_2: CmsFieldLink
      image: Cms_assets @link(by: "id", from: "image___NODE")
    }
    type CmsBlockIconBullets {
      settings: CmsGroupIconBulletsSettings
      spacing: CmsGroupSpacing
      headline: String
      subheadline: String
      copy: String
      blurbs: [CmsGroupIconBlurb]
      button_link: CmsFieldLink
    }
    type CmsBlockIngredientsDisclosure {
      heading: String
      copy: String
      ingredients: [CmsGroupIngredient]
    }
    type CmsBlockInsurerGrid {
      insurers: [CmsGroupInsurer]
    }
    type CmsBlockMediaContent {
      settings: CmsGroupMediaContentSettings
      media: CmsGroupMediaContentMedia
      content: CmsGroupMediaContentContent
    }
    type CmsBlockMediacontentFaqs {
      mediacontent: CmsGroupMediacontentFaqsMediacontent
      faqs: CmsGroupMediacontentFaqsFaqs
    }
    type CmsBlockMetroDetail {
      copy: String
    }
    type CmsGroupMultiBlogrollSubblog {
      heading: String
      articles: [Cms_article_list] @link(by: "id", from: "articles___NODE")
    }
    type CmsBlockMultiBlogroll {
      subblog: [CmsGroupMultiBlogrollSubblog]
    }
    type CmsBlockPartnerLogos {
      heading: String
      partners: [CmsGroupPartners]
    }
    type CmsBlockQuicklinks {
      heading: String
      links: [CmsFieldLink]
    }
    type CmsBlockResourceDetail {
      copy: String
      image: Cms_assets @link(by: "id", from: "image___NODE")
      read_more: CmsFieldLink
    }
    type CmsBlockRichtext {
      content: String
    }
    type CmsBlockReviewGrid {
      settings: CmsGroupReviewGridSettings
      reviews: [Cms_customer_reviews] @link(by: "id", from: "reviews___NODE")
    }
    type CmsGroupQuicklinks {
      heading: String
      links: [CmsFieldLink]
    }
    type CmsBlockServicesDetail {
      headline: String
      copy: String
      quicklinks: CmsGroupQuicklinks
    }
    type CmsBlockServicesSlider {
      services: [Cms_service_types] @link(by: "id", from: "services___NODE")
    }
    type CmsBlockSlider {
      variants: [CmsFieldSliderVariant]
    }
    type CmsBlockSplitTextBanner {
      settings: CmsGroupSplitTextBannerSettings
      headlines: CmsGroupSplitTextBannerHeadlinesFields
      left: CmsGroupSplitTextBannerColFields
      right: CmsGroupSplitTextBannerColFields
    }
    type CmsBlockSubnav {
      subnav: [Cms_subnav] @link(by: "id", from: "subnav___NODE")
    }
    type CmsBlockTeamMembers {
      team_members: [Cms_leadership] @link(by: "id", from: "team_members___NODE")
    }
    type CmsBlockTestimonial {
      author_name: String
      author_company: String
      quote: String
      image: Cms_assets @link(by: "id", from: "image___NODE")
    }
    type CmsBlockTextBanner {
      settings: CmsGroupTextBannerSettings
      spacing: CmsGroupSpacing
      headline: String
      subheadline: String
      copy: String
      link: CmsFieldLink
    }
    type CmsBlockForm {
      spacing: CmsGroupSpacing
      headline: String
      copy: String
      form_id: String
      submit_button_label: String
      thank_you_message: String
      settings: CmsGroupFormSettings
    }
    type CmsAnchor {
      anchor_id: String
    }
  `
  createTypes(typeDefs)

  // Print current Types to a .txt file
  // actions.printTypeDefinitions({ path: './typeDefs.txt' })
}

// Create pages from CMS Content Types
exports.createPages = async ({ actions, graphql }) => {
  // Query for Contentstack (Cms) Page Templates
  const { data } = await graphql(`
    query {
      allCmsPageBuilderSinglePage {
        nodes {
          url
          title
          seo {
            meta_title
            meta_description
            meta_image {
              url
            }
          }
        }
      }
      allCmsPressRelease {
        nodes {
          url
          title
          seo {
            meta_description
            meta_image {
              url
            }
            meta_title
          }
          content
          publish_details {
            time
          }
          featured_image {
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
      allCmsArticle(sort: { fields: publish_details___time, order: DESC }) {
        nodes {
          title
          seo {
            meta_description
            meta_image {
              url
            }
            meta_title
          }
          content
          url
          settings {
            is_featured
            service_line {
              title
            }
          }
          publish_details {
            time
          }
          featured_image {
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
      allCmsServiceTypes(sort: { fields: sort, order: ASC }) {
        nodes {
          title
          sort
          franchise_service_mapping
        }
      }
      allCmsResourcesPage {
        nodes {
          title
          seo {
            meta_description
            meta_title
            meta_image {
              url
            }
          }
          url
          show_press_releases
          service_line {
            title
          }
        }
      }
      allCmsLeadership {
        nodes {
          url
        }
      }
      allCmsMetroParents(sort: { fields: title, order: DESC }) {
        nodes {
          title
          url
          canadian_province
        }
      }
      allCmsMetroPage {
        nodes {
          url
          city
          state {
            url
          }
          downtown_page
          franchise_number
          title
          seo {
            meta_title
            meta_description
            meta_image {
              url
            }
          }
        }
      }
      allCmsGlossaryTerm {
        nodes {
          url
        }
      }
    }
  `)

  // Creates static pages from "Single" CMS Content Type: Web Page
  const { nodes: singlePages } = data.allCmsPageBuilderSinglePage
  singlePages.map(node => {
    const slug = node.url
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/default.js`),
      context: { slug, title: node.title, seo: node.seo }
    })
  })

  // Creates static pages from CMS Page Template: Press Release
  const { nodes: pressReleases } = data.allCmsPressRelease
  pressReleases.map(node => {
    // slug: `/press/{url}`
    const slug = node.url
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/article.js`),
      context: {
        hasLocationWidget: false,
        slug,
        title: node.title,
        seo: node.seo
      }
    })
  })

  // Creates static pages from CMS Page Template: Article
  const { nodes: articles } = data.allCmsArticle
  articles.map(node => {
    const slug = node.url
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/article.js`),
      context: {
        hasLocationWidget: true,
        slug,
        title: node.title,
        seo: node.seo
      }
    })
  })

  // ----------------------------------
  // START: heavy lifting in the Resource Center, comments
  // ----------------------------------
  // SECTION: CMS
  // We'll need both CMS: `Service Types`...
  const { nodes: serviceTypes } = data.allCmsServiceTypes
  // ...and CMS: `Resources Page`
  const { nodes: resourcePages } = data.allCmsResourcesPage

  // ----------------------------------
  // SECTION: HELPER FUNCTIONS
  const articlesByServiceTitle = serviceTitle => {
    const serviceArticles = articles.filter(
      art =>
        !!art.settings.service_line &&
        !!art.settings.service_line[0] &&
        art.settings.service_line[0].title === serviceTitle.toString()
    )
    // If this `Service Type` has `featured` articles
    const featuredArticles = serviceArticles.length
      ? serviceArticles
          .filter(art => !!art.settings.is_featured)
          // Featured images are required for the resource center featureds
          .filter(f => !!f.featured_image)
          // Sort by publish time, desc
          // eslint-disable-next-line no-confusing-arrow
          .sort((a, b) =>
            a.publish_details.time < b.publish_details.time ? 1 : -1
          )
      : []
    return { featuredArticles, serviceArticles }
  }

  const resourcePageByServiceTitle = serviceTitle => {
    const singleResourcePages = resourcePages.filter(
      r => !!r.service_line && !!r.service_line[0] && !!r.service_line[0].title
    )
    const resourcePageMatches = singleResourcePages.filter(
      r => r.service_line[0].title == serviceTitle.toString()
    )
    return resourcePageMatches.length ? resourcePageMatches[0] : null
  }

  // ----------------------------------
  // SECTION: SINGLE PAGE GENERATOR
  const serviceTypeToSinglePage = serviceTitle => {
    const serviceHeading = `${serviceTitle} Articles`
    const { featuredArticles, serviceArticles } =
      articlesByServiceTitle(serviceTitle)
    // This one goes into the `ResourceDetail`, and is stripped from the return.
    // TODO: Don't pull one if it lacks `featuredImage` (extract from index)
    const primaryFeatured = featuredArticles.length
      ? featuredArticles[0]
      : serviceArticles[0]
    // Get the right CMS: Resource Page
    const resourcePage = resourcePageByServiceTitle(serviceTitle)
    // If this `Service Type` lacks a `Resource Page`, there's nothing to build
    if (!resourcePage) {
      return
    }
    // Creates static pages from CMS Page Template: Resources Page
    const slug = resourcePage.url
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/resources.js`),
      context: {
        slug,
        title: resourcePage.title,
        seo: resourcePage.seo,
        showSubNav: true,
        articles: {
          isIndex: false,
          primaryArticle: primaryFeatured,
          subblog: [
            {
              heading: serviceHeading,
              url: '',
              articles: serviceArticles.filter(art => art !== primaryFeatured)
            }
          ]
        }
      }
    })
  }

  // Call the page generator per service in CMS: Service Types
  serviceTypes.map(service => serviceTypeToSinglePage(service.title.toString()))

  // ----------------------------------
  // SECTION: INDEX PAGE
  const generateResourceArticlesIndexPage = () => {
    const sortedAllFeatureds = articles
      .filter(art => !!art.settings.is_featured)
      // Featured images are required for the resource center featureds
      .filter(f => !!f.featured_image)
      // Sort by publish time, desc
      // eslint-disable-next-line no-confusing-arrow
      .sort((a, b) =>
        a.publish_details.time < b.publish_details.time ? 1 : -1
      )

    // Pull the newest for `ResourceDetail` block
    const primaryFeatured = sortedAllFeatureds.length
      ? sortedAllFeatureds[0]
      : {}

    // For each `Service Type`, build our article list for the subblog
    const indexPosts = serviceTypes.map(service => {
      const serviceTitle = service.title.toString()
      const { featuredArticles, serviceArticles } =
        articlesByServiceTitle(serviceTitle)

      // Build the favorites:
      let featureds = featuredArticles.filter(f => f !== primaryFeatured)
      featureds = [...featureds, {}, {}].slice(0, 2)

      // Build the recents/rest:
      const recents = serviceArticles.filter(
        f =>
          f !== primaryFeatured &&
          !featureds.map(b => b.title).includes(f.title)
      )

      if (!featuredArticles.length && !recents.length) {
        return {}
      }

      const servicePosts = [...featureds, ...recents].slice(0, 5)
      const serviceLink = resourcePageByServiceTitle(serviceTitle)
        ? resourcePageByServiceTitle(serviceTitle).url
        : '/'

      return {
        heading: serviceTitle,
        url: serviceLink,
        articles: servicePosts
      }
    })

    // Create Resource Center Index Page
    const slug = `/resources`
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/resources.js`),
      context: {
        slug,
        title: 'Resources',
        showSubNav: true,
        articles: {
          isIndex: true,
          primaryArticle: primaryFeatured,
          subblog: indexPosts
        }
      }
    })
  }
  // Call the index page builder
  generateResourceArticlesIndexPage()
  // ----------------------------------

  const generateResourcePressIndexPage = () => {
    // const sortedPress = pressReleases.sort((a, b) =>
    //   a.publish_details.time < b.publish_details.time ? 1 : -1
    // )

    // Regex for `/news-press-releases/{any number}`
    const prRegEx = /^\/news-press-releases\/[0-9]/i
    // Helper function to turn a PR url into the year for sorting
    const prUrlToYear = url => url.slice(21, 23)

    // Start bucketing press releases by year:
    const sortedPress = pressReleases
      // Filter ones with incorrect url structure..
      .filter(pr => !!pr.url && !!pr.url.match(prRegEx))
      // Sort by year, desc
      // eslint-disable-next-line no-confusing-arrow
      .sort((a, b) => (a.url < b.url ? 1 : -1))

    // For each year, build our PR list for the subblog
    const yearsWithPrs = new Set(sortedPress.map(pr => prUrlToYear(pr.url)))
    const indexPRs = Array.from(yearsWithPrs).map(yr => {
      const yearTitle = `20${yr}`
      const yearPRs = sortedPress.filter(pr => prUrlToYear(pr.url) === yr)

      return {
        heading: yearTitle,
        url: '',
        articles: yearPRs
      }
    })

    // TODO(?): Primary

    // Create Resource Center Index Page
    const slug = `/about/news-press-releases`
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/resources.js`),
      context: {
        slug,
        title: 'News and Press Releases',
        showSubNav: false,
        articles: {
          isIndex: true,
          subblog: indexPRs
        }
      }
    })
  }
  // Call the index page builder
  generateResourcePressIndexPage()

  // ----------------------------------
  // END: Resource Center
  // ----------------------------------

  // Creates static pages from CMS Page Template: Leadership
  const { nodes: leadershipPages } = data.allCmsLeadership
  leadershipPages.map(node => {
    const slug = node.url
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/leadership.js`),
      context: { slug }
    })
  })

  // ----------------------------------
  // Creates static pages from CMS Page Template: Metro Page
  const { nodes: metroPages } = data.allCmsMetroPage
  const { nodes: metroStatePages } = data.allCmsMetroParents

  // All the async/fetch stuff:
  const getMetroPageData = async () =>
    Promise.all(
      metroPages.map(async node => {
        const slug = node.url.replace(/^.*\/(.*)$/, '$1')
        const state = node.state
        const state_slug = state ? state[0].url : '/all'
        const state_abbr = state_slug
          ? state_slug.substring(1).toUpperCase()
          : ''
        const city = node.city
        const downtown = !!node.downtown_page
        const franchise_number = node.franchise_number || false

        let franchises = []
        let metro_geo = {}

        if (!downtown && !!city && !!state_slug) {
          const address = `${city}, ${state_abbr}`
          const geo = await reverseGeoCode({ address })
          if (!!geo && !!geo.latitude && !!geo.longitude) {
            console.info(`${address}: ${geo.latitude},${geo.longitude}`)
            franchises = await rankedFranchiseByCoord(
              geo.latitude,
              geo.longitude,
              ['-ProfileExcerpt']
            )
            metro_geo = { longitude: geo.longitude, latitude: geo.latitude }
          }
        }

        if (downtown === true && !!franchise_number) {
          franchises = await franchiseById(franchise_number)
        }

        return {
          path: `/locations${state_slug}/${slug}`,
          component: require.resolve(`./src/templates/metro.js`),
          context: {
            slug: node.url,
            franchises,
            city,
            state_abbr,
            metro_geo,
            title: node.title,
            seo: node.seo
          }
        }
      })
    )
  const metroPageData = await getMetroPageData()
  metroPageData.map(metroPageDataItem => actions.createPage(metroPageDataItem))

  // STATES STUFF
  const metroStateLinks = metroStatePages
    .map(state => ({
      ...state,
      metros: metroPages.filter(
        metro =>
          !!metro.state &&
          !!metro.state.length &&
          state.url === metro.state[0].url
      )
    }))
    // eslint-disable-next-line no-confusing-arrow
    .sort((a, b) => (a.title > b.title ? 1 : -1))
  metroStateLinks.map(async state => {
    const { title: stateName, url: stateSlug, metros: stateMetros } = state
    const state_abbr = stateSlug.substring(1).toUpperCase()
    const algolia_res = await index.search('', {
      facetFilters: [
        [`yext.address.region:${state_abbr}`],
        ['TempOutOfService: false']
      ],
      attributesToRetrieve: [
        '*', // retrieves all attributes
        '-_highlightResult', // except the search highlight data
        '-BlogPosts' // except posts (it's a big field)
      ]
    })

    const pageData = {
      path: `/locations${stateSlug}`,
      component: require.resolve(`./src/templates/metro-state.js`),
      context: {
        slug: stateSlug,
        title: stateName,
        allStateLinks: metroStateLinks,
        thisStateLinks: stateMetros,
        franchiseLinks: algolia_res.hits
      }
    }
    actions.createPage(pageData)
  })

  // ----------------------------------
  // Creates static pages from CMS Page Template: Glossary Terms
  const { nodes: glossaryTerms } = data.allCmsGlossaryTerm
  glossaryTerms.map(node => {
    const slug = node.url.replace(/^.*\/(.*)$/, '$1')
    actions.createPage({
      path: `/resources/glossary/${slug}`,
      component: require.resolve(`./src/templates/glossary-term.js`),
      context: { slug: node.url, title: node.title, seo: node.seo }
    })
  })

  // Query all franchises
  let algoliaData = []
  await index.browseObjects({
    batch: batch => (algoliaData = algoliaData.concat(batch))
  })
  algoliaData = algoliaData.filter(fr => !!fr.yext && !!fr.yext.name)

  // Build franchise location page links
  const franchiseLinks = algoliaData.map(fr => ({
    text: fr.yext.name,
    url: `/locations/${fr.yext.meta.id}`
  }))

  // Index
  actions.createPage({
    path: `/locations/list`,
    component: require.resolve(`./src/templates/locations-index.js`),
    context: {
      locations: franchiseLinks
    }
  })

  // Singles
  algoliaData.map(hit => {
    const {
      franchiseNumber,
      permalink,
      average_rating,
      review_count,
      ServicesProvided,
      BlogPosts,
      ProfileExcerpt,
      yext
    } = hit
    const {
      name,
      address,
      description,
      mainPhone,
      serviceArea,
      c_baseURL,
      addressHidden
    } = yext
    actions.createPage({
      path: permalink,
      component: require.resolve(`./src/templates/dynamic-location.js`),
      context: {
        franchiseNumber,
        permalink,
        name,
        address,
        description,
        mainPhone,
        average_rating,
        review_count,
        serviceArea,
        ServicesProvided,
        BlogPosts,
        ProfileExcerpt,
        website: c_baseURL,
        addressHidden
      }
    })
  })
}
