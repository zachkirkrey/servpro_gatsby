// TODO: turn off this rule later
/* eslint-disable no-unreachable */
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { TEN_MINUTES_IN_MS, THREE_DAYS_IN_MS } from '@constants/constants'

// useQuery('location-estimate-by-ip')
const fetchLocationEstimateByIp = async () =>
  await (await fetch(`/api/locByIp`)).json()

// useQuery('location-estimate-by-ip')
const fetchLocationEstimateByZip = async ({ queryKey }) => {
  const { [1]: zip } = queryKey
  if (!zip) {
    return {}
  }
  // Build the URL to ping.
  const api_url = `/api/zipSearch?locate=${zip}&json=1`
  return await (await fetch(api_url)).json()
}

// Helper: return just the coord pair from any given set of data
const dataToCoords = data => ({
  latitude: data?.latt || data?.latitude || 0,
  longitude: data?.longt || data?.longitude || 0
})

const useLocationEstimate = () => {
  return false
  // States we'll update internally and return
  const [estimate, setEstimate] = useState()
  const [estimateStatus, setEstimateStatus] = useState('initial')

  // States we'll update with external data and use to calculate above
  const [zip, setZip] = useState()
  const [permissionEstimate, setPermissionEstimate] = useState()
  const [permissionStatus, setPermissionStatus] = useState('initial')

  // `react-query` fetchables
  const { data: estimateByIp, status: ipEstimateStatus } = useQuery(
    'location-estimate-by-ip',
    fetchLocationEstimateByIp,
    {
      cacheTime: THREE_DAYS_IN_MS,
      staleTime: TEN_MINUTES_IN_MS,
      placeholderData: { latitude: 36.743313, longitude: -119.789382 }
      // Fresno Northwest location, FranchiseNumber: 10240
    }
  )
  const { data: estimateByZip, status: zipEstimateStatus } = useQuery(
    ['location-estimate-by-zip', zip],
    fetchLocationEstimateByZip,
    {
      cacheTime: THREE_DAYS_IN_MS,
      staleTime: TEN_MINUTES_IN_MS
    }
  )

  // onLoad: make sure we have an estimate
  useEffect(() => {
    if (estimate === undefined) {
      getLocationByPermission()
    }
  }, [])

  // On Estimate Update:
  useEffect(
    () => console.info(`Using estimate: ${JSON.stringify(estimate)}`),
    [estimate]
  )

  // Handle permission estimate updates
  useEffect(() => {
    if (permissionStatus !== `success` || permissionEstimate === {}) {
      return
    }

    console.info(
      `Permission Estimate: ${JSON.stringify(dataToCoords(permissionEstimate))}`
    )
    setEstimate(dataToCoords(permissionEstimate))
  }, [permissionEstimate])

  // Handle ip estimate updates
  useEffect(() => {
    if (ipEstimateStatus !== `success`) {
      return
    }

    const { longitude, latitude } = estimateByIp
    if (!longitude || !latitude) {
      return
    }

    console.info(`IP Estimate: ${JSON.stringify(dataToCoords(estimateByIp))}`)
  }, [estimateByIp])

  // Handle zip estimate updates
  useEffect(() => {
    if (zipEstimateStatus !== `success`) {
      return
    }
    const { longitude, latitude } = estimateByZip
    if (!longitude || !latitude) {
      return
    }

    console.info(`zip: ${JSON.stringify(estimateByZip)}`)
    setEstimate(estimateByZip)
    setEstimateStatus(zipEstimateStatus)
  }, [estimateByZip])

  // Browser API
  const handlePermissionSuccess = ({ coords }) => {
    setPermissionStatus(`success`)
    setPermissionEstimate(coords)
  }
  const handlePermissionDenied = () => {
    setPermissionStatus(`denied`)
    setEstimate(dataToCoords(estimateByIp))
  }
  const getLocationByPermission = () =>
    navigator.geolocation.getCurrentPosition(
      handlePermissionSuccess,
      handlePermissionDenied,
      { enableHighAccuracy: false }
    )

  return {
    data: estimate,
    status: estimateStatus,
    getLocationByPermission,
    // eslint-disable-next-line no-shadow
    getLocationByZip: zip => !!zip && setZip(zip)
  }
}

export { useLocationEstimate }
