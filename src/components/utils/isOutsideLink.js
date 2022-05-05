const isOutsideLink = (link, location) => {
  const domain = location.origin
  if (!link) {
    return false
  }

  if (link.startsWith('/') || link.startsWith(domain)) {
    return false
  }

  return true
}

export default isOutsideLink
