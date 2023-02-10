import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  //const searchKey = query.searchKey;

  const searchRes = {
    "productSearchResult": [
      {
        "id": 1,
        "name": "AMD Ryzen 9 7950X",
        "price": 4000
      }
    ],
    "lastSeenProducts": [
      {
        "id": 1,
        "imgSrc": "/products/3.png",
        "score": 6.2,
        "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 sadafaf sadafafsadafafsadafaf",
        "price": 3454
      },
      {
        "id": 2,
        "imgSrc": "/products/3.png",
        "score": 6.2,
        "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11",
        "price": 3454
      },
      {
        "id": 3,
        "imgSrc": "/products/3.png",
        "score": 6.2,
        "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11",
        "price": 3454
      },
      {
        "id": 4,
        "imgSrc": "/products/3.png",
        "score": 6.2,
        "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11",
        "price": 3454
      }
    ]
  };

  switch (method) {
    case 'GET':
      res.status(200).json(searchRes)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
