import React from 'react'

export function useSetInViewRefs(containerRef, inViewRef) {
  return React.useCallback(
    node => {
      containerRef.current = node
      inViewRef(node)
    },
    [inViewRef]
  )
}
