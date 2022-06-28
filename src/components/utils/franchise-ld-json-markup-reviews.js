export function generateFranchiseLdJsonMarkupReviews({
  name = '',
  description = '',
  image = '',
  ratingValue = 0,
  bestRating = 0,
  worstRating = 0,
  ratingCount = 0
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    image,
    description,
    brand: 'SERVPRO',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating,
      worstRating,
      ratingCount
    }
  }

  return JSON.stringify(data)
}
