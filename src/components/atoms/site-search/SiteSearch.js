import React from 'react'
import tw, { css, styled } from 'twin.macro'
import queryString from 'query-string'
import algoliasearch from 'algoliasearch'
import { Configure, Index, InstantSearch } from 'react-instantsearch-dom'

import Container from '../Container'
import { useIsElementOutsideClick } from '../../../hooks/is-element-outside-click'
import { useSiteSearch } from '../../../contexts/search/SiteSearchContext'
import AccessibleLink from '../AccessibleLink'
import CloseButton from '../CloseButton'
import CustomAlgoliaSearchInput from '../CustomAlgoliaSearchInput'
import CustomAlgoliaHits from './CustomAlgoliaHits'
import { ReactComponent as ArrowDownIcon } from '@images/svg/arrow-down.svg'

const algoliaClient = algoliasearch(
  'SXQTSMSLU9',
  'ee5fa3035d420655ffa33ec9bd348ac1'
)

const FILTERS = [
  { id: 'all', name: 'All', indexName: null },
  { id: 'services', name: 'Services', indexName: 'search_services' },
  { id: 'articles', name: 'Articles', indexName: 'search_articles' },
  { id: 'press_releases', name: 'Press Releases', indexName: 'search_press' },
  // { id: 'locations', name: 'Locations', indexName:  },
  { id: 'faqs', name: 'FAQs', indexName: 'search_faqs' },
  {
    id: 'glossary_terms',
    name: 'Glossary Terms',
    indexName: 'search_glossaries'
  }
]

function SiteSearch() {
  const { visible, setVisible } = useSiteSearch()
  const [visibleCSS, setVisibleCSS] = React.useState(false)
  const containerRef = React.useRef(null)
  const inputRef = React.useRef(null)
  useIsElementOutsideClick({
    element: containerRef.current,
    enabled: visible,
    actionCallback: () => {
      setVisible(false)
    }
  })
  const [currentFilterId, setCurrentFilterId] = React.useState('all')
  const initialRender = React.useRef(true)
  const [indicesInfo, setIndicesInfo] = React.useState(() => {
    return FILTERS.slice(1).reduce((acc, curr) => {
      return {
        ...acc,
        [curr.indexName]: {
          isEmpty: false
        }
      }
    }, {})
  })
  const [filterDropdownOpened, setFilterDropdownOpened] = React.useState(false)

  const searchQueryKey = 'siteSearch'

  const handleDocumentKeyDown = React.useCallback(event => {
    if (event.key === 'Escape') {
      setVisible(false)
    }
  }, [])

  React.useEffect(() => {
    if (visible) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        containerRef.current?.querySelector('input[type="search"]')?.focus()
      }, 0)
    }
  }, [visible])

  React.useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleDocumentKeyDown)
    } else {
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }

    return () => document.removeEventListener('keydown', handleDocumentKeyDown)
  }, [visible])

  React.useEffect(() => {
    if (visible) {
      setVisibleCSS(true)
    } else {
      if (initialRender.current) {
        return
      }
      setTimeout(() => {
        setVisibleCSS(false)
      }, 300)
    }
  }, [visible])

  React.useEffect(() => {
    const parsedQueryString = queryString.parse(window.location.search)
    if (parsedQueryString[searchQueryKey]) {
      setVisible(true)
    }
  }, [])

  React.useEffect(() => {
    const parsedQueryString = queryString.parse(window.location.search)
    if (visible) {
      const searchPart = queryString.stringify({
        ...parsedQueryString,
        [searchQueryKey]: true
      })
      if (!parsedQueryString[searchQueryKey]) {
        window.history.pushState(
          '',
          'Site Search',
          `${window.location.pathname}?${searchPart}`
        )
      }
    } else if (parsedQueryString[searchQueryKey]) {
      const querySearchPart = queryString.stringify(
        Object.keys(parsedQueryString).reduce((acc, key) => {
          if (key === searchQueryKey) {
            return acc
          }
          return {
            ...acc,
            [key]: parsedQueryString[key]
          }
        }, {})
      )
      window.history.pushState(
        '',
        '',
        `${window.location.pathname}${
          querySearchPart ? `?${querySearchPart}` : ''
        }`
      )
    }
  }, [visible])

  React.useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [visible])

  React.useEffect(() => {
    initialRender.current = false
  }, [])

  const activeFilter = React.useMemo(() => {
    return FILTERS.find(item => item.id === currentFilterId)
  }, [FILTERS, currentFilterId])

  function isEmpty() {
    return Object.keys(indicesInfo).every(key => indicesInfo[key]?.isEmpty)
  }

  return (
    <StyledSiteSearch
      css={[
        tw`fixed top-0 w-full py-12 lg:py-20 bg-white shadow-md h-screen`,
        visibleCSS ? tw`visible` : tw`invisible pointer-events-none`
      ]}
      ref={containerRef}
      visible={visible}
      onMouseDown={event => event.stopPropagation()}>
      <CloseButton
        tw="top-12 right-3 lg:(top-10 right-16)"
        onClick={() => setVisible(false)}
      />
      <Container>
        <h2 tw="font-medium mb-12 text-xl lg:text-3xl">How can we help you?</h2>
        <div tw="relative z-30">
          <div
            tw="lg:hidden bg-white h-10 mb-2 rounded px-4 flex items-center border text-sm justify-between"
            onClick={() => setFilterDropdownOpened(state => !state)}>
            {activeFilter ? activeFilter.name : 'All'}
            <StyledDropdownArrow tw="text-primary" />
          </div>
          <div
            tw="absolute top-full mt-2 left-0 w-full lg:static"
            css={[
              filterDropdownOpened ? tw`visible` : tw`invisible lg:visible`
            ]}>
            <div tw="lg:grid lg:grid-cols-2 gap-2 lg:(flex space-x-5) border-b lg:border-b-0 lg:pl-2 mb-2">
              {FILTERS.map(item => {
                return (
                  <div
                    key={item.id}
                    tw="bg-white lg:bg-none border-l border-r border-t lg:border-l-0 lg:border-r-0 lg:border-t-0"
                    css={[
                      item.id === currentFilterId &&
                        tw`text-primary pointer-events-none `
                    ]}>
                    <AccessibleLink
                      tw="w-full focus:ring-2 ring-blue-400 rounded focus:outline-none text-sm lg:text-base lg:font-medium px-4 lg:px-3 py-2 lg:py-0 text-left"
                      onClick={() => {
                        setCurrentFilterId(item.id)
                        setFilterDropdownOpened(false)
                      }}>
                      {item.name}
                    </AccessibleLink>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {visible && (
          <InstantSearch
            indexName="search_services"
            searchClient={algoliaClient}>
            <CustomAlgoliaSearchInput tw="h-10 lg:h-16" />
            <div tw="mt-10 lg:mt-16 space-y-16">
              {isEmpty() && <div tw="text-lg font-medium">No results</div>}
              {FILTERS.filter(filter => {
                if (filter.id === 'all') {
                  return false
                }
                if (currentFilterId === 'all') {
                  return true
                }
                return filter.id === currentFilterId
              }).map(filter => {
                return (
                  <div key={filter.id}>
                    <Index indexName={filter.indexName}>
                      <CustomAlgoliaHits
                        title={filter.name}
                        indexName={filter.indexName}
                        setIndicesInfo={setIndicesInfo}
                      />
                      <Configure
                        hitsPerPage={6}
                        attributesToSnippet={['title', 'description', 'copy']}
                        distinct
                      />
                    </Index>
                  </div>
                )
              })}
            </div>
          </InstantSearch>
        )}
      </Container>
    </StyledSiteSearch>
  )
}

const StyledSiteSearch = styled.div`
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-out;
  will-change: opacity;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;

  ${props =>
    props.visible &&
    css`
      z-index: 300;
      opacity: 1;
    `};
`

const StyledDropdownArrow = styled(ArrowDownIcon)`
  path {
    fill: currentColor;
  }
`

export default SiteSearch
