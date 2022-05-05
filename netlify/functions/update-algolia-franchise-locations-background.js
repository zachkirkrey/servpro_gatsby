const {
  updateFranchiseLocations
} = require('../../src/services/update-algolia-franchise_locations')

exports.handler = async function () {
  await updateFranchiseLocations()
}
