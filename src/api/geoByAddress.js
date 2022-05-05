import Cors from 'cors'

import { reverseGeoCode } from './utils/geo/geoHelpers'

const cors = Cors()

export default async function corsHandler(req, res) {
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      const { address } = req.query || null

      // Get `geo` via Google Geocoding `address` param
      const geo = await reverseGeoCode({ address })

      res.json(geo)

      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}
