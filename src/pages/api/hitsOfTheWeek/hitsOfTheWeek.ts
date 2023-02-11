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
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2022/6/pr_2022_6_23_10_10_25_792_00.jpg",
            "price": 700,
            "promotionPrice": 650
        },
        {
            "id": 2,
            "name": "AMD Ryzen 5 5600X",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2020/10/pr_2020_10_9_12_59_29_839_00.jpg",
            "price": 1100
        },
        {
            "id": 3,
            "name": "Xiaomi Mi TV Q1E 55",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2021/12/pr_2021_12_22_13_27_15_690_00.jpg",
            "price": 3500
        },
        {
            "id": 4,
            "name": "be quiet! Pure Base 500DX White",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2020/4/pr_2020_4_23_12_3_59_38_06.jpg",
            "price": 567
        },
        {
            "id": 5,
            "name": "Intel Core i5‑11400F",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/3/pr_2021_3_16_17_21_50_504_00.jpg",
            "price": 770,
            "promotionPrice": 700
        },
        {
            "id": 6,
            "name": "Thermal Grizzly Kryonaut 1g",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2017/12/pr_2017_12_6_8_20_22_823_00.jpg",
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
