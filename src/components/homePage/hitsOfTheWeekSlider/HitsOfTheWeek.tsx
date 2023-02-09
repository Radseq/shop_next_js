import { useWindowSize } from "@/hooks/useWindowSize";
import React, { FC, useEffect, useState } from "react";
import { useMutipleItemsSlider } from "../../../hooks/useMutipleItemsSlider";
import { ProductItem } from "../../productItem/ProductItem";
import styles from "./HitsOfTheWeek.module.css";
import { HitOfWeekProduct } from "./Types";

const HitsOfTheWeekSlider: FC<{
	products: HitOfWeekProduct[];
	productsPerSlider: number;
}> = ({ products, productsPerSlider }) => {
	const [itemsPerSlide, setItemsPerSlide] = useState(productsPerSlider);

	const [width] = useWindowSize();

	// decrease/increase itemsPerSlide by screen width
	useEffect(() => {
		const minSliderItemWidthInPx = 220;
		const itemsPerWidth = Math.floor(width / minSliderItemWidthInPx);

		setItemsPerSlide(
			width && itemsPerWidth <= productsPerSlider
				? itemsPerWidth
				: productsPerSlider
		);
	}, [width, productsPerSlider]);

	const promotionSlider = useMutipleItemsSlider<HitOfWeekProduct>(
		products,
		itemsPerSlide
	);

	return (
		<div className={styles.hitsOfTheWeekSlider}>
			<div
				className={styles.prev}
				onClick={promotionSlider.previousSlide}
			>
				❮
			</div>
			{promotionSlider.currentPromotions.map((product) => {
				return (
					<a href={`/Product/${product.id}`} key={product.id}>
						<ProductItem
							id={product.id}
							imageSrc={product.imageSrc}
							name={product.name}
							price={product.price}
							promotionPrice={product.promotionPrice ?? 0}
							bestseller={false}
							freeShipping={false}
						/>
					</a>
				);
			})}
			<div className={styles.next} onClick={promotionSlider.nextSlide}>
				❯
			</div>
		</div>
	);
};

export const HitsOfTheWeek: FC<{ hitsOfTheWeek: HitOfWeekProduct[] }> = ({
	hitsOfTheWeek,
}) => {
	return (
		<section className={styles.hitsOfTheWeek}>
			<HitsOfTheWeekSlider
				products={hitsOfTheWeek}
				productsPerSlider={4}
			/>
		</section>
	);
};
