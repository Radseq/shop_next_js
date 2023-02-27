import { CONFIG } from "@/config";
import { prisma } from "prisma/prisma";
import { getProductScores, sumProductVotesByScore } from "../scores/score";

export const getProductsByIds = async (productIds: number[]) => {
	const product = await prisma.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	});

	return product;
};

export const getProductKeyValueVotes = (
	productId: number,
	productScoresDb: ProductScore[]
) => {
	const votes: Record<number, number> = {};
	for (
		let scoreIndex = 0;
		scoreIndex < CONFIG.SCORES_MAX_SIZE;
		scoreIndex++
	) {
		votes[scoreIndex] = sumProductVotesByScore(
			productId,
			scoreIndex,
			productScoresDb
		);
	}
	return votes;
};

export const getProductById = async (productId: number) => {
	const foundProductById = await prisma.product.findUnique({
		where: { id: productId },
	});

	if (!foundProductById) return null;

	const commentPageIndex = 1;

	const [
		productScoresDb,
	] = await Promise.all([
		getProductScores(productId),
	]);

	return {
		product: foundProductById,
		scores: getProductKeyValueVotes(productId, productScoresDb),
	};
};

export const getProductsByName = async (productName: string) => {
	const allSearchProductsByName = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			price: true,
		},
		where: {
			name: {
				contains: productName,
			},
		},
		take: CONFIG.MAX_SEARCH_RESULT,
	});

	return allSearchProductsByName;
};
