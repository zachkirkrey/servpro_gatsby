const axios = require('axios')
const xml2js = require('xml2js')
// eslint-disable-next-line no-underscore-dangle
const _get = require('lodash/get')
const url = 'https://services.servpro.com/FnolService.svc/soap'
const dataTags = [
  'FirstName',
  'LastName',
  'PrimaryPhone',
  'SecondaryPhone',
  'Address1',
  'Address2',
  'City',
  'State',
  'Zip',
  'Email',
  'Priority',
  'PropertyType',
  'LossDate',
  'LossType',
  'LossCause',
  'FranchiseNumber',
  'InsuranceCarrier',
  'InsuranceClaimNumber',
  'FranchiseRepresentative',
  'Comments',
  'SecurityToken',
  'IPAddress'
]
export default async function handler(req, res) {
  try {
    const { data } = req.body
    let xmlData = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:stag="http://stage.servpro.com" xmlns:ser="http://schemas.datacontract.org/2004/07/SERVPRO.WebServices.Services.CompositeType.Fnol">
        <soapenv:Header/>
        <soapenv:Body>
          <stag:SubmitFnol>
              <!--Optional:-->
              <stag:request>`

    dataTags.forEach(dataTag => {
      if (dataTag === 'SecurityToken') {
        xmlData += `<ser:SecurityToken>8CED6F17-9C5F-4E88-94D2-11817349813B</ser:SecurityToken>`
      } else if (data[dataTag]) {
        xmlData += `<ser:${dataTag}>${data[dataTag]}</ser:${dataTag}>`
      }
    })
    xmlData += `</stag:request></stag:SubmitFnol></soapenv:Body></soapenv:Envelope>`

    const temp = await axios.post(url, xmlData, {
      headers: {
        SOAPAction: 'http://stage.servpro.com/FnolService/SubmitFnol',
        'Content-Type': 'text/xml;charset=UTF-8'
      }
    })
    const parsedTemp = await xml2js.parseStringPromise(temp.data, {
      ignoreAttrs: true
    })
    const result = _get(parsedTemp, [
      's:Envelope',
      's:Body',
      0,
      'SubmitFnolResponse',
      0,
      'SubmitFnolResult',
      0
    ])

    return res.status(200).json({
      success: _get(result, ['a:Success', 0]) === 'true',
      message: _get(result, ['a:Message', 0]),
      webFnolId: _get(result, ['a:WebFnolId', 0])
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
