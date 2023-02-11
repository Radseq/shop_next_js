import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method } = req

    const dummyAata = [
        {
            "id": 1,
            "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 RTX3050Ti 144Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/5/pr_2022_5_24_11_7_54_334_00.jpg",
            "price": 400,
            "vat": 23,
            "promotionPrice": 350
        },
        {
            "id": 2,
            "name": "Xiaomi Pad 5 6/128GB Cosmic Gray 120Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_4_12_5_6_583_02.jpg",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0
        },
        {
            "id": 3,
            "name": "Xiaomi Mi LED TV P1 43",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_19_13_29_27_871_00.jpg",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0
        },
        {
            "id": 4,
            "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 RTX3050Ti 144Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/5/pr_2022_5_24_11_7_54_334_00.jpg",
            "price": 400,
            "vat": 23,
            "promotionPrice": 350
        },
        {
            "id": 5,
            "name": "Xiaomi Pad 5 6/128GB Cosmic Gray 120Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_4_12_5_6_583_02.jpg",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0
        },
        {
            "id": 6,
            "name": "Xiaomi Mi LED TV P1 43",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_19_13_29_27_871_00.jpg",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0
        },
        {
            "id": 7,
            "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 RTX3050Ti 144Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/5/pr_2022_5_24_11_7_54_334_00.jpg",
            "price": 400,
            "vat": 23,
            "promotionPrice": 350
        },
        {
            "id": 8,
            "name": "Xiaomi Pad 5 6/128GB Cosmic Gray 120Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_4_12_5_6_583_02.jpg",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0
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
