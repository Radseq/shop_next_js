import { CONFIG } from "@/config"
import { ProductScore, Specification } from "@prisma/client"
import { prisma } from "prisma/prisma"
import { getDescriptionsByProductId } from "../descriptions/description"
import { getProductScores, sumProductVotesByScore } from "../scores/score"
import { getSpecificationsByProductId } from "../specifications/specification"

export const getProductsByIds = async (productIds: number[]) => {
	const product = await prisma.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	})

	return product
}

export const getProductKeyValueVotes = (
	productId: number,
	productScoresDb: ProductScore[]
) => {
	const votes: Record<number, number> = {}
	for (
		let scoreIndex = 0;
		scoreIndex < CONFIG.SCORES_MAX_SIZE;
		scoreIndex++
	) {
		votes[scoreIndex] = sumProductVotesByScore(
			productId,
			scoreIndex,
			productScoresDb
		)
	}
	return votes
}

const getSpecificationRecords = (
	specifications: Specification[],
	mainType: boolean = false
) => {
	const records: Record<string, string> = {}
	for (let index = 0; index < specifications.length; index++) {
		if (mainType === specifications[index].isMain) {
			records[specifications[index].name] = specifications[index].value
		}
	}
	return records
}

export const getProductById = async (productId: number) => {
	const foundProductById = await prisma.product.findUnique({
		where: { id: productId },
	})

	if (!foundProductById) return null

	const [productScoresDb, productSpecificationsDb, productDescriptionDb] =
		await Promise.all([
			getProductScores(productId),
			getSpecificationsByProductId(productId),
			getDescriptionsByProductId(productId),
		])

	const result = {
		product: foundProductById,
		specifications: {
			main: getSpecificationRecords(productSpecificationsDb, true),
			other: getSpecificationRecords(productSpecificationsDb),
		},
		descriptions: productDescriptionDb,
		scores: getProductKeyValueVotes(productId, productScoresDb),
	}

	return result
}

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
	})

	return allSearchProductsByName
}
