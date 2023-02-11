import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method } = req

    const dummyAata = [
        {
            "id": 1,
            "name": "Slider 1",
            "desc": "Slider 1 desc",
            "imageSrc": "https://www.w3schools.com/howto/img_nature_wide.jpg"
        },
        {
            "id": 2,
            "name": "Slider 2",
            "desc": "Slider 2 desc",
            "imageSrc": "https://www.w3schools.com/howto/img_snow_wide.jpg"
        },
        {
            "id": 3,
            "name": "Slider 3",
            "desc": "Slider 3 desc",
            "imageSrc": "https://www.w3schools.com/howto/img_mountains_wide.jpg"
        }
    ];

    switch (method) {
        case 'GET':
            res.status(200).json(dummyAata)
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
