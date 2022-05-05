class Signal {
  constructor() {
    this.handlers = []
  }

  throwError() {
    throw new TypeError('Signal handler must be function!')
  }

  add(handler, context) {
    if (typeof handler !== 'function') {
      this.throwError()
      return null
    }
    this.handlers.push({ handler, context })
    return handler
  }

  remove(handler) {
    if (typeof handler !== 'function') {
      this.throwError()
      return null
    }
    return this.handlers.find(item => item.handler === handler)
  }

  call() {
    const totalHandlers = this.handlers.length
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < totalHandlers; k++) {
      const handlerData = this.handlers[k]
      // eslint-disable-next-line prefer-rest-params
      handlerData.handler.apply(handlerData.context || null, arguments)
    }
  }

  delayedCall(delay = 16) {
    delay = delay || 100

    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.slice.call(arguments)
    args.shift()

    setTimeout(() => {
      this.call.apply(this, args)
    }, delay)
  }
}

export default Signal
