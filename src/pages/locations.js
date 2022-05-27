import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'
import NearestLocations from '@sections/NearestLocations'
import { useFranchisesFromAddress } from '@hooks/use-franchises-from-address'
import tw, { styled, css } from 'twin.macro'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import FranchiseSearchInput from '@atoms/FranchiseSearchInput'
import Container from '@atoms/Container'
import isBrowser from '@utils/is-browser'
import { customScrollTo } from '../components/utils/scroll-to'
import { useCachedSearchResults } from '../hooks/use-cached-search-results'
import paddingDefault from '@components/utils/paddingDefault'
import AccessibleLink from '@components/atoms/AccessibleLink'
import Seo from '../components/utils/Seo'

let Header = ({ data, query, handleSearch }, ref) => {
  const { headline, subheadline, copy, image } = data

  return (
    <Section
      className="js-splitHero"
      tw="relative"
      id="locations-hero"
      ref={ref}>
      <HeroWrap hasImage={!!image}>
        <Container tw="relative w-full">
          <LeftCol>
            <HeadlineWrapper>{headline}</HeadlineWrapper>
            <SubheadlineWrapper
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: subheadline }}
            />
            <HeroCopy
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: copy }}
            />
            <FranchiseSearchInput
              className="find-a-location-cta"
              hintClassName="find-a-location-dropdown-cta"
              value={query}
              isSquareOneSide={true}
              handleSearch={handleSearch}
            />
          </LeftCol>
        </Container>
        <RightCol>
          <ImageWrap>
            {image?.url && <HeroImage image={image} alt={image.description} />}
          </ImageWrap>
        </RightCol>
      </HeroWrap>
    </Section>
  )
}

Header = React.forwardRef(Header)

const FranchiseLocatorPage = ({ data, location }) => {
  const [qry, setQry] = useState()
  const { cmsFranchiseSearchSections } = data
  const { data: fr, status: frStatus } = useFranchisesFromAddress(qry)
  const heroRef = React.useRef(null)
  const [cachedSearchEnabled, setCachedSearchEnabled] = React.useState(false)
  const { seo } = cmsFranchiseSearchSections
  console.info(data)
  const handleSearch = address => {
    if (isBrowser() && !!address && qry !== address) {
      setQry(address)
      const top = heroRef.current.getBoundingClientRect().top
      const height = heroRef.current.offsetHeight
      setTimeout(() => {
        customScrollTo(top + height)
      }, 500)
    }
  }

  React.useEffect(() => {
    setCachedSearchEnabled(
      location?.prevUrl?.startsWith?.('/locations/') || false
    )
  }, [location])

  const { data: cachedData, query: cachedQuery } = useCachedSearchResults({
    data: fr,
    query: qry,
    localStorageKey: 'location_search_results',
    enabled: cachedSearchEnabled
  })

  return (
    <Layout>
      <Seo
        title={seo?.meta_title}
        description={seo?.meta_description}
        imageUrl={seo?.meta_image?.url}
      />
      <Header
        ref={heroRef}
        data={cmsFranchiseSearchSections}
        query={cachedQuery}
        handleSearch={handleSearch}
      />
      {!!cachedQuery && (
        <NearestLocations
          id="search-result"
          locations={cachedData ? cachedData : []}
          isLoading={frStatus === 'loading'}
          qry={cachedQuery}
        />
      )}

      <MetroStates data={data.allCmsMetroParents} />
    </Layout>
  )
}

const ContentWrap = styled.div(() => [])
const Background = styled.div(({ isHideBackground, isDarkMode }) => [
  isHideBackground ? tw`bg-white` : tw`bg-gray-100`,
  isDarkMode && tw`bg-primary-black text-white`
])

const Section = tw.section``
const HeroWrap = styled.div(() => [
  tw`flex justify-end mx-auto`,
  css`
    & {
      height: calc(100vh - 145px);
      @media (min-width: 1024px) {
        height: calc(100vh - 156px);
      }
    }
  `
])
const LeftCol = styled.div`
  width: calc(100% - 32px);
  max-width: 670px;

  @media (min-width: 375px) {
    width: calc(100% - 48px);
  }

  ${tw`flex flex-col bg-white bg-opacity-100 rounded-md p-5 md:p-20 absolute z-20 top-1/2 transform -translate-y-1/2 md:w-full lg:left-9`}
`
const RightCol = tw.div`absolute inset-0 w-full h-full z-10 lg:(left-auto w-1/2 flex-shrink-0)`
const HeadlineWrapper = tw.h1`text-3xl lg:text-5xl mb-1 lg:mb-4`
const SubheadlineWrapper = tw.h2`text-xl lg:text-2xl mb-1 lg:mb-4`
const ImageWrap = tw.div`h-full`
const HeroImage = tw(
  SvgSafeGatsbyImage
)`absolute w-full h-full top-0 left-0 object-cover z-10`
const HeroCopy = tw.div`mb-4`

const MetroStates = data => {
  const states = data.data.edges
  const canadian_states = states.filter(
    item => item.node.canadian_province && item
  )
  const usa_states = states.filter(
    item => item.node.canadian_province === null && item
  )
  return (
    <Background
      isDarkMode={false}
      isHideBackground={false}
      css={paddingDefault()}>
      <Container>
        <ContentWrap>
          <StateListHeading>
            Find your state below we&apos;ll direct you to the right SERVPRO for
            your commercial or residential damage cleanup, repair and
            restoration needs.
          </StateListHeading>

          <StateGrid>
            {usa_states
              // eslint-disable-next-line no-confusing-arrow
              .sort((a, b) => (a.node.title > b.node.title ? 1 : -1))
              .map(({ node: state }) => {
                return (
                  <StateGridItem key={state.title}>
                    <AccessibleLink to={`/locations${state.url}`}>
                      {state.title}
                    </AccessibleLink>
                  </StateGridItem>
                )
              })}
          </StateGrid>
          <CanadaStatesWrapper>
            <StateListHeading>Canada</StateListHeading>
            <StateGrid isLeft>
              {canadian_states
                // eslint-disable-next-line no-confusing-arrow
                .sort((a, b) => (a.node.title > b.node.title ? 1 : -1))
                .map(({ node: state }) => {
                  return (
                    <StateGridItem key={state.title}>
                      <AccessibleLink to={`/locations${state.url}`}>
                        {state.title}
                      </AccessibleLink>
                    </StateGridItem>
                  )
                })}
            </StateGrid>
          </CanadaStatesWrapper>
        </ContentWrap>
      </Container>
    </Background>
  )
}

const CanadaStatesWrapper = tw.div`
mt-8
`

const StateListHeading = tw.h3`
  text-2xl
  text-gray-800 leading-none
  w-full mb-8`

const StateGrid = styled.ul`
  ${tw`grid gap-4 grid-flow-col`};
  grid-template-rows: repeat(9, 1fr);

  @media (max-width: 1100px) {
    grid-template-rows: repeat(15, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-rows: repeat(26, 1fr);
    ${tw`gap-x-1`};
  }
  ${function (props) {
    return props.isLeft ? tw`justify-start` : ''
  }}
`
const StateGridItem = styled.li(() => [tw``])

export const query = graphql`
  query FranchiseSearchSectionsQuery {
    allCmsMetroParents {
      edges {
        node {
          title
          url
          canadian_province
        }
      }
    }
    cmsFranchiseSearchSections {
      headline
      subheadline
      copy
      image {
        filename
        title
        description
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

export default FranchiseLocatorPage
