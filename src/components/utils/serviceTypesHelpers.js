export const filterSortServiceTypes = (allServicesData, franchiseServices) => {
  franchiseServices = franchiseServices.map(a => a.service_line)
  return (
    allServicesData
      // eslint-disable-next-line no-confusing-arrow
      .sort((a, b) => (a.node.sort > b.node.sort ? 1 : -1))
      .filter(({ node: item }) => {
        return (
          !!item.franchise_service_mapping &&
          item.franchise_service_mapping
            .split(',')
            .some(v => franchiseServices.includes(v))
        )
      })
      .map(({ node: item }) => {
        return item
      })
  )
}
