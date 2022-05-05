const { transform } = require('./transform')
const { loadIntoAlgoliaIndex, deleteFromAlgoliaIndex } = require('./load')
const { ContentTypeAlgoliaIndexMappings } = require('../../settings/etl')

export const create = async data => {
  try {
    if (data.entry) {
      const recipe = '' // determine which recipe will be uesd to transform the data
      const algoliaIndexName =
        ContentTypeAlgoliaIndexMappings[data.content_type.uid]
      const transformedData = transform({
        data: data.entry,
        contentTypeUid: data.content_type.uid || '',
        environment: data.environment.name,
        recipe
      })
      return await loadIntoAlgoliaIndex(algoliaIndexName, transformedData)
    }
    data.asset.environment = data.environment.name
    data.asset.objectID = `${data.asset.uid}`
    return await loadIntoAlgoliaIndex('search-assets', [data.asset])
  } catch (err) {
    return err
  }
}

export const deleteObject = async data => {
  try {
    if (data.entry) {
      const algoliaIndexName =
        ContentTypeAlgoliaIndexMappings[data.content_type.uid]
      const objectID = `${data.content_type.uid}.${data.entry.uid}.${data.locale}.${data.environment.name}`
      return await deleteFromAlgoliaIndex(algoliaIndexName, objectID)
    }
    const objectID = `${data.asset.uid}`
    return await deleteFromAlgoliaIndex('search-assets', objectID)
  } catch (err) {
    return err
  }
}

// export const search = async query => {
//   try {
//     const result = await index.search({ query: query }).wait()
//     return result.hits
//   } catch (err) {
//     return err
//   }
// }

// export const deleteByQuery = async data => {
//   try {
//     const result = await index.deleteBy({
//       filters: `_content_type:${data.uid}`
//     })
//     return result
//   } catch (err) {
//     return err
//   }
// }

// export const deleteEntryByQuery = async data => {
//   try {
//     const result = await index.deleteBy({
//       filters: `uid:${data.entry.uid}`
//     })
//     return result
//   } catch (err) {
//     return err
//   }
// }
