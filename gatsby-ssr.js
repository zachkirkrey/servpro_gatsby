import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LocatorProvider } from '@contexts/franchise/LocatorContext'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocatorProvider {...props}>{element}</LocatorProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
