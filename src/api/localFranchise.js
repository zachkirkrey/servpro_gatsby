import Cors from 'cors'
import {
  reverseGeoCode,
  ipGeoCode,
  rankedFranchiseByCoord
} from './utils/geo/geoHelpers'

const cors = Cors()

export default async function corsHandler(req, res) {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      const { latitude, longitude, location_type, address } = req.query || null
      let geo = {}

      // 1. Get `geo` via most accurate method:
      if (!!latitude && !!longitude && location_type === 'browser-api') {
        geo = await reverseGeoCode({ latlng: `${latitude},${longitude}` })
      } else if (address) {
        geo = await reverseGeoCode({ address })
      } else {
        geo = await ipGeoCode()
      }

      let response = {}
      if (!!geo && !!geo.latitude && !!geo.longitude) {
        const frResults = await rankedFranchiseByCoord(
          geo.latitude,
          geo.longitude
        )
        response = {
          geo: geo || {},
          franchise: frResults || []
        }
      }

      res.json(response)

      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}
