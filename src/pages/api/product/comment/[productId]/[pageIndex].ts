import type { NextApiRequest, NextApiResponse } from 'next'

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method } = req
    const productId = query.productId;
    const pageIndex = query.pageIndex;

    console.log('productId: ', productId, ' pageIndex: ', pageIndex)

    const dummyData = {
        "pageSize": 15,
        "pageIndex": 1,
        "allCommentsCount": 245,
        "comments": [
            {
                "id": 1,
                "username": "Max",
                "avatarImgScr": "avatar.png",
                "addDate": "01.10.2022",
                "commentText": "Lorem ipsum dolor sit amet. Aut officia illum in iste dolores sit possimus corporis qui excepturi accusantium. Qui commodi optio est harum odio et esse omnis est beatae laboriosam non voluptate ratione qui ipsum explicabo? Est nobis quia et modi molestiae qui sint dolorum et maiores esse?Aut fuga temporibus aut enim aliquam vel recusandae deserunt in porro ipsam aut voluptatibus officia qui possimus nesciunt sed illum perspiciatis. Et quia minima aut voluptatem corporis est voluptatum sunt. In dolor error et error eaque et officiis quam et Quis cumque qui tempora sint est dicta tempora ut accusamus aspernatur. Aut nesciunt mollitia vero quidem aut esse doloremque ut illum laboriosam et voluptatibus laudantium non dolorem libero! Et accusamus pariatur in sunt quas qui fuga necessitatibus est asperiores illum. Eos ducimus expedita aut odio aliquid aut temporibus vero et illum quaerat est quisquam quia id deserunt asperiores id error harum! Et odio eveniet vel suscipit molestias aut nihil dolore et quasi nihil et dolorem voluptas.",
                "score": 8,
                "helpfullCommentCount": 22,
                "unhelpfulCommentCount": 5,
                "addTimeToServerTimeDiffrenceText": "17 day's ago"
            },
            {
                "id": 2,
                "username": "Juan",
                "avatarImgScr": "avatar.png",
                "addDate": "18.03.2022",
                "commentText": "Lorem ipsum dolor sit amet. Aut officia illum in iste dolores sit possimus corporis qui excepturi accusantium. Qui commodi optio est harum odio et esse omnis est beatae laboriosam non voluptate ratione qui ipsum explicabo? Est nobis quia et modi molestiae qui sint dolorum et maiores esse?Aut fuga temporibus aut enim aliquam vel recusandae deserunt in porro ipsam aut voluptatibus officia qui possimus nesciunt sed illum perspiciatis. Et quia minima aut voluptatem corporis est voluptatum sunt. In dolor error et error eaque et officiis quam et Quis cumque qui tempora sint est dicta tempora ut accusamus aspernatur. Aut nesciunt mollitia vero quidem aut esse doloremque ut illum laboriosam et voluptatibus laudantium non dolorem libero! Et accusamus pariatur in sunt quas qui fuga necessitatibus est asperiores illum. Eos ducimus expedita aut odio aliquid aut temporibus vero et illum quaerat est quisquam quia id deserunt asperiores id error harum! Et odio eveniet vel suscipit molestias aut nihil dolore et quasi nihil et dolorem voluptas.",
                "score": 6,
                "helpfullCommentCount": 67,
                "unhelpfulCommentCount": 12,
                "addTimeToServerTimeDiffrenceText": "7 month's ago"
            }
        ]
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
