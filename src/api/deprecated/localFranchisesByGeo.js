import fetch from 'cross-fetch'
import Cors from 'cors'
import algoliasearch from 'algoliasearch'
const cors = Cors()
const client = algoliasearch('SXQTSMSLU9', 'cd5a1496a5651779b441f04b37b53ded')
const index = client.initIndex('franchise_locations_prod')

const SERVPRO_API_BASE_URL = new URL(
  'https://franchiseadmin.servpro.com/franchiseinfo/GetFranchisesByLatLong/'
)

// const getGoogleMapsGeoAttribute = (components, component_type) => {
//   const findType = type => type.types[0] === component_type
//   const location = components.map(obj => obj)
//   const rr = location.filter(findType)[0]
//   return component_type == 'location_type' ? rr : rr.long_name
// }

export default async function corsHandler(req, res) {
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      const response = {}
      const { latitude, longitude } = req.query || null

      console.info(
        `Searching for franchises using query: ${latitude}, ${longitude}`
      )
      // // 1. Get `geo` via Google Geocoding `address` param
      // let geocode_api = REVERSE_GEOCODE_BASE_URL
      // geocode_api.searchParams.set('address', address)
      // geocode_api.searchParams.set('key', google_maps_key)

      // const geocode_res = await fetch(geocode_api)
      // const geocode_json = await geocode_res.json()
      // const geocode_result = geocode_json.results.shift()
      // const { geometry } = geocode_result
      // const { location } = geometry

      // 3. Use coords to get nearby franchise locations from servpro
      const franchise_by_geo_api = SERVPRO_API_BASE_URL
      franchise_by_geo_api.searchParams.set('latitude', latitude)
      franchise_by_geo_api.searchParams.set('longitude', longitude)

      const franchise_by_geo_res = await fetch(franchise_by_geo_api)
      const franchise_by_geo_json = await franchise_by_geo_res.json()

      // 4. Enrich SERVPRO results with full franchise profile from Algolia
      // 4.1 Build the algolia filter query
      const fetchAlgoliaByFranchiseIds = ids =>
        ids
          .map(item => {
            return `FranchiseNumber:${item.FranchiseNumber}`
          })
          .join(' OR ')

      const algolia_filter_query = fetchAlgoliaByFranchiseIds(
        franchise_by_geo_json
      )

      // 4.2 Get results from algolia
      const algolia_res = await index.search('', {
        filters: `${algolia_filter_query} AND TempOutOfService:false`,
        attributesToRetrieve: [
          '*', // retrieves all attributes
          '-_highlightResult', // except the search highlight data
          '-BlogPosts' // except posts (it's a big field)
        ]
      })

      // Step-by-step destructure of the matchLevel to algolia field
      const { hits } = algolia_res

      hits.map(h => console.info(h.FranchiseNumber))

      // TODO: Recursively do this on all the `hits`
      // 4.4 If the result is a child, get it's parent from algolia
      // if (local_result.ParentNumber !== 0) {
      //   algolia_res = await index.search('', {
      //     filters: 'FranchiseNumber:' + local_result.ParentNumber
      //   })
      //   local_result = algolia_res.hits.shift()
      // }

      response.franchises = hits

      // 5. Return
      res.json(response)

      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}
