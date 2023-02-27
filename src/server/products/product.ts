import { CONFIG } from "@/config";
import { ProductScore } from "@prisma/client";
import { prisma } from "prisma/prisma";
import { getDescriptionsByProductId } from "../descriptions/description";
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

	const [productScoresDb, productDescriptionDb] = await Promise.all([
		getProductScores(productId),
		getDescriptionsByProductId(productId),
	]);

	return {
		product: foundProductById,
		descriptions: productDescriptionDb,
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
