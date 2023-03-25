import { getCacheData, setCacheData } from "@/cache";
import { getHotSellProduct } from "@/server/hotSellProduct/hotSellProduct";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	if (method !== "GET") {
		return res.status(405).end(`Method ${method} Not Allowed`);
	}

	let dataResult = await getCacheData("hotsellProduct");
	if (dataResult) {
		dataResult = JSON.parse(dataResult);
	} else {
		dataResult = await getHotSellProduct();
		if (dataResult) {
			const ttlInSeconds = 10;
			await setCacheData(
				"hotsellProduct",
				JSON.stringify(dataResult),
				ttlInSeconds
			);
		}
	}

	if (!dataResult) {
		return res.status(520).send({
			error: `No hotSell product found`,
		});
	}

	return res.status(200).send(dataResult);
};
