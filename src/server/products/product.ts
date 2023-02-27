import { prisma } from "prisma/prisma";

export const getAllProducts = async () => {
	const allProducts = await prisma.product.findMany();

	return allProducts;
};

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
