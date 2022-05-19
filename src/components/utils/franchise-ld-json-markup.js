export function generateFranchiseLdJsonMarkup({
  name = '',
  streetAddress = '',
  addressLocality = '',
  addressRegion = '',
  postalCode = '',
  url = '',
  telePhone = '',
  LATITUDE = 0,
  LONGITUDE = 0,
  geoRadius = 0,
  areaServed = ''
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name,
    // image,
    // id,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode
    },
    telePhone,
    url,
    openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 24 hours',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    priceRange: '$$',
    areaServed: areaServed.map(elem => ({
      '@type': 'City',
      name: elem
    }))
  }

  return JSON.stringify(data)
}
