import { useMemo } from 'react'
import algoliasearch from 'algoliasearch/lite'

export const useAlgoliaClient = () => {
  const client = useMemo(
    () => algoliasearch('SXQTSMSLU9', 'ee5fa3035d420655ffa33ec9bd348ac1'),
    []
  )
  const locationsIndex = client.initIndex('franchise_location_prod')

  return { client, locationsIndex }
}
