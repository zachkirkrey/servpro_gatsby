import fetch from 'cross-fetch'

export default async function API(req, res) {
  const paramKeys = ['radius', 'location', 'types', 'components']
  const paramString = paramKeys
    .map(paramKey => {
      if (!req.query[paramKey]) {
        return null
      }
      return `&${paramKey}=${req.query[paramKey]}`
    })
    .filter(item => item)
    .join('')
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.input}${paramString}&key=AIzaSyAqQJLIEZPG8nn44MCwVgPDkHW6xcYAZcc`
  const response = await fetch(url)
  return res.json(await response.json())
}
