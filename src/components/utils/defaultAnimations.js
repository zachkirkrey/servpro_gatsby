import gsap from 'gsap'

export const DEFAULT_ANIMATIONS_SELECTOR = '[data-show-animation]'

export function defaultShowAnimation(
  elements,
  { delay = 0.44, direction = 1 } = {}
) {
  return gsap.fromTo(
    elements,
    { y: 30 * direction, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      delay,
      stagger: 0.15,
      ease: 'power2.easeOut'
    }
  )
}
