import requestIp from 'request-ip'
import fetch from 'cross-fetch'
import Cors from 'cors'
const cors = Cors()

const API_BASE_URL = new URL('http://api.ipstack.com/check')
const API_KEY = '796435b41d113bb2ce49c3598fff5fba'

export default async function corsHandler(req, res) {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      // Pass-thru request IP from client
      // NOTE: this works deployed to Netlify, but not Gatsby Cloud as of Sept 2021
      const clientIp = requestIp.getClientIp(req)
      const isLocalhost = () => clientIp === `127.0.0.1`

      // Build query URL from given IP:
      const api_url =
        !!clientIp && !isLocalhost()
          ? new URL(`/${clientIp}`, API_BASE_URL)
          : new URL(API_BASE_URL)
      api_url.searchParams.set('access_key', API_KEY)

      const external_res = await fetch(api_url)
      const json = await external_res.json()
      const { latitude, longitude } = json || { latitude: -1, longitude: -1 }

      const geo = {
        latitude,
        longitude
      }

      // Shape this like { geo, franchise: null } for Locator
      res.json(geo)

      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}
