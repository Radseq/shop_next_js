import { CONFIG } from "@/config";
import { Specification } from "@prisma/client";
import { prisma } from "prisma/prisma";
import { getDescriptionsByProductId } from "../descriptions/description";
import {
	getProductCommentScores,
	sumProductVotesByScore,
} from "../comments/score";
import { getSpecificationsByProductId } from "../specifications/specification";

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
	productCommentsScores: {
		productId: number;
		score: number | null;
	}[]
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
			productCommentsScores
		);
	}
	return votes;
};

const getSpecificationRecords = (
	specifications: Specification[],
	mainType: boolean = false
) => {
	const records: Record<string, string> = {};
	for (let index = 0; index < specifications.length; index++) {
		if (mainType === specifications[index].isMain) {
			records[specifications[index].name] = specifications[index].value;
		}
	}
	return records;
};

export const getProductById = async (productId: number) => {
	const foundProductById = await prisma.product.findUnique({
		where: { id: productId },
	});

	if (!foundProductById) return null;

	const [
		productCommentsScores,
		productSpecificationsDb,
		productDescriptionDb,
	] = await Promise.all([
		getProductCommentScores(productId),
		getSpecificationsByProductId(productId),
		getDescriptionsByProductId(productId),
	]);

	const result = {
		product: foundProductById,
		specifications: {
			main: getSpecificationRecords(productSpecificationsDb, true),
			other: getSpecificationRecords(productSpecificationsDb),
		},
		descriptions: productDescriptionDb,
		scores: getProductKeyValueVotes(productId, productCommentsScores),
	};

	return result;
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
