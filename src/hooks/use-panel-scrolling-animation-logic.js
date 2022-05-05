import React from 'react'
import gsap from 'gsap'
import { usePanelScrollingContext } from '../components/atoms/PanelScrolling'
import { defaultShowAnimation } from '../components/utils/defaultAnimations'

export function usePanelScrollingAnimationLogic({
  animateIn: animateInArg,
  animateOut: animateOutArg,
  inView,
  animatedElements,
  showDefaultInAnimation = true,
  showDefaultOutAnimation = true
}) {
  const panelScrollingContext = usePanelScrollingContext()

  const animateIn = React.useCallback(() => {
    animateInArg?.(panelScrollingContext.direction)
    showDefaultInAnimation &&
      defaultShowAnimation(animatedElements.current, {
        direction: panelScrollingContext.direction
      })
  }, [animateInArg, panelScrollingContext.direction])

  const animateOut = React.useCallback(() => {
    animateOutArg?.()
    if (animatedElements?.current && showDefaultOutAnimation) {
      gsap.set(animatedElements.current, { clearProps: 'all' })
    }
  }, [])

  React.useEffect(() => {
    inView ? animateIn() : animateOut()
    return animateOut
  }, [inView])
}
