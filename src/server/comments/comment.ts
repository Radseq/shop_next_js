import { prisma } from "prisma/prisma";

export const addCommentToProduct = async (
	productId: number,
	commentText: string,
	productScore: number | null
) => {
	// both not working
	const addComment = await prisma.product.update({
		data: {
			productComments: {
				create: {
					comment: commentText,
					addDate: new Date(),
					avatarImgScr: "/avatar.png",
					username: "test",
					score: productScore,
				},
			},
		},
		where: {
			id: productId,
		},
	});

	/*
	const addComment = await prisma.productComment.create({
		data: {
			comment: commentText,
			addDate: new Date(),
			avatarImgScr: "/avatar.png",
			username: "test",
			product: {
				connect: {
					id: productId,
				},
			},
		},
	});
	*/

	return addComment;
};

const getProductCommentsCount = async (productId: number) => {
	const commentsCount = await prisma.productComment.count({
		where: {
			productId: productId,
		},
	});
	return commentsCount;
};

export const getProductComments = async (
	productId: number,
	pageIndex: number,
	pageSize: number
) => {
	const comments = await prisma.productComment.findMany({
		where: {
			productId: productId,
		},
		skip: pageIndex * pageSize - pageSize,
		take: pageSize,
	});

	const allCommentsCount = await getProductCommentsCount(productId);

	const commentsMapped = comments.map((comment) => {
		return {
			id: comment.id,
			username: comment.username,
			avatarImgScr: comment.avatarImgScr,
			addDate: comment.addDate.toString(),
			comment: comment.comment,
			score: comment.score,
			helpfullCommentCount: comment.helpfullCommentCount,
			unhelpfulCommentCount: comment.unhelpfulCommentCount,
			addTimeToServerTimeDiffrenceText: "",
		};
	});

	return {
		allCommentsCount,
		comments: commentsMapped,
	};
};
