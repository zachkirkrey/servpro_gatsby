export function truncate(
  str,
  num,
  { forceEllipsis, noEllipsisIfEmpty } = {
    forceEllipsis: false,
    noEllipsisIfEmpty: false
  }
) {
  const ellipsisPart = '...'

  if (str === undefined) {
    return noEllipsisIfEmpty ? '' : ellipsisPart
  }

  if (str.length <= num) {
    return forceEllipsis ? `${str}${ellipsisPart}` : str
  }
  return str.slice(0, num) + ellipsisPart
}

export function truncateHTML(str, num, options = {}) {
  if (str === undefined || typeof str !== 'string') {
    return options.noEllipsisIfEmpty ? '' : '...'
  }
  const strippedString = str.replace(/(<([^>]+)>)/gi, () => {
    return ''
  })
  return truncate(strippedString, num, options)
}
