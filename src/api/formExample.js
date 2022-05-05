export default async function handler(req, res) {
  const { data } = req.query || []
  res.status(200).json(data)
}
