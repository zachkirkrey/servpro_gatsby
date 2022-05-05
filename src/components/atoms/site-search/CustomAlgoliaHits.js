import React from 'react'
import tw from 'twin.macro'
import { connectHits } from 'react-instantsearch-dom'
import SearchResultsItem from './SearchResultsItem'

function CustomAlgoliaHits({ title, hits, indexName, setIndicesInfo }) {
  const filteredHits = React.useMemo(() => {
    return hits.filter(hit => hit.url)
  }, [hits])

  React.useEffect(() => {
    setIndicesInfo(state => {
      return {
        ...state,
        [indexName]: {
          isEmpty: filteredHits.length === 0
        }
      }
    })
  }, [filteredHits])

  if (!filteredHits.length) {
    return null
  }

  return (
    <div>
      <Title>{title}</Title>
      <GridHints>
        {filteredHits.map(hit => {
          return <SearchResultsItem key={hit.uid} hit={hit} />
        })}
      </GridHints>
    </div>
  )
}

const Title = tw.h2`text-xl font-medium mb-7`
const GridHints = tw.div`grid gap-y-8 lg:(grid-cols-2 gap-x-14 gap-y-8)`

export default connectHits(CustomAlgoliaHits)
