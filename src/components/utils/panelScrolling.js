import gsap from 'gsap'

import VerticalScrolling from './verticalScrolling'
import SwipeCatchHelper from './swipeCatchHelper'

class PanelScrolling {
  constructor(slidesContainer, slides, { onSlideChange }) {
    this.slidesContainer = slidesContainer
    this.scorllShakerElement = this.slidesContainer.parentElement
    this.slides = slides
    this.currentSlide = slides[0]
    this.verticalScrolling = new VerticalScrolling(document.body, false)

    this.verticalScrolling.setTotalSlides(slides.length)
    this.currentIndex = 0

    this.sameDirectionCount = 0
    this.savedDirection = ''
    this.MAX_SCROLL_INTERACTIONS_TO_SWITCH = 2
    this.SCROLL_INTERACTION_VALUE = 30
    this.verticalScrolling.stop()

    // noinspection JSVoidFunctionReturnValueUsed
    this.swipeWatchData = SwipeCatchHelper.watch(document.body, () => {
      this.verticalScrolling.start()
    })

    document.addEventListener('mousewheel', this.wheelHandler)
    document.addEventListener('wheel', this.wheelHandler)

    this.verticalScrolling.onChange.add((newIndex, direction) => {
      onSlideChange?.(direction)
      const newSlide = slides[newIndex]
      const easing = 'power3.inOut'
      const tweenTime = 0.75
      // const innerYMove = 50
      // const innerScale = 0.975

      this.verticalScrolling.stop()
      this.sameDirectionCount = 0

      gsap.set(newSlide.querySelector('[data-switch-visibility]'), {
        display: 'block',
        visibility: 'visible'
      })

      // gsap.fromTo(
      //   newSlide,
      //   {
      //     y: `${direction * 100}%`
      //     // visibility: 'visible',
      //     // display: 'block'
      //   },
      //   { y: '0%', duration: tweenTime, ease: easing, force3D: true }
      // )

      // gsap.fromTo(
      //   newSlide.children[0],
      //   { y: `${-direction * innerYMove}%`, scale: innerScale },
      //   {
      //     y: '0%',
      //     scale: 1,
      //     duration: tweenTime,
      //     ease: easing,
      //     force3D: true
      //   }
      // )

      // gsap.to(this.currentSlide, {
      //   y: `${-direction * 100}%`,
      //   ease: easing,
      //   duration: tweenTime,
      //   force3D: true
      // })

      gsap.to(slidesContainer, {
        y: -window.innerHeight * newIndex,
        ease: easing,
        duration: tweenTime,
        force3D: true
      })

      // gsap.to(this.currentSlide.children[0], {
      //   y: `${direction * innerYMove}%`,
      //   scale: innerScale,
      //   ease: easing,
      //   duration: tweenTime,
      //   force3D: true
      // })

      gsap.set(this.currentSlide, {
        pointerEvents: 'none'
      })
      gsap.set(this.currentSlide.querySelector('[data-switch-visibility]'), {
        display: 'none',
        visibility: 'hidden',
        delay: tweenTime
      })
      gsap.set(newSlide, {
        pointerEvents: 'all'
      })

      this.currentSlide = newSlide
    })

    this.verticalScrolling.onOuterScroll.add(direction => {
      gsap.to(this.scorllShakerElement, {
        y: -direction * 20,
        duration: 0.15,
        onComplete: () => {
          gsap.to(this.scorllShakerElement, {
            y: 0,
            duration: 0.35,
            ease: 'power1.easeOut'
          })
        }
      })
    })
  }

  wheelHandler = event => {
    const value = event.wheelDelta || -event.deltaY || -event.detail
    const delta = Math.max(-1, Math.min(1, value))
    const direction = delta > 0 ? 1 : -1

    if (this.verticalScrolling.started) {
      return
    }

    if (this.savedDirection === direction) {
      this.sameDirectionCount += 1
    } else {
      this.sameDirectionCount = 0
    }

    if (this.sameDirectionCount < this.MAX_SCROLL_INTERACTIONS_TO_SWITCH) {
      this.verticalScrolling.stop()
    } else {
      this.verticalScrolling.start()
    }

    gsap.to(this.scorllShakerElement, {
      y: direction * this.SCROLL_INTERACTION_VALUE * this.sameDirectionCount,
      duration: 0.125,
      onComplete: () => {
        gsap.to(this.scorllShakerElement, {
          y: 0,
          duration: 0.35,
          ease: 'power1.easeOut'
        })
      }
    })

    this.savedDirection = direction

    setTimeout(() => {
      this.sameDirectionCount = 0
    }, 1000)
  }

  destroy() {
    this.verticalScrolling.destroy()
    gsap.set(this.slidesContainer, { clearProps: 'all' })
    this.slides.forEach(slideNode => {
      gsap.set(slideNode, {
        clearProps: 'all'
      })
      gsap.set(slideNode.children[0], {
        clearProps: 'all'
      })
    })
  }
}

export default PanelScrolling
