import React, { createContext } from 'react'
import { useGeoPos } from '@hooks/locator/use-geo-pos'

const defaultValues = {
  geo: {},
  franchise: [],
  nearby: [],
  status: 'initial',
  // eslint-disable-next-line no-empty-function
  changeLocation: () => {},
  // eslint-disable-next-line no-empty-function
  setFranchise: () => {},
  // eslint-disable-next-line no-empty-function
  setGeo: () => {}
}

const LocatorContext = createContext(defaultValues)

const LocatorProvider = props => {
  const {
    geo,
    franchise,
    nearby,
    status: geoStatus,
    changeLocation,
    setFranchise,
    setGeo
  } = useGeoPos()

  const providerValue = {
    geo,
    franchise,
    nearby,
    status: geoStatus,
    changeLocation,
    setFranchise,
    setGeo
  }

  return (
    <LocatorContext.Provider value={providerValue}>
      {props.children}
    </LocatorContext.Provider>
  )
}

export { LocatorContext, LocatorProvider }
