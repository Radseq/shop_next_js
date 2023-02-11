import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method } = req

    const timeToEnd = new Date();
    timeToEnd.setDate(new Date().getDate() + 1);
    timeToEnd.setHours(10, 0, 0, 0);

    const dummyData = {
        "id": 1,
        "name": "Slider 1",
        "imageSrc": "/advertisement/adv2.jpg",
        "price": 2000,
        "priceDiscount": 300,
        "endDateTime": timeToEnd.getTime(),
        "orderQuantity": 2,
        "maxQuantity": 10
    }

    switch (method) {
        case 'GET':
            res.status(200).json(dummyData)
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
