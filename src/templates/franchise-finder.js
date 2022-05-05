import React from 'react'
import tw from 'twin.macro'
import { Hero } from '@blocks'
import Layout from '@components/Layout'

const FranchiseFinder = ({ data }) => {
  const { hero, searchResult } = data.cmsMetroPage
  return (
    <Layout>
      <Hero data={hero} />
      <SearchResult>
        {searchResult.map(result => {
          return result
        })}
      </SearchResult>
    </Layout>
  )
}

const SearchResult = tw.div``

export default FranchiseFinder
