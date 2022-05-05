import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { TEN_MINUTES_IN_MS, THREE_DAYS_IN_MS } from '@constants/constants'
import triggerInvoca from '@utils/trigger-invoca'

const rqOptions = {
  cacheTime: THREE_DAYS_IN_MS,
  staleTime: TEN_MINUTES_IN_MS
}

const fetchLocalsByAddress = async ({ queryKey }) => {
  const { 1: address } = queryKey
  if (!address) {
    return {}
  }
  const api_url = `/api/localFranchisesByAddress?address=${address}`
  return await (await fetch(api_url)).json()
}

const useFranchisesFromAddress = address => {
  const { data, status } = useQuery(
    ['locals-by-address', address],
    fetchLocalsByAddress,
    rqOptions
  )

  useEffect(() => triggerInvoca(), [data])

  return { data, status }
}

export { useFranchisesFromAddress }
