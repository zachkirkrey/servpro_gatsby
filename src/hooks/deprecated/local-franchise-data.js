import { useQuery } from 'react-query'
import { useAlgoliaClient } from '@hooks/use-algolia-client'
import { TEN_MINUTES_IN_MS, THREE_DAYS_IN_MS } from '@constants/constants'

const fetchFranchisesData = async ({ queryKey }) => {
  const { [1]: localFranchises, [2]: locationsIndex } = queryKey

  // Budget error handling:
  if (!(!!localFranchises?.length && !!locationsIndex.search)) {
    return []
  }

  // Search each ID in Algolia, grab first match, return as an array.
  return Array.from(
    await Promise.all(
      localFranchises.map(async frId => {
        // Search for the FranchiseId
        const res = await locationsIndex.search(frId, {
          hitsPerPage: 1
        })

        // Step-by-step destructure of the matchLevel to algolia field
        const { hits } = res ?? []
        const { [0]: match } = hits ?? {}
        const { _highlightResult: highlight } = match ?? {}
        const { FranchiseNumber: frNum } = highlight ?? -1
        const { fullyHighlighted } = frNum ?? false

        // Will return true if franchise has yext data loaded (a requirement here)
        const hasYextData = !!highlight && !!highlight?.yext
        // Will return true if the franchise id is an exact match
        const isFranchiseIdMatch = !!fullyHighlighted

        return isFranchiseIdMatch && hasYextData ? match : null
      })
    )
  ).filter(fr => fr !== null)
}

const useLocalFranchisesData = localFranchiseIds => {
  return false
  // TODO: turn off later
  // eslint-disable-next-line no-unreachable
  const { locationsIndex } = useAlgoliaClient()
  const { data: franchisesData, status: franchisesStatus } = useQuery(
    ['local-franchises-data', localFranchiseIds, locationsIndex],
    fetchFranchisesData,
    { cacheTime: THREE_DAYS_IN_MS, staleTime: TEN_MINUTES_IN_MS }
  )

  return { data: franchisesData, status: franchisesStatus }
}

export { useLocalFranchisesData }
