import React from 'react'
import { DEFAULT_ANIMATIONS_SELECTOR } from '../components/utils/defaultAnimations'

export function useAnimatedElementsRefs(containerRef) {
  const animatedElements = React.useRef(null)

  React.useEffect(() => {
    animatedElements.current = containerRef.current.querySelectorAll(
      DEFAULT_ANIMATIONS_SELECTOR
    )
  }, [])

  return animatedElements
}
