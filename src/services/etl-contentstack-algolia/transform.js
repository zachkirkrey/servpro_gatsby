const { Recipes } = require('../../settings/etl')

const transform = ({ data, contentTypeUid, environment, recipe }) => {
  // perform default transform
  const transformedData = Recipes[recipe](data, contentTypeUid, environment)
  return transformedData
}

module.exports = {
  transform
}
