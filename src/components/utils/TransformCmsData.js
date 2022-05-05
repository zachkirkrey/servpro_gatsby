import React from 'react'
import {
  BasicCTA,
  Blogroll,
  CommunityBanner,
  ContactBanner,
  Faqs,
  FranchiseDisclosure,
  Gallery,
  Hero,
  IconBullets,
  IngredientsDisclosure,
  InsurerGrid,
  MediaContent,
  MediacontentFaqs,
  MetroDetail,
  MultiBlogroll,
  PartnerLogos,
  Quicklinks,
  ResourceDetail,
  ReviewGrid,
  RichtextBlock,
  ServicesDetail,
  ServicesSlider,
  Slider,
  SplitTextBanner,
  Subnav,
  TeamMembers,
  Testimonial,
  TextBanner,
  Form,
  UnsupportedBlock,
  Anchor
} from '@blocks'

// Take the raw data and strip all empty blocks to find the one with data.
const getBlockName = block =>
  Object.keys(block).filter(key => block[key] !== null)

// Pull the raw data from the block; will be processed per block.
const getBlockData = (block, key) => block[key]

// Turns a block's raw data into a renderable component.
const toBlock = (name, data) => {
  // Enum representing the connection between blocks and their React components.
  const Blocks = Object.freeze({
    basic_cta: <BasicCTA data={data} />,
    blogroll: <Blogroll data={data} />,
    community_banner: <CommunityBanner data={data} />,
    contact_banner: <ContactBanner data={data} />,
    faqs: <Faqs data={data} />,
    franchise_disclosure: <FranchiseDisclosure data={data} />,
    gallery: <Gallery data={data} />,
    hero: <Hero data={data} />,
    icon_bullets: <IconBullets data={data} />,
    ingredients_disclosure: <IngredientsDisclosure data={data} />,
    insurer_grid: <InsurerGrid data={data} />,
    media_content: <MediaContent data={data} />,
    mediacontent_faqs: <MediacontentFaqs data={data} />,
    metro_detail: <MetroDetail data={data} />,
    multi_blogroll: <MultiBlogroll data={data} />,
    partner_logos: <PartnerLogos data={data} />,
    quicklinks: <Quicklinks data={data} />,
    resource_detail: <ResourceDetail data={data} />,
    review_grid: <ReviewGrid data={data} />,
    richtext_block: <RichtextBlock data={data} />,
    services_detail: <ServicesDetail data={data} />,
    services_slider: <ServicesSlider data={data} />,
    slider: <Slider data={data} />,
    split_text_banner: <SplitTextBanner data={data} />,
    subnav_stripe: <Subnav data={data} />,
    team_member_grid: <TeamMembers data={data} />,
    testimonial: <Testimonial data={data} />,
    text_banner: <TextBanner data={data} />,
    form: <Form data={data} />,
    anchor: <Anchor data={data} />
  })

  // "name" comes in as an Object.
  return Blocks[name.toString()] ?? <UnsupportedBlock data={data} />
}

// Takes `CmsPageBuilderBlocks` and returns front-end.
// eslint-disable-next-line no-confusing-arrow
const parseBlocks = blocks =>
  blocks
    ? blocks.map((block, idx) => {
        const blockName = getBlockName(block)
        const blockData = getBlockData(block, blockName)
        return (
          <React.Fragment key={idx}>
            {toBlock(blockName, blockData)}
          </React.Fragment>
        )
      })
    : null

export { parseBlocks }
