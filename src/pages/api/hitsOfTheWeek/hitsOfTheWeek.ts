import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method } = req

    const dummyAata = [
        {
            "id": 1,
            "name": "Xiaomi Redmi 9C NFC 3/64GB Aurora Green",
            "imageSrc": "/products/4.png",
            "price": 700,
            "promotionPrice": 650
        },
        {
            "id": 2,
            "name": "AMD Ryzen 5 5600X",
            "imageSrc": "/products/5.png",
            "price": 1100
        },
        {
            "id": 3,
            "name": "Xiaomi Mi TV Q1E 55",
            "imageSrc": "/products/6.png",
            "price": 3500
        },
        {
            "id": 4,
            "name": "be quiet! Pure Base 500DX White",
            "imageSrc": "/products/7.png",
            "price": 567
        },
        {
            "id": 5,
            "name": "Intel Core i5‑11400F",
            "imageSrc": "/products/8.png",
            "price": 770,
            "promotionPrice": 700
        },
        {
            "id": 6,
            "name": "Thermal Grizzly Kryonaut 1g",
            "imageSrc": "/products/9.png",
            "price": 51,
            "promotionPrice": 41
        }
    ]
    switch (method) {
        case 'GET':
            res.status(200).json(dummyAata)
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
