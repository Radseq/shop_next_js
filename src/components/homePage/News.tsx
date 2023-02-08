import React, { FC } from "react";
import { ImageSlider } from "./imageSlider/ImageSlider";
import styles from "./News.module.css";
import { ImageToSlide } from "./Types";

export const News: FC<{ advertising: ImageToSlide[] }> = ({ advertising }) => {
	return (
		<section className={styles.newsSection}>
			<ImageSlider autoSlideInSeconds={5} itemsToSlide={advertising} />
		</section>
	);
};
