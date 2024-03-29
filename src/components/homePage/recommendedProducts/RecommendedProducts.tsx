import { ProductItem } from "@/components/productItem/ProductItem";
import React, { FC } from "react";
import { HotSellPanel } from "../hotSellPanel/HotSellPanel";
import styles from "./RecommendedProducts.module.css";
import { RecommendedProduct } from "./Types";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";

const fetchData = async () =>
	axios.get("http://localhost:3000/api/product/hotSellProduct");

export const RecommendedProducts: FC<{
	recommendedProduct: RecommendedProduct[];
}> = ({ recommendedProduct }) => {
	const getHotSellProductEveryMs = 10000;

	const { data: request } = useQuery(["getHotSell"], () => fetchData(), {
		enabled: true,
		refetchInterval: getHotSellProductEveryMs,
	});

	return (
		<section className={styles.recommendedProductsSection}>
			{request && <HotSellPanel hotSellProduct={request?.data} />}

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
