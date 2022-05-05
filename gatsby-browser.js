import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { LocatorProvider } from '@contexts/franchise/LocatorContext'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SiteSearchProvider } from './src/contexts/search/SiteSearchContext'
import { ResponsiveProvider } from './src/components/atoms/Responsive'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 72, // 72 hours
      refetchOnWindowFocus: false,
      refetchOnmount: true
    }
  }
})

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage
})

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor
})

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteSearchProvider>
        <ResponsiveProvider>
          <LocatorProvider {...props}>{element}</LocatorProvider>
        </ResponsiveProvider>
      </SiteSearchProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location) {
    location.prevUrl = prevLocation ? prevLocation.pathname : ''
  }
}
