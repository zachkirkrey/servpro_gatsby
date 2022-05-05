import { striptags } from 'striptags'

const justPTags = htmlString =>
  !!htmlString &&
  striptags(
    htmlString.includes('</p>')
      ? htmlString
          .split('</p>')
          .filter(p => p.indexOf('<p>') !== -1)
          .map(p => `${p.slice(p.indexOf('<p>'))}`)
          .join('</p>')
      : htmlString
  )

export { justPTags }
