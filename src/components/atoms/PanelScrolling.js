import React from 'react'
import { styled } from 'twin.macro'
// import ScrollSnap from 'scroll-snap'

import { useResponsive } from './Responsive'
import { BREAKPOINT_MD } from '../../constants/constants'

const PanelScrollingContext = React.createContext({})

export function PanelScrollingProvider({ children }) {
  const [context, setContext] = React.useState({ direction: 1 })

  const value = React.useMemo(() => {
    return {
      ...context,
      setDirection: direction => setContext(state => ({ ...state, direction }))
    }
  }, [context, setContext])

  return (
    <PanelScrollingContext.Provider value={value}>
      {children}
    </PanelScrollingContext.Provider>
  )
}

export function usePanelScrollingContext() {
  return React.useContext(PanelScrollingContext)
}

function PanelScrolling({ children }) {
  const innerRef = React.useRef(null)
  const scrollSnapRef = React.useRef(null)

  const responsiveContext = useResponsive()

  React.useEffect(() => {
    document.body.style.backgroundColor = '#000'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  React.useEffect(() => {
    // responsiveContext.isDesktop ? enableAnimation() : disableAnimation()
    disableAnimation()
    return () => disableAnimation()
  }, [responsiveContext.isDesktop])

  // function enableAnimation() {
  //   const snapConfig = {
  //     snapDestinationY: '100%',
  //     // time in ms after which scrolling is considered finished
  //     timeout: 100,
  //     // duration in ms for the smooth snap
  //     duration: 300,
  //     // threshold to reach before scrolling to next/prev element, expressed in the range [0, 1]
  //     threshold: 0.2
  //   }

  //   scrollSnapRef.current = new ScrollSnap(innerRef.current, snapConfig)
  //   scrollSnapRef.current.bind()
  // }

  function disableAnimation() {
    if (scrollSnapRef.current) {
      scrollSnapRef.current.unbind()
    }
  }

  return (
    <StyledPanelScrolling ref={innerRef} data-scroller>
      {children}
    </StyledPanelScrolling>
  )
}

const StyledPanelScrolling = styled.div`
  @media (min-width: ${BREAKPOINT_MD}px) {
    position: absolute;
    overflow-y: scroll;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //scroll-snap-type: y mandatory;
  }
`

PanelScrolling = React.memo(PanelScrolling, () => {
  return true
})

export default PanelScrolling
