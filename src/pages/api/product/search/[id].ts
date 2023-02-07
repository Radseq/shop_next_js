import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const searchKey = query.id;

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
        "imgSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_19_13_29_27_871_00.jpg",
        "score": 6.2,
        "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 sadafaf sadafafsadafafsadafaf",
        "price": 3454
      },
      {
        "id": 2,
        "imgSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_19_13_29_27_871_00.jpg",
        "score": 6.2,
        "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11",
        "price": 3454
      },
      {
        "id": 3,
        "imgSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_19_13_29_27_871_00.jpg",
        "score": 6.2,
        "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11",
        "price": 3454
      },
      {
        "id": 4,
        "imgSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_19_13_29_27_871_00.jpg",
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
