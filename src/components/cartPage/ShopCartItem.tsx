import {
	decrementQuantity,
	incrementQuantity,
	removeItem,
} from "@/lib/cartSlice"
import { useCartDispatch } from "@/lib/storeCart"
import { FC, useState } from "react"
import { ShippingCartProduct } from "../cart/types"
import { DeleteIconSvg } from "../svg/DeleteIcon"
import styles from "./ShopCartItem.module.css"
import Image from "next/image"

export const ShopCartItem: FC<{ item: ShippingCartProduct }> = ({ item }) => {
	const dispatch = useCartDispatch()

	const handleDeleteProductFromCartClick = (productId: number) => {
		dispatch(removeItem(productId))
	}

	const [quantity, setQuantity] = useState(item.quantity)

	const handleQuntityChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		const inputValue = Number(e.target.value)
		if (!inputValue) return

		if (quantity > inputValue) {
			dispatch(decrementQuantity(item.id))
		} else {
			dispatch(incrementQuantity(item.id))
		}
		setQuantity(inputValue)
	}

	return (
		<div className={styles.cartItem}>
			<Image
				width="128"
				height="128"
				src={item.imageSrc}
				alt="cart product item"
			/>
			<span>{item.name}</span>
			<div className={styles.prices}>
				<del>{item.price} pln</del>
				<span>{item.discountPrice} pln</span>
			</div>
			<input
				type="number"
				onChange={handleQuntityChange}
				value={quantity}
			/>
			<button onClick={() => handleDeleteProductFromCartClick(item.id)}>
				<DeleteIconSvg />
			</button>
		</div>
	)
}
