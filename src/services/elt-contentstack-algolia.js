const { extractEntries } = require('./etl-contentstack-algolia/extract')
const { loadIntoAlgoliaIndex } = require('./etl-contentstack-algolia/load')
const {
  ContentTypeAlgoliaIndexMappings,
  ContentstackQueryTypes
} = require('../settings/etl')

const etlContentStackAlgolia = async () => {
  // eslint-disable-next-line no-unused-vars
  for (const queryType of ContentstackQueryTypes) {
    const transformedEntries = await extractEntries(queryType)
    const algoliaIndexName = ContentTypeAlgoliaIndexMappings[queryType.uid]
    await loadIntoAlgoliaIndex(algoliaIndexName, transformedEntries)
    console.info(`${queryType.uid} has been loaded into ${algoliaIndexName}`)
  }
}

etlContentStackAlgolia()
