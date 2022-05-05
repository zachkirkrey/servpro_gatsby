import React, { useContext } from 'react'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'

import { BREAKPOINT_MD, BREAKPOINT_SM } from '../../constants/constants'

export const ResponsiveContext = React.createContext({ isMobile: false })

function Responsive({ children }) {
  return (
    <ResponsiveContext.Consumer>
      {context => children(context)}
    </ResponsiveContext.Consumer>
  )
}

export function withResponsiveContext(WrappedComponent) {
  return function WithResponsiveContext(props) {
    return (
      <Responsive>
        {context => <WrappedComponent {...props} {...context} />}
      </Responsive>
    )
  }
}

export class ResponsiveProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    if (typeof window === 'undefined') {
      this.state = {
        ...this.state,
        context: {
          isMobile: false,
          isTablet: false,
          isDesktop: true
        }
      }
    } else {
      this.state = {
        ...this.state,
        context: this.getContext()
      }
    }
  }

  handleWindowResize = throttle(() => {
    this.update()
  }, 200)

  componentDidMount() {
    this.update()
    window.addEventListener('resize', this.handleWindowResize)
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (
      prevState.context !== this.state.context &&
      isEqual(prevState.context, this.state.context)
    ) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  getContext() {
    const windowWidth = window.innerWidth

    let newContext = {
      isDesktop: false,
      isTablet: false,
      isMobile: false
    }

    if (windowWidth < BREAKPOINT_SM) {
      newContext = {
        ...newContext,
        isMobile: true
      }
    } else if (windowWidth < BREAKPOINT_MD) {
      newContext = {
        ...newContext,
        isTablet: true
      }
    } else {
      newContext = {
        ...newContext,
        isDesktop: true
      }
    }

    newContext.isMobileOrTablet = newContext.isMobile || newContext.isTablet
    newContext.isDesktopOrTablet = newContext.isDesktop || newContext.isTablet

    return newContext
  }

  update() {
    this.setState({
      context: this.getContext()
    })
  }

  render() {
    return (
      <ResponsiveContext.Provider value={this.state.context}>
        {this.props.children}
      </ResponsiveContext.Provider>
    )
  }
}

function Mobile({ children }) {
  return (
    <ResponsiveContext.Consumer>
      {({ isMobile }) => isMobile && children}
    </ResponsiveContext.Consumer>
  )
}

function NotMobile({ children }) {
  return (
    <ResponsiveContext.Consumer>
      {({ isMobile }) => !isMobile && children}
    </ResponsiveContext.Consumer>
  )
}

function MobileOrTablet({ children }) {
  return (
    <ResponsiveContext.Consumer>
      {({ isMobile, isTablet }) => (isMobile || isTablet) && children}
    </ResponsiveContext.Consumer>
  )
}

function Tablet({ children }) {
  return (
    <ResponsiveContext.Consumer>
      {({ isTablet, isMobile }) => (isTablet || isMobile) && children}
    </ResponsiveContext.Consumer>
  )
}

function Desktop({ children }) {
  return (
    <ResponsiveContext.Consumer>
      {({ isDesktop }) => isDesktop && children}
    </ResponsiveContext.Consumer>
  )
}

function DesktopOrTablet({ children }) {
  return (
    <ResponsiveContext.Consumer>
      {({ isDesktop, isTablet }) => (isDesktop || isTablet) && children}
    </ResponsiveContext.Consumer>
  )
}

Responsive.Mobile = Mobile
Responsive.NotMobile = NotMobile
Responsive.MobileOrTablet = MobileOrTablet
Responsive.Tablet = Tablet
Responsive.Desktop = Desktop
Responsive.DesktopOrTablet = DesktopOrTablet

export function useResponsive() {
  return useContext(ResponsiveContext)
}

export default Responsive
