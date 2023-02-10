import React, { FC } from "react";
import styles from "./ProductItem.module.css";
import Image from "next/image";

const calcPercentagePrice = (oldPrice: number, newPrice: number) => {
	return (newPrice * 100) / oldPrice;
};

type ProductHeaderProp = {
	freeShipping: boolean;
	bestseller: boolean;
	price: number;
	promotionPrice: number;
};

const ProductHeader: FC<ProductHeaderProp> = ({
	freeShipping,
	bestseller,
	promotionPrice,
	price,
}) => {
	return (
		<div className={styles.header}>
			{bestseller && (
				<span className={styles.attrBestseller}>BestSeller</span>
			)}
			{freeShipping && (
				<span className={styles.attrFreeShipping}>Free Shipping</span>
			)}
			{promotionPrice > 0 && (
				<span className={styles.attrSpecialOffer}>
					Special offer{" "}
					{(
						calcPercentagePrice(price, promotionPrice) - 100
					).toFixed()}
					%
				</span>
			)}
		</div>
	);
};

type ProductPriceProp = {
	price: number;
	promotionPrice: number;
};

const ProductPrice: FC<ProductPriceProp> = (productPrice) => {
	if (!productPrice.promotionPrice)
		return <div>{productPrice.price} pln</div>;

	return (
		<div>
			<div>
				<del className={styles.infoOldPrice}>{productPrice.price}</del>{" "}
				pln
			</div>
			<div>{productPrice.promotionPrice} pln</div>
		</div>
	);
};

type ProductItemProps = {
	id: number;
	name: string;
	imageSrc: string;
	price: number;
	promotionPrice: number;
	freeShipping: boolean;
	bestseller: boolean;
	children?: React.ReactNode;
};

export const ProductItem: FC<ProductItemProps> = (props) => {
	return (
		<div className={styles.productItem}>
			<ProductHeader
				bestseller={props.bestseller}
				freeShipping={props.freeShipping}
				price={props.price}
				promotionPrice={props.promotionPrice}
			/>
			<Image
					width="100"
					height="100"
					src={props.imageSrc}
					alt={props.name}
				/>
			<div className={styles.content}>
				<div className={styles.title}>{props.name}</div>
				{props.children}

				<ProductPrice
					price={props.price}
					promotionPrice={props.promotionPrice}
				/>
			</div>
		</div>
	);
};
