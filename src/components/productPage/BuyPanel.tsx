import { FC, useState } from "react"
import styles from "./BuyPanel.module.css"
import { Product } from "./Types"
import { StyledInput } from "../StyledInput"
import { useCartDispatch } from "@/lib/storeCart"
import { addToCart } from "@/lib/cartSlice"
import { StyledButton } from "../StyledButton"
import Image from "next/image"
import Link from "next/link"

const AvailableProductItem: FC<{ quantity: number; productId: number }> = ({
	quantity,
	productId,
}) => {
	if (quantity) {
		return (
			<div className={styles.item}>
				<span className={styles.ok}>Avaiable</span>
				<span>
					<Link href={"/available/" + productId}> Find out more</Link>
				</span>
			</div>
		)
	} else
		return (
			<div className={styles.item}>
				<span className={styles.error}>Inaccessible</span>
				<span>
					<Link href="/inaccessible/1"> Find out more</Link>
				</span>
			</div>
		)
}

const DeliveryItem: FC<{ hasFreeDelivery: boolean }> = ({
	hasFreeDelivery,
}) => {
	if (hasFreeDelivery) {
		return (
			<div className={styles.item}>
				<span className={styles.ok}>Free Delivery</span>
				<span>
					<Link href={"/deliveryfree"}> Find out more</Link>
				</span>
			</div>
		)
	} else {
		return (
			<div className={styles.item}>
				<span>Free pickup in the shop</span>
				<span>
					<Link href={"/delivery"}> Find out more</Link>
				</span>
			</div>
		)
	}
}

const LoanInstallmentItemDetailRow: FC<{
	installmentPrice: number
	productId: number
}> = ({ installmentPrice, productId }) => {
	return (
		<div className={styles.detailRow}>
			<Image
				width="32"
				height="32"
				src={"/images/payment-icon.png"}
				alt="icon"
			/>
			<div className={styles.item}>
				<span>Installment only {installmentPrice} PLN</span>
				<span>
					<Link href={"/installment/" + productId}>
						Calculate loan rate
					</Link>
				</span>
			</div>
		</div>
	)
}

const Price: FC<{ discountPrice: number; price: number }> = ({
	discountPrice,
	price,
}) => {
	if (discountPrice) {
		return (
			<div>
				<span>Save {price - discountPrice} pln</span>
				<div className={styles.totalPrice}>
					<del>{price} pln </del>
					<h2>{discountPrice} pln</h2>
				</div>
			</div>
		)
	}
	return (
		<div>
			<div className={styles.totalPrice}>
				<h2>{price} pln</h2>
			</div>
		</div>
	)
}

export const BuyPanel: FC<{ purchasedProduct: Product }> = ({
	purchasedProduct,
}) => {
	const [quantity, setQuantity] = useState(1)
	const dispatch = useCartDispatch()

	const onAddToCartBtnClick = (product: Product) => {
		dispatch(
			addToCart({
				id: product.id,
				imageSrc: product.imageSrc,
				name: product.name,
				price: product.price,
				discountPrice: product.discountPrice,
				quantity: quantity,
			})
		)
	}

	const onQuntityChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const inputValue = Number(e.target.value)
		setQuantity(inputValue > 0 ? inputValue : 1)
	}

	return (
		<div className={styles.buyPanel}>
			<Price
				discountPrice={purchasedProduct.discountPrice}
				price={purchasedProduct.price}
			/>
			<div className={styles.addToCart}>
				<StyledButton
					onClick={() => onAddToCartBtnClick(purchasedProduct)}
					kind="primary"
				>
					Add to cart
				</StyledButton>
				<StyledInput
					type="number"
					value={quantity}
					onChange={onQuntityChange}
					kind="primary"
				/>
			</div>
			<div className={styles.details}>
				<hr />
				<div className={styles.detailRow}>
					<Image
						width="32"
						height="32"
						src={"/images/check-mark.png"}
						alt="icon"
					/>
					<AvailableProductItem
						quantity={purchasedProduct.quantity}
						productId={purchasedProduct.id}
					/>
				</div>
				<hr />
				<div className={styles.detailRow}>
					<Image
						width="32"
						height="32"
						src={"/images/clock-icon.png"}
						alt="icon"
					/>
					<div className={styles.item}>
						<span>Buy now, receive day after tomorrow</span>
						<span>
							<Link href={"/receiveday/" + purchasedProduct.id}>
								Find out more
							</Link>
						</span>
					</div>
				</div>
				<hr />
				<div className={styles.detailRow}>
					<Image
						// className={}
						width="32"
						height="32"
						src={"/images/delivery-icon.png"}
						alt="icon"
					/>
					<DeliveryItem
						hasFreeDelivery={purchasedProduct.freeDelivery}
					/>
				</div>
				<hr />
				{purchasedProduct.installmentPrice && (
					<LoanInstallmentItemDetailRow
						installmentPrice={purchasedProduct.installmentPrice}
						productId={purchasedProduct.id}
					/>
				)}
			</div>
		</div>
	)
}
