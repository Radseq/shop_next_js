import { removeItem } from "@/lib/cartSlice"
import { useCartDispatch } from "@/lib/storeCart"
import React, { FC } from "react"
import styles from "./CartOverlay.module.css"
import { ShippingCartProduct } from "./types"
import Image from "next/image"
import Link from "next/link"
import { CartFooter } from "../cartPage/CartFooter"

const CartItem: FC<{ product: ShippingCartProduct }> = ({ product }) => {
	const dispatch = useCartDispatch()

	const deleteProductFromCart = (productId: number) => {
		dispatch(removeItem(productId))
	}

	return (
		<div className={styles.cartItem}>
			<div className={styles.productImage}>
				<Image
					width="128"
					height="128"
					src={product.imageSrc}
					alt="product"
				/>
			</div>
			<div className={styles.itemAside}>
				<span>{product.name}</span>
				<div className={styles.asideContairner}>
					<div className={styles.cartItemCount}>
						{product.quantity}{" "}
						{product.quantity > 1 ? " items." : " item."}
					</div>
					<div className={styles.prices}>
						<del>{product.price} pln</del>
						<span>{product.discountPrice} pln</span>
					</div>
				</div>
			</div>
			<Image
				width="32"
				height="32"
				onClick={() => {
					deleteProductFromCart(product.id)
				}}
				className={styles.cartItemRemove}
				src="/images/delete.png"
				alt="delete icon"
			/>
		</div>
	)
}

export const CartOverlay: FC<{ cartItems: ShippingCartProduct[] }> = ({
	cartItems,
}) => {
	return (
		<div className={styles.cart}>
			<div className={styles.header}>
				<div>
					Cart <span>({cartItems.length})</span>
				</div>
				<Link href="/cart">Edit</Link>
			</div>
			{cartItems.map((item) => {
				return <CartItem key={item.id} product={item} />
			})}

			<CartFooter cartItems={cartItems}>
				<Link href="/cart">Show cart</Link>
			</CartFooter>
		</div>
	)
}
