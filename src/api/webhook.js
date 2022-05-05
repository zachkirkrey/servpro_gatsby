import Cors from 'cors'
import safeCompare from 'safe-compare'
import {
  create,
  deleteObject
  // search,
  // deleteByQuery,
  // deleteEntryByQuery
} from '../services/etl-contentstack-algolia/webhook'

const contentstackAlgoliaWebhookAuthUsername =
  process.env.CONTENTSTACK_ALGOLIA_WEBHOOK_AUTH_USERNAME
const contentstackAlgoliaWebhookAuthPassword =
  process.env.CONTENTSTACK_ALGOLIA_WEBHOOK_AUTH_PASSWORD

const cors = Cors()

function authenticate(req, res) {
  // check for basic auth header
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf('Basic ') === -1
  ) {
    res.status(401).json({ message: 'Missing Authorization Header' })
    return false
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')

  if (
    !safeCompare(contentstackAlgoliaWebhookAuthUsername, username) ||
    !safeCompare(contentstackAlgoliaWebhookAuthPassword, password)
  ) {
    res.status(401).json({ message: 'Invalid Authentication Credentials' })
    return false
  }
  return true
}

// async function getData(req, res) {
//   try {
//     const results = await search(req.query.q)
//     return res.status(200).json({ data: results })
//   } catch (err) {
//     return res.status(406).json({ message: err.message })
//   }
// }

// eslint-disable-next-line consistent-return
async function handler(req, res) {
  try {
    // if (req.method === 'GET' && req.query.q) {
    //   return await getData(req, res)
    // }
    if (!req.body && req.method != 'POST') {
      return res.status(404).json({ message: 'Unknown Operation' })
    }

    const reqBody = req.body
    if (
      reqBody.event === 'publish' &&
      (reqBody.module === 'entry' || reqBody.module === 'asset')
    ) {
      try {
        const response = await create(reqBody.data)
        return res.status(200).json({ message: response })
      } catch (err) {
        return res.status(406).json({ message: err.message })
      }
    } else if (
      (reqBody.event === 'unpublish' &&
        (reqBody.module === 'entry' || reqBody.module === 'asset')) ||
      (reqBody.event === 'delete' && reqBody.module === 'asset')
    ) {
      try {
        const response = await deleteObject(reqBody.data)
        return res.status(200).json({ message: response })
      } catch (err) {
        return res.status(406).json({ message: err.message })
      }
    }
    // else if (reqBody.event === 'delete' && reqBody.module === 'entry') {
    //   try {
    //     const response = await deleteEntryByQuery(reqBody.data)
    //     return res.status(200).json({ message: response })
    //   } catch (err) {
    //     return res.status(406).json({ message: err.message })
    //   }
    // } else if (
    //   reqBody.event === 'delete' &&
    //   reqBody.module === 'content_type'
    // ) {
    //   try {
    //     const response = await deleteByQuery(reqBody.data)
    //     return res.status(200).json({ message: response })
    //   } catch (err) {
    //     return res.status(406).json({ message: err.message })
    //   }
    // }
    else {
      return res.status(404).json({ message: 'NOT FOUND' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export default async function corsHandler(req, res) {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, async result => {
      if (result instanceof Error) {
        reject(result)
      } else {
        if (authenticate(req, res)) {
          await handler(req, res)
        }
        resolve(result)
      }
    })
  })
}
