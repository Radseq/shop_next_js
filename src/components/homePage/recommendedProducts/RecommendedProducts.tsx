import { ProductItem } from "@/components/productItem/ProductItem";
import React, { FC } from "react";
import { HotSellPanel } from "../hotSellPanel/HotSellPanel";
import styles from "./RecommendedProducts.module.css";
import { RecommendedProduct } from "./Types";
import Link from "next/link";

export const RecommendedProducts: FC<{
	recommendedProduct: RecommendedProduct[];
}> = ({ recommendedProduct }) => {
	return (
		<section className={styles.recommendedProductsSection}>
			<HotSellPanel />
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
