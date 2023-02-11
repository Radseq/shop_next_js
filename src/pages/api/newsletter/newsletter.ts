import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req

  switch (method) {
    case 'POST':
      res.status(200).json(req.body)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
