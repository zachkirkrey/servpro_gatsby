import React from 'react'
import tw, { styled } from 'twin.macro'
import { css } from '@emotion/react'
import { Helmet } from 'react-helmet'

import Layout from '@components/Layout'
import Container from '@atoms/Container'
import AccessibleLink from '@atoms/AccessibleLink'
import Button from '@atoms/Button'
import { RatingSummary } from '@atoms/RatingSummary'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import SplitHero from '@sections/SplitHero'
import ArticleCard from '@sections/ArticleCard'
import { useLocationPageSections } from '@hooks/use-location-page-sections'
import { useServiceTypes } from '@hooks/use-service-types'
import formatPhoneLink from '@utils/format-phone-link'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import { parseBlocks } from '@utils/TransformCmsData'
import { truncateHTML } from '../components/utils/Truncate'
import { filterSortServiceTypes } from '@utils/serviceTypesHelpers'
import { generateFranchiseLdJsonMarkup } from '../components/utils/franchise-ld-json-markup'
import { generateFranchiseLdJsonMarkupReviews } from '../components/utils/franchise-ld-json-markup-reviews'
import { generateFranchiseLdJsonMarkupService } from '../components/utils/franchise-ld-json-markup-service'
import Seo from '../components/utils/Seo'

// HERO CONTENT
// -------------------
const HeroContent = ({ data }) => {
  const {
    address,
    mainPhone,
    average_rating,
    review_count,
    serviceArea,
    addressHidden
  } = data
  const { line1, line2, city, region, postalCode } = address

  return (
    <div tw="mt-5 text-gray-800">
      <div tw="mb-5">
        <h4 tw="text-xl mb-2 text-primary">
          Call Today <br /> 24/7 Emergency Services
        </h4>
        <AccessibleLink href={`tel:${mainPhone}`}>
          <Button to={`tel:${formatPhoneLink(mainPhone)}`}>
            {formatPhoneLink(mainPhone)}
          </Button>
        </AccessibleLink>
      </div>
      {review_count !== 0 && (
        <RatingSummary rating={average_rating} count={review_count} />
      )}
      {!addressHidden && (
        <Address>
          <h4 tw="font-medium text-primary">Address</h4>
          {!!line1 && (
            <>
              {line1}
              <br />
            </>
          )}
          {!!line2 && (
            <>
              {line2}
              <br />
            </>
          )}
          {city}, {region} {postalCode}
        </Address>
      )}

      {!!serviceArea && !!serviceArea?.places?.length > 0 && (
        <ServiceAreas>
          <h4 tw="font-medium text-primary">Service Area</h4>
          <div>{serviceArea.places.join(' | ')}</div>
        </ServiceAreas>
      )}
    </div>
  )
}
const ServiceAreas = tw.div`mt-3`

const Address = tw.address`block`

// SERVICES SECTION
// -------------------
const ServicesSection = ({ data }) => {
  const { headline, services, serviceTypes, website } = data

  return (
    <Background
      isDarkMode={false}
      isHideBackground={true}
      css={paddingDefault()}>
      <Container>
        <ContentWrap>
          <FranchisePageHeading
            tw="mb-8"
            dangerouslySetInnerHTML={{ __html: apCaseOnlyTitleTags(headline) }}
          />

          <div tw="mb-6">
            <ServiceTypes
              data={filterSortServiceTypes(serviceTypes, services)}
            />
            <div tw="mt-8">
              <h4 tw="font-semibold">Additional Services</h4>
              <ul>
                {!!services &&
                  !!services.length > 0 &&
                  services.map((item, id) => {
                    return (
                      <ServiceTypeLi key={id} tw="inline">
                        {item.service_line}
                      </ServiceTypeLi>
                    )
                  })}
              </ul>
            </div>
          </div>

          <AccessibleLink target="_blank" to={website}>
            <Button>Visit Our Site</Button>
          </AccessibleLink>
        </ContentWrap>
      </Container>
    </Background>
  )
}

const ServiceTypes = ({ data }) => {
  return (
    <ul tw="grid grid-cols-2 gap-3 md:(grid-cols-4)">
      {!!data &&
        !!data.length > 0 &&
        data.map((item, id) => {
          return <ServiceTypesItem key={id} data={item} />
        })}
    </ul>
  )
}

const ServiceTypesItem = ({ data }) => {
  if (!data) {
    return <></>
  }

  return (
    <li tw="flex flex-col justify-start md:(flex-row items-center)">
      {!!data.icon?.url && (
        <ServiceTypeIconWrapper>
          <SvgSafeGatsbyImage
            tw="flex-none w-8 h-full md:(w-12)"
            image={data.icon}
            alt={data.icon.title}
          />
        </ServiceTypeIconWrapper>
      )}
      <ServiceTypeItemHeading>{data.title}</ServiceTypeItemHeading>
    </li>
  )
}

const ServiceTypeLi = styled.li`
  &:after {
    content: ', ';
  }
  &:last-child:after {
    content: '';
  }
`

const ServiceTypeIconWrapper = styled.div(() => [tw`relative flex-shrink flex`])

const ServiceTypeItemHeading = styled.h4(() => [
  tw`text-lg font-semibold md:(text-xl ml-2)`
])

const Background = styled.div(({ isHideBackground, isDarkMode }) => [
  isHideBackground ? tw`bg-white` : tw`bg-gray-100`,
  isDarkMode && tw`bg-primary-black text-white`
])
const ContentWrap = styled.div(() => [])

// ABOUT ME SECTION
// ----------
const FranchiseAboutMeSection = ({ copy, headline }) => {
  const copyMaxLength = 250
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Background
      isDarkMode={false}
      isHideBackground={false}
      css={paddingDefault()}>
      <Container>
        <ContentWrap>
          <FranchisePageHeading>{headline}</FranchisePageHeading>
          <Copy
            css={FranchiseRichTextEditorStyles}
            dangerouslySetInnerHTML={{
              __html: collapsed ? copy : truncateHTML(copy, copyMaxLength)
            }}
          />
          <div tw="mt-4">
            <AccessibleLink onClick={() => setCollapsed(state => !state)}>
              Read {collapsed ? 'less' : 'more'} ›
            </AccessibleLink>
          </div>
        </ContentWrap>
      </Container>
    </Background>
  )
}

const Copy = styled.div(() => [tw`text-lg mx-auto lg:(text-xl)`])

const FranchiseRichTextEditorStyles = css`
  & {
    p {
      margin-bottom: 1.2rem;
    }
    strong,
    h1,
    h2,
    h3,
    h4,
    h5 {
      font-weight: bold;
      margin: 2rem 0 0.5rem;
    }
    i {
      font-style: italic;
    }
    padding: 0;
    margin: 0;
    white-space: pre-line;
  }
`

// FRANCHISE BLOG SECTION
// ------------
const FranchiseBlogSection = ({ data, heading }) => {
  return (
    <Background
      isDarkMode={false}
      isHideBackground={true}
      css={paddingDefault()}>
      <Container>
        <ContentWrap>
          {!!data && !!data.length > 0 && (
            <FranchisePageHeading>{heading}</FranchisePageHeading>
          )}
          <BlogrollGrid>
            {!!data &&
              !!data.length > 0 &&
              data.map(item => {
                const articleData = {
                  title: item.BlogTitle,
                  content: item.BlogExcerpt,
                  url: item.BlogPermaLink
                }

                return (
                  <BlogrollGridItem key={item.BlogTitle}>
                    <ArticleCard htmlContent={false} article={articleData} />
                  </BlogrollGridItem>
                )
              })}
          </BlogrollGrid>
        </ContentWrap>
      </Container>
    </Background>
  )
}

const BlogrollGrid = tw.ul`grid grid-cols-1 gap-8 md:(grid-cols-2 gap-y-16) lg:(grid-cols-3)`
const BlogrollGridItem = tw.li`flex-auto w-full`

// LOCATION PAGE TEMPLATE
// -------------------
const LocationPage = ({ pageContext, location }) => {
  const { edges: serviceTypes } = useServiceTypes()
  const {
    name,
    address,
    mainPhone,
    ServicesProvided: servicesProvided,
    ProfileExcerpt: profileExcerpt,
    BlogPosts: blogPosts,
    website,
    description,
    average_rating,
    review_count
  } = pageContext

  const heroImage = {
    filename: 'servpro_vehicle.jpg',
    title: 'servpro_vehicle.jpg',
    url: 'https://images.contentstack.io/v3/assets/blt0a0cb058815d4d96/blt9af1c0e2eaba012a/servpro_vehicle.jpeg'
  }

  const { sections } = useLocationPageSections()

  const seo_desc = `${name} is available 24 hours/7 days a week and will respond quickly to your restoration emergency.`

  return (
    <Layout>
      <Seo title={name} description={seo_desc} />
      <Helmet>
        <script type="application/ld+json">
          {address &&
            generateFranchiseLdJsonMarkup({
              name,
              streetAddress: `${address.line1}${
                address.line2 ? ` ${address.line2}` : ''
              }`,
              addressLocality: address.city,
              addressRegion: address.region,
              postalCode: address.postalCode,
              url: `${location.origin}/${location.pathname}`,
              telePhone: mainPhone
            })}
        </script>
        <script type="application/ld+json">
          {address &&
            generateFranchiseLdJsonMarkupReviews({
              name,
              description,
              // image,
              ratingValue: average_rating,
              // bestRating,
              // worstRating,
              ratingCount: review_count
            })}
        </script>
        <script type="application/ld+json">
          {address &&
            generateFranchiseLdJsonMarkupService({
              name
            })}
        </script>
      </Helmet>
      <SplitHero data={{ heading: name, image: heroImage }}>
        <HeroContent data={pageContext} />
      </SplitHero>
      <FranchiseAboutMeSection headline="About Us" copy={profileExcerpt} />
      <ServicesSection
        data={{
          headline: 'Services We Provide',
          services: servicesProvided,
          serviceTypes,
          website
        }}
      />
      {parseBlocks(sections)}
      <FranchiseBlogSection data={blogPosts} heading="Recommended For You" />
    </Layout>
  )
}

const FranchisePageHeading = tw.h2`text-36px leading-tight mb-4 lg:(mb-6)`

export default LocationPage
