import React from 'react'
import tw from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'
import Container from '@atoms/Container'
import PageTitle from '@atoms/PageTitle'
import Subnav from '@blocks/Subnav'
import Breadcrumbs from '@sections/Breadcrumbs'
import Section from '@atoms/Section'
import { useGlossaryTermLinks } from '@hooks/use-glossary-term-links'
import { useResourcesSubnav } from '@hooks/use-resources-subnav'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import paddingDefault from '../../components/utils/paddingDefault'
import { customScrollTo } from '../../components/utils/scroll-to'
import Seo from '../../components/utils/Seo'

const GlossaryPage = ({ data }) => {
  const { edges: termLinks } = useGlossaryTermLinks()
  const { page_headline, page_byline, seo } = data?.cmsGlossary
  const resourcesSubnav = useResourcesSubnav()
  // Transform the hook data to match the modular block format:
  const subnavData = { subnav: [resourcesSubnav] }

  // TODO: Better comment here; takes first char in titles, returns alphabetized set
  const lettersWithEntries = React.useMemo(() => {
    return [
      ...new Set(
        termLinks.map(({ node: link }) =>
          link.title.charAt(0).toLocaleLowerCase()
        )
      )
    ].sort()
  }, [termLinks])

  // Gets all terms that begin with a letter; 'T' or 't' => ['Term 1', 'Test Page']
  const getEntriesByLetter = firstLetter =>
    termLinks
      .filter(
        ({ node: link }) =>
          link.title.charAt(0).toLocaleLowerCase() ===
          firstLetter.toLocaleLowerCase()
      )
      .map(({ node: link }) => link)

  function handleLetterClick(event) {
    event.preventDefault()
    const id = event.currentTarget.getAttribute('href')?.slice(1)
    const section = document.getElementById(id)
    if (section) {
      customScrollTo(section.offsetTop - 100)
    }
  }

  return (
    <Layout>
      <Seo
        title={seo?.meta_title}
        description={seo?.meta_description}
        imageUrl={seo?.meta_image?.url}
      />
      <Subnav data={subnavData} />
      <div css={paddingDefault()}>
        <Container>
          <Breadcrumbs />
          <Section id="glossary-hero" tw="lg:text-center">
            <PageTitle tw="mb-2">
              {apCaseOnlyTitleTags(page_headline)}
            </PageTitle>
            <Byline>{page_byline}</Byline>
          </Section>
          <GlossaryWrap>
            <aside tw="ml-4 lg:ml-0" id="glossary-nav">
              <AlphaNav aria-labelledby="glossary-nav-label">
                <AlphaNavLabel id="glossary-nav-label">Main Menu</AlphaNavLabel>
                <AlphaNavLinks>
                  {lettersWithEntries.map((letter, idx) => (
                    <React.Fragment key={letter}>
                      {idx !== 0 && <AlphaNavBullet>&#8226;</AlphaNavBullet>}
                      <a
                        className="hover-default"
                        tw="relative text-primary font-bold"
                        href={`#glossary-${letter}`}
                        onClick={handleLetterClick}>
                        <div tw="absolute -left-2 -right-2 -top-1 -bottom-1" />
                        {letter}
                      </a>
                    </React.Fragment>
                  ))}
                </AlphaNavLinks>
              </AlphaNav>
            </aside>
            <Content id="glossary-content">
              {lettersWithEntries.map(letter => (
                <div id={`glossary-${letter}`} key={letter}>
                  <GlossaryAnchor key={letter} href={`#glossary-${letter}`}>
                    {letter}
                  </GlossaryAnchor>
                  <GlossaryTermList>
                    {getEntriesByLetter(letter).map(term => (
                      <GlossaryTerm key={term.title}>
                        <GlossaryTermLink to={term.url}>
                          {term.title}
                        </GlossaryTermLink>
                      </GlossaryTerm>
                    ))}
                  </GlossaryTermList>
                </div>
              ))}
            </Content>
          </GlossaryWrap>
        </Container>
      </div>
    </Layout>
  )
}

const Byline = tw.p`text-xl mb-8 lg:mb-14`

const GlossaryWrap = tw(Section)`
  flex flex-row-reverse flex-nowrap
  lg:flex-col`
const Content = tw.div`flex-1 pt-4 lg:pt-0`

const AlphaNav = tw.nav``
const AlphaNavLabel = tw.h2`sr-only`
const AlphaNavLinks = tw.ol`
  flex flex-col items-center justify-center
  lg:flex-row
  pb-2 mb-16`
const AlphaNavBullet = tw.span`text-primary mx-2`

const GlossaryAnchor = tw.h2`
  text-xl text-primary font-medium
  border-primary border-t pt-2 mb-6`

const GlossaryTermList = tw.ul`lg:(grid grid-cols-3 gap-x-44) pb-12`
const GlossaryTerm = tw.li`py-3`
const GlossaryTermLink = tw(AccessibleLink)`font-semibold`

export const query = graphql`
  query GlossaryIndexQuery {
    cmsGlossary {
      page_headline
      page_byline
      seo {
        meta_title
        meta_description
      }
    }
  }
`

export default GlossaryPage
