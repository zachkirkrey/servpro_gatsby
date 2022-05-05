import { useContext } from 'react'
import { LocatorContext } from '@contexts/franchise/LocatorContext'

// This hook is a helper for accessing LocatorContext fields.
const useLocator = () => {
  const context = useContext(LocatorContext)
  if (context === undefined) {
    throw new Error('useLocator must be used within a LocatorProvider')
  }
  return context
}

export { useLocator }
