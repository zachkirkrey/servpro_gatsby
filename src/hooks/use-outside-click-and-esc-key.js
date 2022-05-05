import React from 'react'

export function useOutsideClickAndEscKey(
  handler,
  { node = null, enabled = true } = {}
) {
  const clickEventIsAdded = React.useRef(false)

  const handleDocumentClick = React.useCallback(
    event => {
      event.stopPropagation()
      const isClickInside = node?.contains?.(event.target)

      if (!isClickInside && enabled) {
        handler()
      }
    },
    [enabled, handler, node]
  )

  const handleDocumentKeyDown = React.useCallback(
    event => {
      event.stopPropagation()
      if (enabled && event.key === 'Escape') {
        handler()
      }
    },
    [enabled, handler]
  )

  const addKeyEvent = React.useCallback(() => {
    document.addEventListener('keydown', handleDocumentKeyDown)
  }, [handleDocumentKeyDown])

  const removeKeyEvent = React.useCallback(() => {
    document.removeEventListener('keydown', handleDocumentKeyDown)
  }, [handleDocumentKeyDown])

  const addClickEvent = React.useCallback(() => {
    if (clickEventIsAdded.current) {
      return
    }
    clickEventIsAdded.current = true
    window.addEventListener('click', handleDocumentClick)
  }, [handleDocumentClick])

  const removeClickEvent = React.useCallback(() => {
    if (!clickEventIsAdded.current) {
      return
    }
    clickEventIsAdded.current = false
    window.removeEventListener('click', handleDocumentClick)
  }, [handleDocumentClick])

  const cleanup = React.useCallback(() => {
    removeClickEvent()
    removeKeyEvent()
  }, [removeKeyEvent, removeClickEvent])

  React.useEffect(() => {
    if (!node) {
      cleanup()
      return
    }

    if (enabled) {
      addClickEvent()
      addKeyEvent()
    } else {
      cleanup()
    }

    // eslint-disable-next-line
    return cleanup
  }, [cleanup, addClickEvent, addKeyEvent, enabled, node])
}
