export function generateFranchiseLdJsonMarkupService({
  name = '',
  ServicesProvided = '',
  streetAddress = '',
  addressLocality = '',
  addressRegion = '',
  postalCode = '',
  telePhone = ''
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '24/7 water, fire, smoke, mold, and mildew damage cleanup',
    provider: {
      '@type': 'LocalBusiness',
      name: 'SERVPRO',
      address: {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode
      },
      telePhone
    },

    areaServed: {
      '@type': 'State',
      name
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Property damage',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Property damage cleanup',
          itemListElement: ServicesProvided.map(elem => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: elem
            }
          }))
        }
      ]
    }
  }

  return JSON.stringify(data)
}
