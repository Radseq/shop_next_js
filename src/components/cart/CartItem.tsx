import { FC } from "react";
import { ShippingCartProduct } from "../cart/types";
import styles from "./CartItem.module.css";
import Image from "next/image";

export const CartItem: FC<{ cartProduct: ShippingCartProduct }> = ({
	cartProduct,
}) => {
	return (
		<div className={styles.cartItem}>
			<Image
				width="256"
				height="256"
				src={cartProduct.imageSrc}
				alt="product"
			/>
			<div className={styles.itemAside}>
				<span>{cartProduct.name}</span>
				<div className={styles.cartItemCount}>
					{cartProduct.quantity}{" "}
					{cartProduct.quantity > 1 ? " items." : " item."}
				</div>
			</div>
			<div className={styles.prices}>
				{cartProduct.discountPrice && (
					<del>{cartProduct.price} pln</del>
				)}
				<span>
					{cartProduct.discountPrice ?? cartProduct.price} pln
				</span>
			</div>
		</div>
	);
};
