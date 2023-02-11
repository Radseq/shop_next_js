import { useAutoSlider } from "@/hooks/useAutoSlider";
import React, { FC, useMemo } from "react";
import { ImageToSlide } from "../Types";
import styles from "./ImageSlider.module.css";

export const ImageSlider: FC<{
	autoSlideInSeconds: number;
	itemsToSlide: ImageToSlide[];
}> = (props) => {
	const slider = useAutoSlider(
		props.itemsToSlide.length,
		props.autoSlideInSeconds * 1000
	);
	const selectedImage = useMemo(
		() => props.itemsToSlide[slider.currentIndex],
		[props.itemsToSlide, slider.currentIndex]
	);

	return (
		<div className={styles.slides}>
			<div className={styles.slidesBody}>
				{selectedImage && (
					<div className={`${styles.slider} ${styles.fade}`}>
						<div className={styles.numberOfSliderInfo}>
							{slider.currentIndex + 1} /{" "}
							{props.itemsToSlide.length}
						</div>
						<img
							src={selectedImage.imageSrc}
							alt={selectedImage.name}
						/>
						<div className={styles.sliderText}>
							{selectedImage.desc}
						</div>
					</div>
				)}
				<div
					className={styles.prevSlider}
					onClick={slider.previousSlide}
				>
					❮
				</div>
				<div className={styles.nextSlider} onClick={slider.nextSlide}>
					❯
				</div>
			</div>
			<div className={styles.sliderFooter}>
				{props.itemsToSlide.map((itemSlide, index) => (
					<div
						onClick={() => slider.setIndex(index)}
						key={index}
						className={`${styles.sliderTab} ${
							index === slider.currentIndex
								? styles.selected
								: styles.unSelected
						}`}
					>
						<span>{itemSlide.desc}</span>
					</div>
				))}
			</div>
		</div>
	);
};
