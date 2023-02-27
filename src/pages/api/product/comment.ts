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

	switch (method) {
		case "GET":
			const result = POST_DATA_VERIFIER.safeParse(query);

			if (!result.success) {
				return res.status(404).send(result.error);
			}

			const { productId, pageSize, pageIndex } = result.data;

			const comments = await getProductComments(
				productId,
				pageIndex,
				pageSize
			);

			if (!comments) {
				return res.status(404).send({
					error: `Comemnts for product id ${query.productId} not found`,
				});
			}
			return res.status(200).json(comments);
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
