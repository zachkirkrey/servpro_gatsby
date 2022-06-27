require('dotenv').config()

const algoliasearch = require('algoliasearch')
const axios = require('axios')
const slugify = require('slugify')
// eslint-disable-next-line no-underscore-dangle
const _get = require('lodash/get')
// eslint-disable-next-line no-underscore-dangle
const _keys = require('lodash/keys')
// eslint-disable-next-line no-underscore-dangle
const _orderBy = require('lodash/orderBy')
// eslint-disable-next-line no-underscore-dangle
const _lowerCase = require('lodash/lowerCase')
// eslint-disable-next-line no-underscore-dangle
const _uniqBy = require('lodash/uniqBy')
const { ServiceMappings } = require('../settings/service-mapping')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY
const ALGOLIA_FRANCHISE_LOCATIONS_INDEX =
  process.env.ALGOLIA_FRANCHISE_LOCATIONS_INDEX
const FRANCHISE_INFO_API = process.env.FRANCHISE_INFO_API
const YEXT_API_KEY = process.env.YEXT_API_KEY
const YEXT_API_V = process.env.YEXT_API_V
const YEXT_ENTITIES_API = process.env.YEXT_ENTITIES_API
const YEXT_REPORTS_API = process.env.YEXT_REPORTS_API

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY)

let yextAggregateReviews = []

const normalizeFranchiseLocation = data => {
  let services = data.ServicesProvided
    ? data.ServicesProvided.split(',').map(s => s.trim())
    : []
  const keys = new Set(services)
  services = _keys(ServiceMappings)
    .filter(key => keys.has(key))
    .map(key => ServiceMappings[key])

  if (
    data.ServicesProvided &&
    data.ServicesProvided.indexOf('Commercial') >= 0
  ) {
    services.push({ service_line: 'Commercial', sort: 0 })
  }
  services = _orderBy(_uniqBy(services, 'service_line'), ['sort'], ['asc'])

  // eslint-disable-next-line no-unused-vars
  for (const k of _keys(data)) {
    if (data[k] === 'Y') {
      data[k] = true
    } else if (data[k] === 'N') {
      data[k] = false
    }
  }

  const aggregateReview = yextAggregateReviews.find(
    record => record.location_id == data.FranchiseNumber
  )
  data.average_rating = aggregateReview ? aggregateReview['Average Rating'] : 0
  data.review_count = aggregateReview ? aggregateReview.Reviews : 0
  data.permalink =
    data.yext && data.yext.name && data.yext.address && data.yext.address.region
      ? `/locations/${_lowerCase(data.yext.address.region)}/${slugify(
          _lowerCase(data.yext.name)
        )}`
      : null
  data.ServicesProvided = services
  data.objectID = `${data.FranchiseNumber}`
  if (data.yext && data.yext.name) {
    const temp = data.yext.name.split('/').map(s => s.trim())
    data.yext.name = temp.join(' / ')
  }
  if (data.yext && data.yext.addressHidden === true) {
    data.yext.address.line1 = ''
    data.yext.address.line2 = ''
  }
  return data
}

const getAggregateReviews = async () => {
  const params = {
    api_key: YEXT_API_KEY,
    v: parseInt(YEXT_API_V)
  }
  console.info(`YEXT_REPORTS_API: ${YEXT_REPORTS_API}`)
  const yextResult = await axios.post(
    YEXT_REPORTS_API,
    {
      metrics: ['AVERAGE_RATING', 'NEW_REVIEWS'],
      dimensions: ['LOCATION_IDS', 'PARTNERS'],
      filters: {}
    },
    { params }
  )

  yextAggregateReviews = (
    _get(yextResult, ['data', 'response', 'data']) || []
  ).filter(item => item.site === 'Google My Business')
}

const updateFranchiseLocations = async () => {
  try {
    const locationsIndex = algoliaClient.initIndex(
      ALGOLIA_FRANCHISE_LOCATIONS_INDEX
    )
    // cleaar the index
    locationsIndex
      .clearObjects()
      .wait()
      .then(response => {
        console.info(response)
      })

    const limit = 50
    const entityTypes = 'location'
    const fields =
      'googlePlaceId,meta,address,description,name,cityCoordinate,c_baseURL,localPhone,mainPhone,serviceArea,timeZoneUtcOffset,addressHidden'

    const offset = 0
    let total = 0
    let pageToken = ''
    let numberOfCalls = 0

    console.info(`FRANCHISE_INFO_API: ${FRANCHISE_INFO_API}`)
    const franchiseInfoApiResult = await axios.get(FRANCHISE_INFO_API)
    const franchiseBaseRecords = franchiseInfoApiResult.data

    await getAggregateReviews()

    // gets yext data and then updates alolgia franchise_locations index
    do {
      const params = {
        limit,
        entityTypes,
        fields,
        api_key: YEXT_API_KEY,
        v: parseInt(YEXT_API_V)
      }

      if (pageToken) {
        params.pageToken = pageToken
      } else {
        params.offset = offset
      }

      console.info(`YEXT_ENTITIES_API: ${YEXT_ENTITIES_API}`)
      const yextResult = await axios.get(YEXT_ENTITIES_API, { params })

      if (yextResult && yextResult.data) {
        pageToken = yextResult.data.response.pageToken
        const yextRecords = yextResult.data.response.entities || []
        const updatingRecords = []

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < yextRecords.length; i++) {
          const tempIndex = franchiseBaseRecords.findIndex(
            record => record.FranchiseNumber == yextRecords[i].meta.id
          )

          if (tempIndex >= 0) {
            const temp = franchiseBaseRecords[tempIndex]
            franchiseBaseRecords.splice(tempIndex, 1)
            temp.yext = yextRecords[i]
            normalizeFranchiseLocation(temp)
            updatingRecords.push(temp)
          }
        }

        numberOfCalls += 1
        if (updatingRecords.length) {
          total += updatingRecords.length
          locationsIndex.update
          // await locationsIndex.partialUpdateObjects(updatingRecords)
          await locationsIndex.saveObjects(updatingRecords).wait()
          console.info(
            `${numberOfCalls} - api call has been read ${yextRecords.length} records and updated ${updatingRecords.length} algolia ones.`
          )
        } else {
          console.info(
            `${numberOfCalls} - api call has been read ${yextRecords.length} records, but there was no one matched.`
          )
        }
      }
      // offset += limit
    } while (pageToken)

    console.info(`${total} records with yext have been updated.`)

    // saves the rest of franchiseBaseRecords
    franchiseBaseRecords.forEach(temp => {
      temp.yext = null
      normalizeFranchiseLocation(temp)
    })

    await locationsIndex.saveObjects(franchiseBaseRecords).wait()
    console.info(
      `${franchiseBaseRecords.length} records without yext have been updated.`
    )
  } catch (err) {
    console.error('err ===== ', YEXT_ENTITIES_API, err)
  }
}

module.exports = {
  updateFranchiseLocations
}
// updateFranchiseLocations()
