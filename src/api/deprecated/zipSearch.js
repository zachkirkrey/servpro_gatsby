import fetch from 'cross-fetch'
import Cors from 'cors'
const cors = Cors()

const API_BASE_URL = new URL('https://geocode.xyz/')

export default async function corsHandler(req, res) {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      // Build our external API URL
      const external_api_url = API_BASE_URL

      // Add lat/lng query params:
      Object.keys(req.query).forEach(key =>
        external_api_url.searchParams.append(key, req.query[key])
      )

      // The API returns "FranchiseNumber" fields that match the `meta.id` in Algolia.
      const external_res = await fetch(external_api_url)
      res.json(await external_res.json())

      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}
