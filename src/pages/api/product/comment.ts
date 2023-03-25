import { getCacheData, setCacheData } from "@/cache";
import { CONFIG } from "@/config";
import {
	addCommentToProduct,
	getProductComments,
} from "@/server/comments/comment";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const GET_DATA_VERIFIER = z.object({
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

const POST_DATA_VERIFIER = z.object({
	productId: z.coerce.number({
		invalid_type_error: "productId must be a number",
	}),
	commentText: z.coerce.string({
		invalid_type_error: "commentText must be a string",
	}),
	productScore: z.nullable(
		z.coerce
			.number({
				invalid_type_error: "score must be a number",
			})
			.max(CONFIG.SCORES_MAX_SIZE)
	),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, method } = req;

	switch (method) {
		case "GET": {
			const result = GET_DATA_VERIFIER.safeParse(query);

			if (!result.success) {
				return res.status(404).send(result.error);
			}

			const { productId, pageSize, pageIndex } = result.data;

			let cacheResult = await getCacheData("productComments" + productId);
			if (cacheResult) {
				cacheResult = JSON.parse(cacheResult);
			} else {
				cacheResult = await getProductComments(
					productId,
					pageIndex,
					pageSize
				);
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
		}
		case "POST": {
			const result = POST_DATA_VERIFIER.safeParse(
				JSON.parse(JSON.stringify(req.body))
			);

			if (!result.success) {
				return res.status(404).send(result.error);
			}

			const addedComment = await addCommentToProduct(
				result.data.productId,
				result.data.commentText,
				result.data.productScore
			);

			if (addedComment) return res.status(200).send("success");
			return res.status(500).send("error");
		}
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
