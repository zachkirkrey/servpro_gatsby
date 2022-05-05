import { useEffect, useRef, useState } from 'react'
import { useLocator } from '@hooks/use-locator'

export function useChangeLocationLogic() {
  const [changingLocation, setChangingLocation] = useState(false)
  const changeLocationInputRef = useRef(null)
  const { status: geoStatus } = useLocator()

  useEffect(() => {
    if (changingLocation) {
      changeLocationInputRef.current?.focus()
    }
  }, [changingLocation])

  useEffect(() => {
    if (geoStatus === 'loading_changelocation') {
      setChangingLocation(false)
    }
    if (geoStatus === 'success_changelocation') {
      setChangingLocation(false)
    }
  }, [geoStatus])

  return {
    changingLocation,
    changeLocationInputRef,
    onChangeLocation: () => setChangingLocation(true),
    onHideChangeLocationInput: () => setChangingLocation(false)
  }
}
