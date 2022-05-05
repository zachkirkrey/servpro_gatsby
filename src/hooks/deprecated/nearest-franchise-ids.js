import { useQuery } from 'react-query'
import { useLocationEstimate } from '@hooks/locator/location-estimate'
import { TEN_MINUTES_IN_MS, THREE_DAYS_IN_MS } from '@constants/constants'

const fetchFranchiseIds = async ({ queryKey }) => {
  const { [1]: coords } = queryKey
  if (!(!!coords?.latitude && !!coords?.longitude)) {
    return []
  }
  const res = await fetch(
    `/api/franchiseByLoc?latitude=${coords.latitude}&longitude=${coords.longitude}`
  )
  const data = await res.json()
  return !!data && !!data?.length
    ? // eslint-disable-next-line no-confusing-arrow
      data.map(item =>
        item.ParentNumber !== 0 ? item.ParentNumber : item.FranchiseNumber
      )
    : []
}

const useNearestFranchiseIDs = () => {
  return false
  // TODO: turn off later
  // eslint-disable-next-line no-unreachable
  const {
    data: coords,
    status: locationStatus,
    getLocationByPermission,
    getLocationByZip
  } = useLocationEstimate()
  const { data: localFranchiseIds, status } = useQuery(
    ['local-franchise-ids', coords],
    fetchFranchiseIds,
    { cacheTime: THREE_DAYS_IN_MS, staleTime: TEN_MINUTES_IN_MS }
  )

  return {
    data: localFranchiseIds,
    status,
    position: coords,
    locationStatus,
    getLocationByPermission,
    getLocationByZip
  }
}

export { useNearestFranchiseIDs }
