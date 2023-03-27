import { CONFIG } from "@/config"
import { prisma } from "prisma/prisma"
import { getOrderProductByDateRange } from "../orderProducts/orderProducts"

const getProductSoldQuantity = async (
	dateFrom: Date,
	dateTo: Date,
	productId: number
) => {
	const ordersProduct = await getOrderProductByDateRange(
		dateFrom,
		dateTo,
		productId
	)

	const sumQuantity = ordersProduct.reduce(
		(previusValue, currentValue) => previusValue + currentValue.quantity,
		0
	)

	return sumQuantity
}

const getNextHotSellStartDate = async (startDate: Date, toDate: Date) => {
	const nextStarDate = await prisma.hotSellProduct.findFirst({
		where: {
			maxQuantity: {
				gt: 0,
			},
			startDate: {
				gte: startDate,
				lte: toDate,
			},
		},
		select: {
			startDate: true,
		},
	})

	return nextStarDate?.startDate
}

export const getProductById = async (productId: number) => {
	const foundProductById = await prisma.product.findUnique({
		where: { id: productId },
	})

	return foundProductById
}

export const getHotSellProduct = async () => {
	const yesterdayStartOfDay = new Date()
	yesterdayStartOfDay.setDate(new Date().getDate() - 1)
	yesterdayStartOfDay.setHours(1, 0, 0, 0)

	const dateLimitUntilNextHotSale = new Date()
	dateLimitUntilNextHotSale.setDate(
		dateLimitUntilNextHotSale.getDate() + CONFIG.DAYS_OF_SEARCH_NEXT_HOTSELL
	)

	const hotSellProduct = await prisma.hotSellProduct.findFirst({
		where: {
			maxQuantity: {
				gt: 0,
			},
			startDate: {
				gte: yesterdayStartOfDay,
			},
			expiredDate: {
				gte: new Date(),
			},
		},
	})

	if (!hotSellProduct) {
		return null
	}

	const [product, orderQuantity, nextHotSellProductStartDate] =
		await Promise.all([
			getProductById(hotSellProduct.productId),
			getProductSoldQuantity(
				hotSellProduct.addDate,
				hotSellProduct.expiredDate,
				hotSellProduct.productId
			),
			getNextHotSellStartDate(new Date(), dateLimitUntilNextHotSale),
		])

	if (!product || product.quantity < 1) {
		return null
	}

	return {
		id: hotSellProduct.productId,
		name: product.name,
		imageSrc: product.imageSrc,
		price: product.price,
		priceDiscount: product.discountPrice,
		endDateTime: hotSellProduct.expiredDate,
		orderQuantity,
		maxQuantity: hotSellProduct.maxQuantity,
		nextHotSellProductDate: nextHotSellProductStartDate,
	}
}
