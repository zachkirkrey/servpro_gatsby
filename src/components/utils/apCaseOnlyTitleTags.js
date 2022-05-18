const stopwords = 'a an and at but by for in nor of on or so the to up yet'
const defaults = stopwords.split(' ')
const uppercaseAsDefault = 'servpro'
const defaultReplace = 'Certified: SERVPRO Cleaned'
const defaultReplaceWith = '<i>Certified: SERVPRO Cleaned<i>'
const apTitleCase = (str, options) => {
  const opts = options || {}

  if (!str) {
    return ''
  }

  const stop = opts.stopwords || defaults
  const keep = opts.keepSpaces
  const splitter = /(\s+|[-‑–—])/

  return str
    .split(splitter)
    .map((word, index, all) => {
      if (word.match(/\s+/)) {
        return keep ? word : ' '
      }
      if (word.match(splitter)) {
        return word
      }

      if (
        index !== 0 &&
        index !== all.length - 1 &&
        stop.includes(word.toLowerCase())
      ) {
        return word.toLowerCase()
      }

      if (uppercaseAsDefault.includes(word.toLowerCase())) {
        return word.toUpperCase()
      }

      return capitalize(word)
    })
    .join('')
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function apCaseOnlyTitleTags(str) {
  if (!str) {
    return ''
  }

  const regExps = [
    /<h2\b[^>]*>[^<>]*<\/h2>/gi,
    /<h3\b[^>]*>[^<>]*<\/h3>/gi,
    /<h4\b[^>]*>[^<>]*<\/h4>/gi
  ]
  let newStr = str.replace(defaultReplace, defaultReplaceWith)
  regExps.forEach(regExp => {
    newStr = newStr.replace(regExp, substr => {
      return substr.replace(/(>)[^<>]*(<)/, content => {
        return `>${apTitleCase(content.slice(1, -1))}<`
      })
    })
  })
  return newStr
}

export default apCaseOnlyTitleTags
