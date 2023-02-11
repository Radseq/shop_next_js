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
            "imageSrc": "https://cdn.x-kom.pl/i/img/promotions-list/large,,632d593e2b5e8-thumbnail-x-kom-promocje-miniatura-800x600px.jpg"
        },
        {
            "id": 2,
            "title": "Slider 2",
            "desc": "Slider 2 desc",
            "imageSrc": "https://cdn.x-kom.pl/i/img/promotions-list/large,,632c3d2cd026a-x-kom-promocje-miniatura-800x600px.jpg"
        },
        {
            "id": 3,
            "title": "Slider 3",
            "desc": "Slider 3 desc",
            "imageSrc": "https://cdn.x-kom.pl/i/img/promotions-list/large,,6318424a838b1-microsoftteams-image.png"
        },
        {
            "id": 4,
            "title": "Slider 4",
            "desc": "Slider 4 desc",
            "imageSrc": "https://cdn.x-kom.pl/i/img/promotions-list/large,,632822cb1eeae-x-kom-promocje-miniatura-800x600px.jpg"
        },
        {
            "id": 5,
            "title": "Slider 5",
            "desc": "Slider 5 desc",
            "imageSrc": "https://cdn.x-kom.pl/i/img/promotions-list/large,,632c0fe27fa44-promo.jpg"
        },
        {
            "id": 6,
            "title": "Slider 6",
            "desc": "Slider 6 desc",
            "imageSrc": "https://cdn.x-kom.pl/i/img/promotions-list/large,,632af049e7383-x-kom-promocje-miniatura-800x600px.jpg"
        },
        {
            "id": 7,
            "title": "Slider 7",
            "desc": "Slider 7 desc",
            "imageSrc": "https://cdn.x-kom.pl/i/img/promotions-list/large,,6332d335595b4-msizasilszeregipromocje.png"
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
