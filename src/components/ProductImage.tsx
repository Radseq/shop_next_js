import React, { FC } from "react";
import styles from "./ProductImage.module.css";
import Image from "next/image";

type ProductImageProps = {
	title: string;
	desc: string;
	imageSrc: string;
};

export const ProductImage: FC<ProductImageProps> = (props) => {
	return (
		<div className={styles.productBasicContainer}>
			<Image
				src={props.imageSrc}
				alt={props.title}
				width="255"
				height="150"
			/>
			
			<div className={styles.productBasicTitle}>{props.title}</div>
			<div className={styles.productBasicDescription}>{props.desc}</div>
		</div>
	);
};
