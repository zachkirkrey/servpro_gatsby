export function generateFranchiseLdJsonMarkupService({ name = '' }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '24/7 water, fire, smoke, mold, and mildew damage cleanup',
    provider: {
      '@type': 'LocalBusiness',
      name: 'SERVPRO'
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
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Fire damage cleaning'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Water damage cleaning'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Smoke damage cleaning'
              }
            }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Mold & mildew cleaning',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mold cleaning'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mildew cleaning'
              }
            }
          ]
        }
      ]
    }
  }

  return JSON.stringify(data)
}
