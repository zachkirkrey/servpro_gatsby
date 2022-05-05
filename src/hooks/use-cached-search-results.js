import React from 'react'

export function useCachedSearchResults({
  data,
  query,
  localStorageKey,
  enabled
}) {
  const [resultData, setResultData] = React.useState({
    query: '',
    data: null
  })

  React.useEffect(() => {
    if (!enabled) {
      return
    }
    const jsonValue = window.localStorage.getItem(localStorageKey)
    if (!jsonValue) {
      return
    }
    const parsedData = JSON.parse(jsonValue)
    if (parsedData && parsedData.query && parsedData.data) {
      setResultData(parsedData)
    }
  }, [localStorageKey, enabled])

  React.useEffect(() => {
    if (!query) {
      return
    }
    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({ data, query })
    )
    setResultData({ data, query })
  }, [data, query])

  return resultData
}
