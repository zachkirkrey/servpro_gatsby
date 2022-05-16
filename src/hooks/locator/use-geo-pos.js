import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { TEN_MINUTES_IN_MS, THREE_DAYS_IN_MS } from '@constants/constants'
import triggerInvoca from '@utils/trigger-invoca'

const rqOptions = {
  cacheTime: THREE_DAYS_IN_MS,
  staleTime: TEN_MINUTES_IN_MS,
  fetchOnMount: false
}

// Fetchables; geo by IP as a fallback and our coords-to-franchise
const fetchNearestByCoords = async ({ queryKey }) => {
  const { 1: coords } = queryKey
  if (!coords || !coords?.latitude || !coords?.longitude) {
    return {}
  }
  const api_url = `/api/localFranchise?latitude=${coords.latitude}&longitude=${coords.longitude}`
  return await (await fetch(api_url)).json()
}

// This hook mocks the { data, status } pattern from `react-query`
//   but returns a flatter version: { geo, franchise, status }
const useGeoPos = () => {
  // These represent the "state" of the hook.
  const [geo, setGeo] = useState()
  const [franchise, setFranchise] = useState()
  const [nearby, setNearby] = useState()
  const [status, setStatus] = useState('initial')

  // `react-query` query representing fetchable data:
  const { data: coordsData, status: coordsStatus } = useQuery(
    [
      'nearest-by-coords',
      { latitude: geo?.latitude, longitude: geo?.longitude }
    ],
    fetchNearestByCoords,
    rqOptions
  )

  // On load:
  useEffect(() => initializeLocator(), [])

  // DEBUG: Some info()s to show to flow of each status/action.
  useEffect(() => console.info(`GeoPos Status: ${status}`), [status])
  useEffect(
    () => console.info(`coords Status: ${coordsStatus}`),
    [coordsStatus]
  )

  // When `franchise` is updated, let Invoca know we're adding #s to the DOM:
  useEffect(() => triggerInvoca(), [franchise])

  // When `nearby` is updated, set the preferred franchise location
  useEffect(() => {
    console.info('franchise locations updated')
    setFranchise((!!nearby && !!nearby.length > 0 && nearby[0]) || {})
  }, [nearby])

  const fetchGeoByIp = async () => await (await fetch(`/api/locByIp`)).json()

  // "Change Location"
  const changeLocation = async loc => {
    if (!loc) {
      return
    }

    function getSearchQuery() {
      if (typeof loc == 'string') {
        return `?address=${loc}`
      }
      const { latitude, longitude, address } = loc
      if (!latitude || !longitude) {
        return `?address=${address}`
      }
      return `?longitude=${longitude}&latitude=${latitude}`
    }

    setStatus(`loading_changelocation`)
    const api_url = `/api/localFranchise${getSearchQuery()}`
    const { franchise: franchiseResponse, geo: geoResponse } = await (
      await fetch(api_url)
    ).json()
    if (!franchiseResponse || !franchiseResponse?.length) {
      console.error('error changing franchise location')
      return
    }
    setGeo(geoResponse)
    setNearby(franchiseResponse)
    setStatus(`success_changelocation`)
  }

  // Attempt to populate {geo, franchise}
  const initializeLocator = async () => {
    if (!!coordsData?.length && coordsStatus === 'success') {
      // 1.1 Cached franchise data:
      setStatus('loading_geocache')
    } else {
      // No prefetch: get background IP estimate, then ask browser permission:
      setGeo(await fetchGeoByIp())
      setStatus('request_permission')
    }
  }

  // HELPER: When the IP data is present, but the franchise data needs refreshed:
  const refetchFranchiseFromGeo = async passedGeo => {
    const { latitude, longitude } = passedGeo || geo || null
    if (!latitude || !longitude) {
      return
    }
    const fromCoords = await fetchNearestByCoords({
      queryKey: [null, { latitude, longitude }]
    })
    setGeo(fromCoords.geo)
    setNearby(fromCoords.franchise)
  }

  // HELPER:
  const refetchIpThenFranchise = async () => {
    // Manually do and log steps:
    const ip_geo = await fetchGeoByIp()
    console.info(`fresh ip geo: ${JSON.stringify(ip_geo, null, 2)}`)
    const { latitude, longitude } = ip_geo || null
    if (!latitude || !longitude) {
      return
    }
    const fromAPI = await fetchNearestByCoords({
      queryKey: [null, { latitude, longitude }]
    })
    console.info(`fresh api geo: ${JSON.stringify(fromAPI.geo, null, 2)}`)
    console.info(
      `fresh api franchise: ${JSON.stringify(fromAPI.franchise, null, 2)}`
    )
    if (
      !!fromAPI.geo &&
      !!fromAPI.franchise &&
      fromAPI.franchise !== franchise
    ) {
      setGeo(fromAPI.geo)
      setNearby(fromAPI.franchise)
    }
  }

  // 2. Browser API
  // 2.1 Browser Permission Success: Set `geo` and query `franchise`
  const browserSuccess = async position => {
    const { coords } = position
    // If we get permission, but the browser api itself fails:
    if (!coords || !coords?.latitude || !coords?.longitude) {
      browserFail()
    }
    const browserGeo = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      location_type: 'browser-api'
    }
    setStatus(`loading_permission`)
    refetchFranchiseFromGeo(browserGeo)
    setStatus(`success_permission`)
  }
  // 2.2 Browser Permission Failed: Use `geo` from IP and query `franchise`
  const browserFail = async () => {
    setStatus(`failed_permission`)

    // Check if we have a geo to fall back on:
    if (!!geo?.latitude && !!geo?.longitude) {
      // Load the fallback
      setStatus(`loading_ipfallback`)
    } else {
      // Fetch from nothing
      setStatus(`loading_fromnull`)
    }
  }

  // Loose FSM Pattern, emitting to `status`
  useEffect(() => {
    // --------------------------------
    // Load the cached results from r-q
    if (status === `loading_geocache`) {
      setGeo(coordsData.geo)
      setNearby(coordsData.franchise)
      setStatus(`success_geocache`)
    }
    // --------------------------------
    // IP-based fallback already in `geo`, just need fresh `franchise`
    if (status === `loading_ipfallback`) {
      refetchFranchiseFromGeo()
      setStatus(`success_ipfallback`)
    }
    // --------------------------------
    // Fresh version `ipData` ready, but not loaded
    if (status === `loading_ip`) {
      refetchIpThenFranchise()
      setStatus(`success_ip`)
    }
    // --------------------------------
    // Everything is null, start fresh:
    if (status === `loading_fromnull`) {
      refetchIpThenFranchise()
      setStatus(`success_fromnull`)
    }
    // --------------------------------
    // Try to get data from browser api
    if (status === `request_permission`) {
      navigator.geolocation.getCurrentPosition(browserSuccess, browserFail, {
        enableHighAccuracy: false
      })
    }

    if (status === `loading_changelocation`) {
      setGeo({})
      setNearby({})
    }

    // Other available actions include:
    // if (status === `loading_permission`) {}
    // if (status === `failed_permission`) console.error(`Failed permission`)
    // --------------------------------
  }, [status])

  return {
    geo,
    nearby,
    franchise,
    status,
    changeLocation,
    setFranchise,
    setGeo
  }
}

export { useGeoPos }
