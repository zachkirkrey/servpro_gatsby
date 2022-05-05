import React from 'react'
import { Location } from '@reach/router'

function withLocation(WrappedComponent) {
  return function WithLocation(props) {
    return (
      <Location>
        {({ location }) => {
          return <WrappedComponent {...props} location={location} />
        }}
      </Location>
    )
  }
}

export default withLocation
