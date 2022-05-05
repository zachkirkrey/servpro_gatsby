import { css } from 'twin.macro'

const paddingDefault = spacing => {
  const { top_gutter, bottom_gutter } = spacing || {
    top_gutter: 100,
    bottom_gutter: 100
  }

  if ([typeof top_gutter, typeof bottom_gutter].includes('undefined')) {
    return ``
  }

  const baseMobile = 2
  const baseDesktop = 4

  const top = typeof top_gutter === 'number' ? top_gutter : 100
  const bottom = typeof bottom_gutter === 'number' ? bottom_gutter : 100

  const mobileTop = (baseMobile * top) / 100
  const desktopTop = (baseDesktop * top) / 100
  const mobileBottom = (baseMobile * bottom) / 100
  const desktopBottom = (baseDesktop * bottom) / 100

  const retCss = css`
    & {
      padding: ${mobileTop}rem 0 ${mobileBottom}rem;

      @media (min-width: 1024px) {
        padding: ${desktopTop}rem 0 ${desktopBottom}rem;
      }
    }
  `
  return retCss
}

export default paddingDefault
