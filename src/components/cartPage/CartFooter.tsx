import React, { FC } from "react"
import classNames from "classnames"
import styles from "./CartFooter.module.css"
import { ShippingCartProduct } from "../cart/types"

export const CartFooter: FC<{
	cartItems: ShippingCartProduct[]
	children: React.ReactNode
}> = (props) => {
	const sumItemsPrice = props.cartItems.reduce(
		(prev, curr) => prev + curr.price * curr.quantity,
		0
	)

	const sumItemsPriceDiscount = props.cartItems.reduce(
		(prev, curr) => prev + curr.discountPrice * curr.quantity,
		0
	)

	return (
		<div className={styles.footer}>
			<div className={classNames(styles.cartSum, styles.cartSumDiscount)}>
				Saving
				<span>{sumItemsPrice - sumItemsPriceDiscount} pln</span>
			</div>
			<div className={styles.cartSum}>
				To pay
				<span>{sumItemsPriceDiscount} pln</span>
			</div>
			{props.children}
		</div>
	)
}
