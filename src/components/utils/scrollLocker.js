function ScrollLocker() {
  function lock() {
    document.documentElement.style.overflow = 'hidden'
  }

  function unlock() {
    document.documentElement.style.overflow = ''
  }

  return {
    lock,
    unlock
  }
}

export const scrollLocker = new ScrollLocker()
