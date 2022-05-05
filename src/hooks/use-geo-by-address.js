import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { TEN_MINUTES_IN_MS, THREE_DAYS_IN_MS } from '@constants/constants'
import triggerInvoca from '@utils/trigger-invoca'

const rqOptions = {
  cacheTime: THREE_DAYS_IN_MS,
  staleTime: TEN_MINUTES_IN_MS
}

const fetchGeoByAddress = async ({ queryKey }) => {
  const { 1: address } = queryKey
  if (!address) {
    return {}
  }
  const api_url = `/api/geoByAddress?address=${address}`
  return await (await fetch(api_url)).json()
}

const useGeoByAddress = () => {
  const [address, setAddress] = useState('')
  const { data, status } = useQuery(
    ['geo-by-address', address],
    fetchGeoByAddress,
    rqOptions
  )
  const fetchGeo = useCallback(value => {
    setAddress(value)
  }, [])

  useEffect(() => triggerInvoca(), [data])

  return { data, status, fetchGeo }
}

export { useGeoByAddress }
