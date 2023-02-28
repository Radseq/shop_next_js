import { ProductItem } from "@/components/productItem/ProductItem";
import React, { FC } from "react";
import { HotSellPanel } from "../hotSellPanel/HotSellPanel";
import styles from "./RecommendedProducts.module.css";
import { RecommendedProduct } from "./Types";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";

export const RecommendedProducts: FC<{
	recommendedProduct: RecommendedProduct[];
}> = ({ recommendedProduct }) => {
	const fetchData = async () =>
		axios.get("http://localhost:3000/api/product/hotSellProduct");

	const getHotSellProductEveryMs = 10000;

	const {
		isSuccess,
		data: request,
		isLoading,
		isError,
	} = useQuery(["getHotSell"], () => fetchData(), {
		enabled: true,
		refetchInterval: getHotSellProductEveryMs,
	});

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Cant load hot sell product</span>;
	}

	return (
		<section className={styles.recommendedProductsSection}>
			<HotSellPanel hotSellProduct={request?.data} />
			<div className={styles.recommendedProducts}>
				{recommendedProduct.map((loadedProduct) => {
					return (
						<Link
							href={`/products/${loadedProduct.id}`}
							className={styles.recommendedProduct}
							key={loadedProduct.id}
						>
							<ProductItem
								bestseller={loadedProduct.bestseller}
								freeShipping={loadedProduct.freeShipping}
								id={loadedProduct.id}
								imageSrc={loadedProduct.imageSrc}
								name={loadedProduct.name}
								price={loadedProduct.price}
								promotionPrice={loadedProduct.promotionPrice}
							/>
						</Link>
					);
				})}
			</div>
		</section>
	);
};
