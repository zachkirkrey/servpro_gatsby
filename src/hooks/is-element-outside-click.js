import React, { useEffect } from 'react'

export function useIsElementOutsideClick({ element, enabled, actionCallback }) {
  const handleDocumentClick = React.useCallback(event => {
    event.stopPropagation()
    const isClickInside = element?.contains?.(event.target)
    if (!isClickInside) {
      actionCallback?.()
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      document.addEventListener('mousedown', handleDocumentClick)
    } else {
      document.removeEventListener('mousedown', handleDocumentClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [enabled])
}
