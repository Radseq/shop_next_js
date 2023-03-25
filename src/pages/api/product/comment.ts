import { getCacheData, setCacheData } from "@/cache";
import { getProductComments } from "@/server/comments/comment";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const POST_DATA_VERIFIER = z.object({
	productId: z.coerce.number({
		invalid_type_error: "productId must be a number",
	}),
	pageIndex: z.coerce.number({
		invalid_type_error: "pageIndex must be a number",
	}),
	pageSize: z.coerce.number({
		invalid_type_error: "pageSize must be a number",
	}),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, method } = req;

	if (method !== "GET") {
		return res
			.setHeader("Allow", ["GET"])
			.status(405)
			.end(`Method ${method} Not Allowed`);
	}

	const result = POST_DATA_VERIFIER.safeParse(query);

	if (!result.success) {
		return res.status(404).send(result.error);
	}

	const { productId, pageSize, pageIndex } = result.data;

	let cacheResult = await getCacheData("productComments" + productId);
	if (cacheResult) {
		cacheResult = JSON.parse(cacheResult);
	} else {
		cacheResult = await getProductComments(productId, pageIndex, pageSize);
		await setCacheData(
			"productComments" + productId,
			JSON.stringify(cacheResult)
		);
	}

	if (!cacheResult) {
		return res.status(404).send({
			error: `Comemnts for product id ${query.productId} not found`,
		});
	}
	return res.status(200).json(cacheResult);
};
