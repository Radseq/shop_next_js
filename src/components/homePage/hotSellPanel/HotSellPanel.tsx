import React, { FC } from "react";
import styles from "./HotSellPanel.module.css";
import { useTimer } from "../../../hooks/useTimer";
import ProgressBar from "../../ProgressBar";
import { CurrentHotSellProduct } from "./Types";
import Image from "next/image";
import Link from "next/link";

type ProductStock = Pick<
	CurrentHotSellProduct,
	"maxQuantity" | "orderQuantity"
>;

const isSoldOut = (product: ProductStock) =>
	product.maxQuantity <= product.orderQuantity;

const HotSellProgressBar: FC<{ product: ProductStock }> = ({ product }) => {
	if (isSoldOut(product)) {
		return <span className={styles.hotSellMessage}>Sold out!</span>;
	}
	return (
		<div className={styles.sellProgressBar}>
			<div className={styles.sellProgressDesc}>
				<div className={styles.ordered}>
					Left{" "}
					<span>{product.maxQuantity - product.orderQuantity}</span>
				</div>
				<div className={styles.sold}>
					Sold <span>{product.orderQuantity}</span>
				</div>
			</div>
			<ProgressBar
				endValue={product.maxQuantity + product.orderQuantity}
				startValue={product.orderQuantity}
			/>
		</div>
	);
};

type HotSellTimerProps = {
	hours: number;
	minutes: number;
	seconds: number;
	product: ProductStock;
};

const HotSellTimer: FC<HotSellTimerProps> = (props) => {
	return (
		<div className={styles.hotSellTimer}>
			<span>
				{isSoldOut(props.product)
					? "Next sell out"
					: "Hurry up, hot sell end in"}
				:
			</span>
			<div className={styles.clockBox}>
				<div className={styles.timeBox}>
					<div className={styles.timeBoxNumeric}>{props.hours}</div>
					<span>hour</span>
				</div>
				<span>:</span>
				<div className={styles.timeBox}>
					<div className={styles.timeBoxNumeric}>{props.minutes}</div>
					<span>min.</span>
				</div>
				<span>:</span>
				<div className={styles.timeBox}>
					<div className={styles.timeBoxNumeric}>{props.seconds}</div>
					<span>sec.</span>
				</div>
			</div>
		</div>
	);
};

export const HotSellPanel: FC<{ hotSellProduct: CurrentHotSellProduct }> = ({
	hotSellProduct,
}) => {
	const endDateTime = Date.parse(hotSellProduct.endDateTime) ?? 0;
	const timer = useTimer(endDateTime);

	const productSumPrice = hotSellProduct.price - hotSellProduct.priceDiscount;

	if (timer.type === "Finished") {
		return null;
	}

	return (
		<div className={styles.hotSell}>
			<Link href="/">
				<div className={styles.title}>
					<h1>Hot sell</h1>
				</div>
				<Image
					width="200"
					height="200"
					src={hotSellProduct.imageSrc}
					alt={hotSellProduct.name}
				/>
				{hotSellProduct.priceDiscount && (
					<div className={styles.savesPanel}>
						<span>Save</span>
						<b>
							<span>{hotSellProduct.priceDiscount} pln</span>
						</b>
					</div>
				)}
				<span className={styles.productTitle}>
					{hotSellProduct.name}
				</span>
				{hotSellProduct.priceDiscount && (
					<del className={styles.productPrice}>
						{hotSellProduct.price} pln
					</del>
				)}
				<span className={styles.productPriceAfterDiscount}>
					{productSumPrice} pln
				</span>
				<HotSellProgressBar product={hotSellProduct} />
				<HotSellTimer
					product={hotSellProduct}
					hours={timer.hours}
					minutes={timer.minutes}
					seconds={timer.seconds}
				/>
			</Link>
		</div>
	);
};
