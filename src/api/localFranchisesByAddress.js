import Cors from 'cors'

import { reverseGeoCode, rankedFranchiseByCoord } from './utils/geo/geoHelpers'

const cors = Cors()

export default async function corsHandler(req, res) {
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      const response = {}
      const {address} = req.query || null
      
      // 1. Get `geo` via Google Geocoding `address` param
      const geo = await reverseGeoCode({address})

      // 2. Get ranked and sorted franchise results
      const results = await rankedFranchiseByCoord(geo.latitude, geo.longitude)
      
      response.geo = geo
      response.franchises = results
      res.json(response)

      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}
