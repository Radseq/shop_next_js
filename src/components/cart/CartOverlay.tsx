import React, { FC } from "react";
import styles from "./CartOverlay.module.css";
import { ShippingCartProduct } from "./types";
import Link from "next/link";
import { CartFooter } from "../cartPage/CartFooter";
import { CartItem } from "./CartItem";

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
				return <CartItem key={item.id} cartProduct={item} />;
			})}

			<CartFooter cartItems={cartItems}>
				<Link href="/cart">Show cart</Link>
			</CartFooter>
		</div>
	);
};
