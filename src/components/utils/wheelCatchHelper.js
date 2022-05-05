import { getNow } from './now'

const UP = 'up'
const DOWN = 'down'
const FF_MODE =
  typeof window !== 'undefined' &&
  window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1

const settings = {
  length: 149,
  difference: 200,
  end: 10,
  middle: 70,
  duration: 1250
}
/*const updateSettings = () => {
	const hash = document.location.hash.replace('#', '');
	const hashSettings = hash.split(',');
	for (let k = 0; k < 5; k++) {
		hashSettings[k] = Number.parseFloat(hashSettings[k]);
	}

	settings.length = Number.isNaN(hashSettings[0]) ? 149 : hashSettings[0];
	settings.difference = Number.isNaN(hashSettings[1]) ? 200 : hashSettings[1];
	settings.end = Number.isNaN(hashSettings[2]) ? 10 : hashSettings[2];
	settings.middle = Number.isNaN(hashSettings[3]) ? 70 : hashSettings[3];
	settings.duration = Number.isNaN(hashSettings[4]) ? 1250 : hashSettings[4];
};
window.addEventListener('hashchange', e => {
	updateSettings();
});
updateSettings();*/

class WheelCatchHelper {
  getAverageScrolling(count, scrollings) {
    const lastElements = scrollings.slice(
      Math.max(scrollings.length - count, 1)
    )
    let result = 0
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < lastElements.length; k++) {
      result += lastElements[k]
    }

    return Math.ceil(result / count)
  }

  wheelHandler = event => {
    const now = getNow()

    event = window.event || event || event.originalEvent

    const value = event.wheelDelta || -event.deltaY || -event.detail
    let delta = Math.max(-1, Math.min(1, value))

    if (FF_MODE) {
      delta = -Math.max(-1, Math.min(1, event.deltaY))
    }

    if (this.scrollings.length > settings.length) {
      this.scrollings.shift()
    }

    this.scrollings.push(Math.abs(value))

    const timeDifference = now - this.prevScroll
    this.prevScroll = now

    if (timeDifference > settings.difference) {
      this.scrollings = []
    }

    const averageEnd = this.getAverageScrolling(settings.end, this.scrollings)
    const averageMiddle = this.getAverageScrolling(
      settings.middle,
      this.scrollings
    )

    if (
      averageEnd >= averageMiddle &&
      now - this.prevCallTime > settings.duration
    ) {
      this.scrollings = []
      this.prevCallTime = now
      this.handler && this.handler(delta > 0 ? UP : DOWN, event)
    }
  }

  watch(element, handler) {
    this.handler = handler
    this.element = element
    this.scrollings = []
    this.prevScroll = 0
    this.prevCallTime = -1

    this.element.addEventListener('mousewheel', this.wheelHandler, {
      passive: true
    })
    this.element.addEventListener('wheel', this.wheelHandler, { passive: true })
  }

  unwatch() {
    this.element.removeEventListener('mousewheel', this.wheelHandler)
    this.element.removeEventListener('wheel', this.wheelHandler)
  }
}

const instance = new WheelCatchHelper()
instance.UP = UP
instance.DOWN = DOWN

export default instance
