import { CONFIG } from "@/config"
import { getOrderProductsByDate } from "../orderProducts/orderProducts"
import { getProductsByIds } from "../products/product"

export const getMostSoldProductsByDate = async (date: Date) => {
	const orderProducts = await getOrderProductsByDate(date)

	if (orderProducts.length === 0) {
		return null
	}

	// create Map with product id and product sold count
	const productIdSoldCountMap = new Map(
		orderProducts.map((orderProduct) => [
			orderProduct.productId,
			orderProducts.filter(
				(filterProduct) =>
					filterProduct.productId === orderProduct.productId
			).length,
		])
	)

	// get product id array of sorted map by product sold count desc
	const getProductsIdsOfSortMap = [...productIdSoldCountMap.entries()]
		.sort((a, b) => b[1] - a[1])
		.map((keyValue) => keyValue[0])

	const sliceProductsIds = getProductsIdsOfSortMap.slice(
		0,
		CONFIG.MAX_BESTSELLS_PRODUCTS
	)

	const products = await getProductsByIds(sliceProductsIds as number[])

	return products
}

export const getAllBestsellerProducts = async () => {
	const bestsellerMonthsPriorToToday = new Date()
	bestsellerMonthsPriorToToday.setMonth(
		bestsellerMonthsPriorToToday.getMonth() -
			CONFIG.LAST_MONTHS_PRODUCTS_IN_ORDER
	)

	return await getMostSoldProductsByDate(bestsellerMonthsPriorToToday)
}
