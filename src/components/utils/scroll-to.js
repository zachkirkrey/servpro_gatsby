export function customScrollTo(to, { duration } = { duration: 600 }) {
  const startingY = window.pageYOffset
  const diff = to - startingY
  let start

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp
    }
    // Elapsed milliseconds since start of scrolling.
    const time = timestamp - start
    // Get percent of completion in range [0, 1].
    const percent = Math.min(time / duration, 1)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
