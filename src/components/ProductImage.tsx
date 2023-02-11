import React, { FC } from "react";
import styles from "./ProductImage.module.css";

type ProductImageProps = {
	title: string;
	desc: string;
	imageSrc: string;
};

export const ProductImage: FC<ProductImageProps> = (props) => {
	return (
		<div className={styles.productBasicContainer}>
			<img src={props.imageSrc} alt={props.title} />
			<div className={styles.productBasicTitle}>{props.title}</div>
			<div className={styles.productBasicDescription}>{props.desc}</div>
		</div>
	);
};
