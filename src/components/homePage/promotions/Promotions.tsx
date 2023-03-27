import { ProductImage } from "@/components/ProductImage"
import React, { FC } from "react"
import { useMutipleItemsSlider } from "../../../hooks/useMutipleItemsSlider"
import styles from "./Promotions.module.css"
import { Promotion } from "./Types"
import Link from "next/link"

const PromotionSlider: FC<{
	promotions: Promotion[]
	promotionsPerSlider: number
}> = ({ promotions, promotionsPerSlider }) => {
	const promotionSlider = useMutipleItemsSlider<Promotion>(
		promotions,
		promotionsPerSlider
	)

	return (
		<div className={styles.productBasicSlider}>
			<div
				className={styles.prev}
				onClick={promotionSlider.previousSlide}
			>
				❮
			</div>
			<div className={styles.sliderImagesContainer}>
				{promotionSlider.currentPromotions.map((promotion) => {
					return (
						<Link
							href={`/products/${promotion.id}`}
							key={promotion.id}
						>
							<ProductImage
								desc={promotion.desc}
								imageSrc={promotion.imageSrc}
								title={promotion.title}
							/>
						</Link>
					)
				})}
			</div>
			<div className={styles.next} onClick={promotionSlider.nextSlide}>
				❯
			</div>
		</div>
	)
}

export const Promotions: FC<{ promotionsData: Promotion[] }> = ({
	promotionsData: promotions,
}) => {
	return (
		<section className={styles.promotions}>
			<PromotionSlider promotions={promotions} promotionsPerSlider={4} />
		</section>
	)
}
