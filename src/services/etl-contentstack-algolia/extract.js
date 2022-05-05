require('dotenv').config()

const axios = require('axios')
const { transform } = require('./transform')

const CONTENTSTACK_API_KEY = process.env.CONTENTSTACK_API_KEY
const CONTENTSTACK_MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN
const CONTENTSTACK_ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT

// const loadAllContentTypes = async () => {
//   const result = await axios.get(
//     'https://api.contentstack.io/v3/content_types',
//     {
//       headers: {
//         api_key: CONTENTSTACK_API_KEY,
//         authorization: CONTENTSTACK_MANAGEMENT_TOKEN
//       },
//       params: {
//         include_count: true,
//         include_global_field_schema: false
//       }
//     }
//   )

//   if (result.data && result.data.content_types) {
//     return result.data.content_types
//       .filter(item => item.options.is_page)
//       .map(item => ({
//         uid: item.uid,
//         title: item.title
//       }))
//   }

//   return []
// }

const loadAllEntries = async (
  contentTypeUid,
  locale = 'en-us',
  include_workflow = true,
  include_publish_details = false
) => {
  try {
    const result = await axios.get(
      `https://api.contentstack.io/v3/content_types/${contentTypeUid}/entries`,
      {
        headers: {
          api_key: CONTENTSTACK_API_KEY,
          authorization: CONTENTSTACK_MANAGEMENT_TOKEN
        },
        params: {
          locale,
          include_workflow,
          include_publish_details
        }
      }
    )

    if (result.data && result.data.entries) {
      return result.data.entries
    }
    return []
  } catch (err) {
    console.error('Err in loadAllEntries ===', err)
    return []
  }
}

const extractEntries = async queryType => {
  const entries = await loadAllEntries(queryType.uid)
  const result = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < entries.length; i++) {
    try {
      const recipe = queryType.uid // determine which recipe will be uesd to transform the data
      const transformedData = transform({
        data: entries[i],
        contentTypeUid: queryType.uid,
        environment: CONTENTSTACK_ENVIRONMENT,
        recipe
      })

      result.push(...transformedData)
    } catch (err) {
      console.error('Err in extractEntries ===', err)
    }
  }
  return result
}

module.exports = {
  extractEntries
}
