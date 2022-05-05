import { getNow } from './now'

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'

class SwipeCatchHelper {
  constructor() {
    this.touching = false
  }

  handleTouchStart = e => {
    this.touching = true
    const touch = e.touches[0]

    this.startX = touch.screenX
    this.startY = touch.screenY
    this.startTime = getNow()

    this.skipX = false
    this.skipY = false
  }

  handleTouchMove = e => {
    if (this.touching) {
      this.preventDefaults && e.preventDefault()

      const touch = e.touches[0]
      let dx = touch.screenX - this.startX
      let dy = touch.screenY - this.startY

      const currentDirectionX = dx > this.prevDx ? 1 : -1
      const currentDirectionY = dy > this.prevDy ? 1 : -1

      if (this.preventDefaults) {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          e.preventDefault()
        }
      }

      if (this.directionX !== 0) {
        if (this.directionX !== currentDirectionX) {
          this.startX = touch.screenX
          dx = 0
        }
      }

      this.directionX = currentDirectionX

      if (this.directionY !== 0) {
        if (this.directionY !== currentDirectionY) {
          this.startY = touch.screenY
          dy = 0
        }
      }

      this.directionY = currentDirectionY

      this.prevDx = dx
      this.prevDy = dy

      const now = getNow()
      if (now - this.startTime < this.swipeTime) {
        if (!this.skipX) {
          if (Math.abs(dx) > this.xDistance) {
            this.handler(dx > 0 ? RIGHT : LEFT)
            this.skipX = true
          }
        }

        if (!this.skipY) {
          if (Math.abs(dy) > this.yDistance) {
            this.handler(dy > 0 ? DOWN : UP)
            this.skipY = true
          }
        }
      }
    }
  }

  stopHandler = () => {
    this.touching = false
    this.directionX = 0
    this.directionY = 0
    this.prevDx = 0
    this.prevDy = 0
  }

  watch(element, handler, preventDefaults) {
    this.preventDefaults = preventDefaults
    this.handler = handler

    this.xDistance = 50
    this.yDistance = 50
    this.swipeTime = 500

    this.touching = false
    this.startX = 0
    this.startY = 0
    this.startTime = 0

    this.directionX = 0
    this.directionY = 0
    this.prevDx = 0
    this.prevDy = 0

    this.skipX = false
    this.skipY = false

    element.addEventListener('touchstart', this.handleTouchStart, {
      passive: true
    })

    document.body.addEventListener('touchmove', this.handleTouchMove, {
      passive: true
    })

    document.body.addEventListener('touchend', this.stopHandler, {
      passive: true
    })
    window.addEventListener('blur', this.stopHandler)
    window.addEventListener('resize', this.stopHandler)
  }

  unwatch() {
    document.body.removeEventListener('touchstart', this.handleTouchStart)
    document.body.removeEventListener('touchmove', this.handleTouchMove)

    document.body.removeEventListener('touchend', this.stopHandler)
    window.removeEventListener('blur', this.stopHandler)
    window.removeEventListener('resize', this.stopHandler)
  }
}

const instance = new SwipeCatchHelper()
instance.UP = UP
instance.DOWN = DOWN
instance.LEFT = LEFT
instance.RIGHT = RIGHT

export default instance
