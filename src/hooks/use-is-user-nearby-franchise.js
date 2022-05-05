import { useLocator } from './use-locator'
import haversine from 'haversine-distance'

export function useIsUserNearbyFranchise(coordsMetro) {
  const { geo } = useLocator()

  if (!!geo?.longitude && !!geo?.latitude) {
    // api call -- distance between two coords.
    const coordsUser = { longitude: geo.longitude, latitude: geo.latitude }
    const distance = haversine(coordsUser, coordsMetro)

    console.info(`user is ${distance * 0.000621371} miles from metro`)

    if (distance < 80467) {
      return true
    }
  }

  return false
}
