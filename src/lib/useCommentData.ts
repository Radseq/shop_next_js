import { ProductCommentRequest } from "@/components/productPage/Types";

import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetchProductComments = async (
	productId: number,
	pageIndex: number,
	pageSize: number
) => {
	const response = await axios.get(
		`http://localhost:3000/api/product/comment`,
		{
			params: {
				productId,
				pageIndex,
				pageSize,
			},
		}
	);
	return response.data;
};

export const useProductCommentData = (
	productId: number,
	pageIndex: number,
	pageSize: number
) => {
	return useQuery("comments", () =>
		fetchProductComments(productId, pageIndex, pageSize)
	);
};
