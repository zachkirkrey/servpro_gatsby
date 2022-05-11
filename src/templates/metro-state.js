import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Layout from '@components/Layout'
import SplitHero from '@components/sections/SplitHero'
import Container from '@atoms/Container'
import paddingDefault from '@components/utils/paddingDefault'
import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import forEach from 'lodash/forEach'
import Seo from '../components/utils/Seo'

const MetroStatePage = ({ data, pageContext }) => {
  const { cmsMetroStateSections: cmsData } = data

  const {
    slug: stateSlug,
    title: stateName,
    thisStateLinks,
    franchiseLinks,
    seo
  } = pageContext

  const franchiseLinksUniq = uniqBy(franchiseLinks, 'yext.name')

  const replacements = {
    stateName
  }

  const interpolate = string =>
    string.replace(/{(.*?)}/g, (match, offset) => replacements[offset])

  const heroData = {
    heading: interpolate(cmsData.headline),
    subheading: interpolate(cmsData.subheadline),
    copy: interpolate(cmsData.copy),
    image: cmsData.image
  }

  const meta_title = `SERVPRO Locations in ${stateName}`
  const meta_desc = `Wherever you are located, SERVPRO is Here to Help. We service all cities and zip codes in ${stateName}.`

  return (
    <Layout>
      <Seo
        title={seo?.meta_title || meta_title}
        description={seo?.meta_description || meta_desc}
        imageUrl={seo?.meta_image?.url}
      />

      <SplitHero data={heroData} />

      <Background
        isDarkMode={false}
        isHideBackground={false}
        css={paddingDefault()}>
        <Container>
          <ContentWrap>
            <ListHeading>
              There is always a SERVPRO nearby to help make your property damage
              “Like it never even happened.”
            </ListHeading>

            <MetroList>
              {orderBy(thisStateLinks, ['city']).map(metro => (
                <MetroName key={metro.city}>
                  <Link to={`/locations${stateSlug}${metro.url}`}>
                    {metro.city}
                  </Link>
                </MetroName>
              ))}
            </MetroList>

            <Divider />

            <MetroList>
              {orderBy(franchiseLinksUniq, ['yext.name']).map(fr => {
                return (
                  <MetroName key={fr.yext.name}>
                    <Link to={`${fr.permalink}`} title={fr.yext.name}>
                      {fr.yext.name}
                    </Link>
                  </MetroName>
                )
              })}
            </MetroList>
          </ContentWrap>
        </Container>
      </Background>
    </Layout>
  )
}

const ContentWrap = styled.div``
const Background = styled.div(({ isHideBackground, isDarkMode }) => [
  isHideBackground ? tw`bg-white` : tw`bg-gray-100`,
  isDarkMode && tw`bg-primary-black text-white`
])

const Divider = tw.hr`my-6`

const ListHeading = tw.h3`
  text-xl
  text-gray-800 leading-none
  w-full pb-4`

const MetroList = tw.ul`ml-4`
const MetroName = tw.li`list-disc`

export const query = graphql`
  query MetroStateSectionsQuery {
    cmsMetroStateSections {
      headline
      subheadline
      copy
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
      seo {
        meta_title
        meta_description
      }
    }
  }
`

export default MetroStatePage
