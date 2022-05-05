import React from 'react'

export function useMediaModal({ paths }) {
  const [visible, setVisible] = React.useState(false)
  const [mediaPath, setMediaPath] = React.useState('')

  const currentIndex = React.useMemo(() => {
    return paths.indexOf(mediaPath)
  }, [paths, mediaPath])

  const prev = React.useCallback(() => {
    if (paths.length === 0) {
      return
    }
    if (currentIndex > 0) {
      setMediaPath(paths[currentIndex - 1])
    }
  }, [currentIndex, setMediaPath, paths])

  const next = React.useCallback(() => {
    if (paths.length === 0) {
      return
    }
    if (currentIndex < paths.length - 1) {
      setMediaPath(paths[currentIndex + 1])
    }
  }, [currentIndex, setMediaPath, paths])

  const open = React.useCallback(
    pathArg => {
      setVisible(true)
      setMediaPath(pathArg)
    },
    [setVisible, setMediaPath]
  )

  const close = React.useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setMediaPath('')
    }, 600)
  }, [setVisible, setMediaPath])

  return {
    next,
    prev,
    open,
    close,
    mediaPath,
    currentIndex,
    paths,
    visible
  }
}
