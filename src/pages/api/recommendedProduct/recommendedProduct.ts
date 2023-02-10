import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method } = req

    const dummyData = [
        {
            "id": 1,
            "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 RTX3050Ti 144Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/1.png",
            "price": 400,
            "vat": 23,
            "promotionPrice": 350,
            "category": {
                "freeShipping": false,
                "bestseller": false
            }
        },
        {
            "id": 2,
            "name": "Xiaomi Pad 5 6/128GB Cosmic Gray 120Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/2.png",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0,
            "category": {
                "freeShipping": true,
                "bestseller": false
            }
        },
        {
            "id": 3,
            "name": "Xiaomi Mi LED TV P1 43",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/3.png",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0,
            "category": {
                "freeShipping": false,
                "bestseller": true
            }
        },
        {
            "id": 4,
            "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 RTX3050Ti 144Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/1.png",
            "price": 400,
            "vat": 23,
            "promotionPrice": 350,
            "category": {
                "freeShipping": false,
                "bestseller": false
            }
        },
        {
            "id": 5,
            "name": "Xiaomi Pad 5 6/128GB Cosmic Gray 120Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/2.png",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0,
            "category": {
                "freeShipping": true,
                "bestseller": false
            }
        },
        {
            "id": 6,
            "name": "Xiaomi Mi LED TV P1 43",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/3.png",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0,
            "category": {
                "freeShipping": false,
                "bestseller": true
            }
        },
        {
            "id": 7,
            "name": "ASUS TUF Gaming F15 i5-11400H/16GB/512/Win11 RTX3050Ti 144Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/1.png",
            "price": 400,
            "vat": 23,
            "promotionPrice": 350,
            "category": {
                "freeShipping": false,
                "bestseller": false
            }
        },
        {
            "id": 8,
            "name": "Xiaomi Pad 5 6/128GB Cosmic Gray 120Hz",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/2.png",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0,
            "category": {
                "freeShipping": true,
                "bestseller": false
            }
        },
        {
            "id": 9,
            "name": "Xiaomi Mi LED TV P1 43",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae possimus sapiente, ducimus asperiores error eum ipsam quasi repellendus iste earum laboriosam nesciunt officiis atque rerum quos incidunt aspernatur velit voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore perferendis minus incidunt doloribus, eligendi repudiandae earum dignissimos est neque deserunt consequatur. Repudiandae autem maxime magnam eveniet! Atque, suscipit amet.",
            "imageSrc": "/products/3.png",
            "price": 200,
            "vat": 23,
            "promotionPrice": 0,
            "category": {
                "freeShipping": false,
                "bestseller": true
            }
        }
    ]

    switch (method) {
        case 'GET':
            res.status(200).json(dummyData)
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
