import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import Searchbar from './Searchbar'
import { SITE_SEARCH_PLACEHOLDER } from '../../constants/constants'

function CustomAlgoliaSearchInput({
  placeholder = SITE_SEARCH_PLACEHOLDER,
  currentRefinement,
  refine,
  ...rest
}) {
  return (
    <Searchbar
      value={currentRefinement}
      placeholder={placeholder}
      withBorder
      noDecoration
      onChange={event => refine(event.currentTarget.value)}
      {...rest}
    />
  )
}

export default connectSearchBox(CustomAlgoliaSearchInput)
