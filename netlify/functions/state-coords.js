require('dotenv').config()

const axios = require('axios')
const google_maps_key = 'AIzaSyAqQJLIEZPG8nn44MCwVgPDkHW6xcYAZcc'
const REVERSE_GEOCODE_BASE_URL = new URL(
  `https://maps.googleapis.com/maps/api/geocode/json?key=${google_maps_key}`
)
exports.handler = async (event, context) => {
  console.info('event', event)
  console.info('context', context)
  try {
    console.info(event.body)
    // get the record against request
    const result = await axios.get(
      `https://api.contentstack.io/v3/content_types/metro_page/entries/blte785c3af0e094221`,
      {
        headers: {
          api_key: 'blt0a0cb058815d4d96',
          authorization: 'cscf22416c50d3a4b19c0a378b'
        }
      }
    )
    const stateUID = result.data.entry.state[0].uid

    // gete the state against id
    const state = await axios.get(
      `https://api.contentstack.io/v3/content_types/metro_parents/entries/${stateUID}`,
      {
        headers: {
          api_key: 'blt0a0cb058815d4d96',
          authorization: 'cscf22416c50d3a4b19c0a378b'
        }
      }
    )

    const slug = state.data.entry.url.replace(/^.*\/(.*)$/, '$1').toUpperCase()
    const city = result.data.entry.city
    // get the coords
    const geocode_api = await axios.get(
      `${REVERSE_GEOCODE_BASE_URL}&address=${city}+${slug}`
    )

    const lat = geocode_api.data.results[0].geometry.location.lat
    const lng = geocode_api.data.results[0].geometry.location.lng

    const update = await axios.put(
      `https://api.contentstack.io/v3/content_types/metro_page/entries/blte785c3af0e094221`,
      {
        entry: {
          latitude: `${lat}`,
          longitude: `${lng}`
        }
      },
      {
        headers: {
          api_key: 'blt0a0cb058815d4d96',
          authorization: 'cs265fc0cb9804ffe2eaa59807'
        }
      }
    )
    //cs265fc0cb9804ffe2eaa59807 ... update authorization token
    return {
      statusCode: 200,
      body: JSON.stringify(update.data)
    }
  } catch (error) {
    console.info(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' })
    }
  }
}
