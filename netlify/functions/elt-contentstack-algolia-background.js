const {
  extractEntries
} = require('../../src/services/etl-contentstack-algolia/extract')
const {
  loadIntoAlgoliaIndex
} = require('../../src/services/etl-contentstack-algolia/load')
const {
  ContentTypeAlgoliaIndexMappings,
  ContentstackQueryTypes
} = require('../../src/settings/etl')

exports.handler = async function () {
  // eslint-disable-next-line no-unused-vars
  for (const queryType of ContentstackQueryTypes) {
    try {
      const transformedEntries = await extractEntries(queryType)
      const algoliaIndexName = ContentTypeAlgoliaIndexMappings[queryType.uid]
      console.info(
        `${queryType.uid} is being loaded into ${algoliaIndexName}`,
        transformedEntries.length
      )
      await loadIntoAlgoliaIndex(algoliaIndexName, transformedEntries)
      console.info(`${queryType.uid} has been loaded into ${algoliaIndexName}`)
    } catch (err) {
      console.error('etl-contentstck-algolia', err)
    }
  }
}
