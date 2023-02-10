import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method } = req

    const dummyData = [
        {
            "id": 1,
            "title": "Weź udział w kwalifikacjach online i zagraj finał w FIFĘ 23 na Kanale Sportowym",
            "desc": "Rozegraj to po mistrzowsku z komputerem OMEN 40L.",
            "imageSrc": "/products/11.png"
        },
        {
            "id": 2,
            "title": "Slider 2",
            "desc": "Slider 2 desc",
            "imageSrc": "/products/12.png"
        },
        {
            "id": 3,
            "title": "Slider 3",
            "desc": "Slider 3 desc",
            "imageSrc": "/products/13.png"
        },
        {
            "id": 4,
            "title": "Slider 4",
            "desc": "Slider 4 desc",
            "imageSrc": "/products/14.png"
        },
        {
            "id": 5,
            "title": "Slider 5",
            "desc": "Slider 5 desc",
            "imageSrc": "/products/15.jpg"
        },
        {
            "id": 6,
            "title": "Slider 6",
            "desc": "Slider 6 desc",
            "imageSrc": "/products/16.jpg"
        },
        {
            "id": 7,
            "title": "Slider 7",
            "desc": "Slider 7 desc",
            "imageSrc": "/products/17.png"
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
