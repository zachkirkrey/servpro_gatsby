import React from 'react'
import tw, { styled } from 'twin.macro'
import AccessibleLink from '../AccessibleLink'
import { useSiteSearch } from '../../../contexts/search/SiteSearchContext'
import { Snippet } from 'react-instantsearch-dom'

function SearchResultsItem({ hit }) {
  const { url, description, copy } = hit
  const { setVisible } = useSiteSearch()

  function handleClick() {
    setVisible(false)
  }

  if (!url) {
    return null
  }

  const attribute = description ? 'description' : 'copy'
  const shouldShowExcerpt = Boolean(description || copy)

  return (
    <StyledSearchResultsItem tw="relative" to={url} onClick={handleClick}>
      <Linktitle>
        <Snippet attribute="title" hit={hit} />
      </Linktitle>
      {shouldShowExcerpt && <Snippet attribute={attribute} hit={hit} />}
    </StyledSearchResultsItem>
  )
}

const StyledSearchResultsItem = styled(AccessibleLink)`
  .ais-Snippet-highlighted {
    ${tw`text-primary not-italic`}
  }
`

const Linktitle = tw.h3`font-medium mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-left`

export default SearchResultsItem
