import { ProductItem } from "@/components/productItem/ProductItem";
import React, { FC, useEffect, useState } from "react";
import { HotSellPanel } from "../hotSellPanel/HotSellPanel";
import styles from "./RecommendedProducts.module.css";
import { RecommendedProduct } from "./Types";

export const RecommendedProducts: FC<{
	recommendedProduct: RecommendedProduct[];
}> = ({ recommendedProduct }) => {
	return (
		<section className={styles.recommendedProductsSection}>
			<HotSellPanel />
			<div className={styles.recommendedProducts}>
				{recommendedProduct.map((loadedProduct) => {
					return (
						<a
							href={`/Product/${loadedProduct.id}`}
							className={styles.recommendedProduct}
							key={loadedProduct.id}
						>
							<ProductItem
								bestseller={loadedProduct.category.bestseller}
								freeShipping={
									loadedProduct.category.freeShipping
								}
								id={loadedProduct.id}
								imageSrc={loadedProduct.imageSrc}
								name={loadedProduct.name}
								price={loadedProduct.price}
								promotionPrice={loadedProduct.promotionPrice}
							/>
						</a>
					);
				})}
			</div>
		</section>
	);
};
