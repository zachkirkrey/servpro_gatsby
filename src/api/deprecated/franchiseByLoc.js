import fetch from 'cross-fetch'
import Cors from 'cors'
const cors = Cors()

const API_BASE_URL = new URL(
  'https://franchiseadmin.servpro.com/franchiseinfo/GetFranchisesByLatLong/'
)

export default async function corsHandler(req, res) {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      // Build our external API URL
      const external_api_url = API_BASE_URL

      // Add lat/lng query params:
      const { longitude, latitude } = req.query || '0'
      external_api_url.searchParams.set('latitude', latitude)
      external_api_url.searchParams.set('longitude', longitude)

      // The API returns "FranchiseNumber" fields that match the `meta.id` in Algolia.
      const external_res = await fetch(external_api_url)
      const json = await external_res.json()
      res.json(json)

      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}
