import algoliasearch from 'algoliasearch'
import fetch from 'cross-fetch'
import { uniqBy } from 'lodash/array'
import { sortBy } from 'lodash/collection'

// import { object } from 'prop-types'

const client = algoliasearch('SXQTSMSLU9', 'cd5a1496a5651779b441f04b37b53ded')
const index = client.initIndex('franchise_locations_prod')

const google_maps_key = 'AIzaSyAqQJLIEZPG8nn44MCwVgPDkHW6xcYAZcc'
const ipstack_key = '796435b41d113bb2ce49c3598fff5fba'

const IP_STACK_BASE_URL = new URL('http://api.ipstack.com/check')
const REVERSE_GEOCODE_BASE_URL = new URL(
  'https://maps.googleapis.com/maps/api/geocode/json'
)
const SERVPRO_API_BASE_URL = new URL(
  'https://franchiseadmin.servpro.com/franchiseinfo/GetFranchisesByLatLong/'
)

export const rankedFranchiseByCoord = async (
  latitude,
  longitude,
  attributesToRetrieve = []
) => {
  // 1. Use coords to get nearby franchise locations from servpro
  const geoSortedFranchiseNumbers = await franchiseLocationsByCoord(
    latitude,
    longitude
  )

  // List of hard coded franchises
  const hard_coded_franchises = [
    8722, 1196, 9670, 5825, 8500, 9725, 9914, 1994, 8485, 8451
  ]
  let temp

  // Swapping positions if list contains any franchise from the hard coded franchise numbers

  geoSortedFranchiseNumbers.map((item, position) => {
    if (position === 0) {
      if (hard_coded_franchises.includes(item.FranchiseNumber)) {
        temp = geoSortedFranchiseNumbers[position]
        geoSortedFranchiseNumbers[position] =
          geoSortedFranchiseNumbers[position + 1]
        geoSortedFranchiseNumbers[position + 1] = temp
      }
    }
  })

  // geoSortedFranchiseNumbers here is updated list of Franchises

  // 2. Enrich SERVPRO results with full franchise profile from Algolia
  const enrichedFranchises = await enrichFranchiseWithProfile(
    geoSortedFranchiseNumbers,
    attributesToRetrieve
  )

  // 3. Rank the results
  const results = await applyRankingToFranchiseResults(
    enrichedFranchises,
    geoSortedFranchiseNumbers
  )

  results.filter(item => item)

  return results.filter(item => item.yext).slice(0, 5) || []
}

export const franchiseById = async (id, attributesToRetrieve = []) => {
  const idArray = [{ FranchiseNumber: id }]
  return await enrichFranchiseWithProfile(idArray, attributesToRetrieve)
}

// ===================
// FRANCHISE PROFILE HELPERS
// ===================

// RETRIEVE GEO RANKED FRANCHISE NUMBERS FROM SERVPRO
// --------------------
const franchiseLocationsByCoord = async (latitude, longitude) => {
  const franchise_by_geo_api = SERVPRO_API_BASE_URL
  franchise_by_geo_api.searchParams.set('latitude', latitude)
  franchise_by_geo_api.searchParams.set('longitude', longitude)

  const franchise_by_geo_res = await fetch(franchise_by_geo_api)
  const franchise_by_geo_json = await franchise_by_geo_res.json()

  return franchise_by_geo_json
}

// RETRIEVE FRANCHISE PROFILES FOR ARRAY OF FRANCHISE NUMBERS
// --------------------
const enrichFranchiseWithProfile = async (
  franchiseIds,
  attributesToRetrieve = []
) => {
  // 4.1 Build the algolia filter query
  const fetchAlgoliaByFranchiseIds = ids =>
    ids
      .map(item => {
        return `FranchiseNumber:${item.FranchiseNumber}`
      })
      .join(' OR ')

  const algolia_filter_query = fetchAlgoliaByFranchiseIds(franchiseIds)

  const defaultAttrToRetrieve = [
    '*', // retrieves all attributes
    '-_highlightResult', // except the search highlight data
    '-BlogPosts' // except posts (it's a big field)
  ]

  // 4.2 Get results from algolia
  const algolia_res = await index.search('', {
    filters: `${algolia_filter_query} AND TempOutOfService:false`,
    attributesToRetrieve: [...defaultAttrToRetrieve, ...attributesToRetrieve]
  })

  // Step-by-step destructure of the matchLevel to algolia field
  const { hits } = algolia_res

  const result = replaceChildrenWithParentProfile(hits) || []

  return result
}

// REPLACE CHILD FRANCHISE LOCATIONS WITH THEIR PARENT'S FRANCHISE PROFILE
// --------------------
const replaceChildrenWithParentProfile = async franchiseProfiles => {
  const parentQueryPromises = franchiseProfiles.map(async franchiseObj => {
    if (!!franchiseObj && franchiseObj.ParentNumber !== 0) {
      const algolia_res = await index.search('', {
        filters: `FranchiseNumber:${franchiseObj.ParentNumber} AND TempOutOfService:false`,
        attributesToRetrieve: [
          '*', // retrieves all attributes
          '-_highlightResult', // except the search highlight data
          '-BlogPosts' // except posts (it's a big field)
        ]
      })

      if (!!algolia_res.hits.length > 0) {
        const parentFranchise = algolia_res.hits.shift()
        parentFranchise.childFranchiseNumber = franchiseObj.FranchiseNumber
        return parentFranchise
      }

      console.info(
        `Could not find matching parent franchise found for ${franchiseObj.FranchiseNumber}`
      )
      return null
    }
    return franchiseObj
  })

  return await Promise.all(parentQueryPromises)
}

// RE-RANK ALL FRANCHISE PROFILE RESULTS BY PROXIMETY AND REVIEWS
// ------------------
const applyRankingToFranchiseResults = async (
  enrichedFranchises,
  geoSortedFranchiseNumbers
) => {
  const sortedFranchiseObjects = geoSortedFranchiseNumbers
    .map(sorted => {
      return enrichedFranchises.find(obj => {
        if (!!obj && !!sorted) {
          return (
            obj.FranchiseNumber === sorted.FranchiseNumber ||
            obj.childFranchiseNumber === sorted.FranchiseNumber
          )
        }
        return null
      })
    })
    .filter(e => e)

  const winning_results = []
  let additional_results = []

  const winning_result = sortedFranchiseObjects.shift()
  winning_results.push(winning_result)

  sortedFranchiseObjects.map((data, i) => {
    if (!!data && !!winning_result) {
      if (data.FranchiseNumber !== winning_result.FranchiseNumber) {
        // TODO: refactor nested ternaries
        // eslint-disable-next-line no-nested-ternary
        data.rank = !!data && data.average_rating < 4 ? i + 100 : i
        data.index = i
        additional_results.push(data)
      }
    } else {
      console.info(`ERROR`)
      console.info(winning_result)
      console.info(data)
    }
  })

  additional_results = sortBy(additional_results, 'rank')
  additional_results = uniqBy(additional_results, 'FranchiseNumber')
  return [...winning_results, ...additional_results]
}

// ===================
// GEO HELPERS
// ===================

// Reverse Geocode an address or lat/lng and build geo object.
export const reverseGeoCode = async params => {
  const geocode_api = REVERSE_GEOCODE_BASE_URL

  geocode_api.searchParams.set('key', google_maps_key)
  Object.keys(params).map(key => {
    geocode_api.searchParams.set(key, params[key])
  })

  const geocode_res = await fetch(geocode_api)
  const geocode_json = await geocode_res.json()

  if (geocode_json !== 'ZERO_RESULTS' && geocode_json.results.length > 0) {
    const geocode_result = geocode_json.results.shift()

    const { geometry } = geocode_result || null
    const { location, location_type } = geometry || null

    const result = {
      city: getGoogleMapsGeoAttribute(
        geocode_result.address_components,
        'locality'
      ),
      state: getGoogleMapsGeoAttribute(
        geocode_result.address_components,
        'administrative_area_level_1'
      ),
      state_short: getGoogleMapsGeoAttribute(
        geocode_result.address_components,
        'administrative_area_level_1',
        'short'
      ),
      zip: getGoogleMapsGeoAttribute(
        geocode_result.address_components,
        'postal_code'
      ),
      latitude: location.lat,
      longitude: location.lng,
      location_type
    }

    return result
  }

  return {}
}

// Use users IP address to determine location and return a geo object.
export const ipGeoCode = async () => {
  // 1.3 Default: Estimate by IP
  const ipstack_api = IP_STACK_BASE_URL
  ipstack_api.searchParams.set('access_key', ipstack_key)
  // 1.3.1 Get IP Geo Info
  const ipstack_res = await fetch(ipstack_api)
  const ipstack_json = await ipstack_res.json()
  // 1.3.2 Set the lat/long for use in our SERVPRO query
  const { latitude, longitude } = ipstack_json || null
  // 1.3.3 Build out the Response for the geo info
  const result = {
    city: ipstack_json.city,
    state: ipstack_json.region_code,
    zip: ipstack_json.zip,
    latitude: latitude || 0,
    longitude: longitude || 0,
    location_type: 'approximate'
  }

  return result
}

const getGoogleMapsGeoAttribute = (components, component_type, format) => {
  const findType = type => type.types[0] === component_type
  const location = components.map(obj => obj)
  const rr = location.filter(findType)[0]
  // TODO: refactor nested ternaries
  // eslint-disable-next-line no-nested-ternary
  return !rr
    ? null
    : // eslint-disable-next-line no-nested-ternary
    component_type == 'location_type'
    ? rr
    : !!format && format === 'short'
    ? rr.short_name
    : rr.long_name
}
