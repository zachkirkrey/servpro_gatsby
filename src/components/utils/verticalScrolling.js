import SwipeCatchHelper from './swipeCatchHelper'
import WheelCatchHelper from './wheelCatchHelper'
import Signal from './signal'

class VerticalScrolling {
  constructor(container, preventDefaults = false) {
    this.container = container
    this.totalSlides = 0
    this.maxIndex = 0
    this.index = 0
    this.scrollings = []
    this.prevScrollTime = 0
    this.changing = false
    this.started = false
    const isWindows =
      typeof window !== 'undefined' &&
      window.navigator.platform.indexOf('Win') > -1
    this.changindTime = isWindows ? 750 : 1150

    this.onChange = new Signal()
    this.onOuterScroll = new Signal()

    this.denyChanging = () => {
      this.changing = false
    }

    // noinspection JSVoidFunctionReturnValueUsed
    this.swipeWatchData = SwipeCatchHelper.watch(
      this.container,
      direction => {
        if (this.started && !this.changing) {
          if (direction === SwipeCatchHelper.LEFT) {
            this.addIndex(-1)
          } else if (direction === SwipeCatchHelper.RIGHT) {
            this.addIndex(1)
          }
        }
      },
      preventDefaults
    )

    let scrolled = false
    let denyScrolledTimeout
    let wheelTestTimeout

    this.scrollHandler = () => {
      scrolled = true
      clearTimeout(denyScrolledTimeout)
      clearTimeout(wheelTestTimeout)
      denyScrolledTimeout = setTimeout(() => {
        scrolled = false
      }, 150)
    }
    this.container.addEventListener('scroll', () => this.scrollHandler(), {
      passive: true
    })

    // noinspection JSVoidFunctionReturnValueUsed
    this.wheelWatchData = WheelCatchHelper.watch(
      this.container,
      direction => {
        wheelTestTimeout = setTimeout(() => {
          if (scrolled) {
            return
          }
          if (this.started && !this.changing) {
            if (direction === WheelCatchHelper.DOWN) {
              this.addIndex(1)
            } else if (direction === WheelCatchHelper.UP) {
              this.addIndex(-1)
            }
          }
        }, 60)
      },
      preventDefaults
    )

    this.start()
  }

  setTotalSlides(totalSlides) {
    this.totalSlides = totalSlides
    this.maxIndex = this.totalSlides - 1
    this.setIndex(this.index)
  }

  getCorrectedIndex(index) {
    let correctedIndex = index < 0 ? 0 : index
    correctedIndex =
      correctedIndex > this.maxIndex ? this.maxIndex : correctedIndex
    return correctedIndex
  }

  setIndex(newIndex, immediate) {
    if (this.changing) {
      return
    }
    const correctedIndex = this.getCorrectedIndex(newIndex)
    if (this.index === correctedIndex && !immediate) {
      let shakeTo = 0
      if (newIndex < 0 && this.index === 0) {
        shakeTo = -1
      } else if (newIndex > this.maxIndex && this.index === this.maxIndex) {
        shakeTo = 1
      }
      if (shakeTo !== 0) {
        this.onOuterScroll.call(shakeTo)
      }
      return
    }
    const direction = correctedIndex > this.index ? 1 : -1
    this.index = correctedIndex
    this.changing = true
    setTimeout(this.denyChanging, this.changindTime)
    this.onChange.call(this.index, direction)
  }

  resetIndexTo(index) {
    this.index = this.getCorrectedIndex(index)
  }

  addIndex(steps, immediate) {
    return this.setIndex(this.index + steps, immediate)
  }

  start() {
    this.started = true
  }

  stop() {
    this.started = false
  }

  destroy() {
    SwipeCatchHelper.unwatch(this.swipeWatchData)
    WheelCatchHelper.unwatch(this.wheelWatchData)
    this.container.removeEventListener('scroll', this.scrollHandler)
  }
}
export default VerticalScrolling
