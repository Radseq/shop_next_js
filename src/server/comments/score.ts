import { prisma } from "prisma/prisma";

export const getProductCommentScores = async (productId: number) => {
	const allProductCommentScores = await prisma.productComment.findMany({
		where: {
			productId: productId,
			NOT: {
				score: null,
			},
		},
		select: {
			score: true,
			productId: true,
		},
	});

	return allProductCommentScores;
};

export const sumProductVotesByScore = (
	productId: number,
	scoreIndex: number,
	productCommentScores: {
		productId: number;
		score: number | null;
	}[]
) => {
	return productCommentScores.filter(
		(commentScore) =>
			commentScore.score == scoreIndex &&
			commentScore.productId == productId
	).length;
};
