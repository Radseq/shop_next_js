import React, { FC } from "react";
import { ProductItem } from "../../productItem/ProductItem";
import styles from "./BestSellers.module.css";
import { BestsellerProduct } from "./Types";
import Link from "next/link";

export const BestSellers: FC<{ products: BestsellerProduct[] }> = ({
	products,
}) => {
	return (
		<section className={styles.bestsellersSection}>
			{products.map((bestseller) => {
				return (
					<Link
						href={`/products/${bestseller.id}`}
						className={styles.bestsellerProduct}
						key={bestseller.id}
					>
						<ProductItem
							bestseller={false}
							freeShipping={false}
							id={bestseller.id}
							imageSrc={bestseller.imageSrc}
							name={bestseller.name}
							price={bestseller.price}
							promotionPrice={bestseller.promotionPrice}
						/>
					</Link>
				);
			})}
		</section>
	);
};
