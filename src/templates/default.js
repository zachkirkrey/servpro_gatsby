import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'
import { parseBlocks } from '@utils/TransformCmsData'
import Seo from '../components/utils/Seo'

/* Each block should output a <section> into the <main> from <Layout> */
const DefaultTemplate = ({ data, pageContext }) => {
  const { sections } = data.cmsPageBuilderSinglePage
  const { title, seo } = pageContext
  return (
    <Layout>
      <Seo
        title={seo?.meta_title || title}
        description={seo?.meta_description}
        imageUrl={seo?.meta_image?.url}
      />
      {parseBlocks(sections)}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    cmsPageBuilderSinglePage(url: { eq: $slug }) {
      title
      url
      seo {
        meta_title
        meta_description
      }
      sections {
        ...BasicCTAData
        ...BlogrollData
        ...CommunityBannerData
        ...ContactBannerData
        ...FaqsData
        ...FranchiseDisclosureData
        ...GalleryData
        ...HeroData
        ...IconBulletsData
        ...IngredientsDisclosureData
        ...InsurerGridData
        ...MediaContentData
        ...MediacontentFaqsData
        ...MetroDetailData
        ...MultiBlogrollData
        ...PartnerLogosData
        ...QuicklinksData
        ...ResourceDetailData
        ...ReviewGridData
        ...RichtextBlockData
        ...ServicesDetailData
        ...ServicesSliderData
        ...SliderData
        ...SplitTextBannerData
        ...SubnavData
        ...TeamMembersData
        ...TestimonialData
        ...TextBannerData
        ...FormData
        ...AnchorData
      }
    }
  }
`

export default DefaultTemplate
