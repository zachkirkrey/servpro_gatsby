require('dotenv').config()

const algoliasearch = require('algoliasearch')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY)

const loadIntoAlgoliaIndex = async (indexName, entries) => {
  const index = algoliaClient.initIndex(indexName)
  return await index.saveObjects(entries).wait()
}

const deleteFromAlgoliaIndex = async (indexName, objectID) => {
  const index = algoliaClient.initIndex(indexName)
  return await index.deleteObject(objectID).wait()
}

module.exports = {
  loadIntoAlgoliaIndex,
  deleteFromAlgoliaIndex
}
