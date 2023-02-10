import React, { useState } from "react";

import styles from "./TopBar.module.css";
import { StyledInput } from "../StyledInput";
import { Icon } from "../Icon";
import { useCartSelector } from "@/lib/storeCart";
import { CartOverlay } from "../cart/CartOverlay";
import { SearchedProducts } from "./SearchedProducts";
import classNames from "classnames";
import Link from "next/link";

export const TopBar = () => {
	const shoppingCart = useCartSelector((state) => state.shoppingCart);

	const [searchIsFocused, setSearchIsFocused] = useState(false);
	const [searchedText, setSearchedText] = useState("");

	const inputSearchChange = (searchText: string) => {
		setSearchIsFocused(true);
		setSearchedText(searchText);
	};

	return (
		<div className={styles.topBar}>
			<Link href="/">
				<Icon kind="shop" />
			</Link>

			<div className={styles.search}>
				<StyledInput
					kind="primary"
					type={"text"}
					onChange={(input) => {
						inputSearchChange(input.currentTarget.value);
					}}
					value={searchedText}
					placeholder="search"
					onClick={() => setSearchIsFocused(true)}
				></StyledInput>
				{searchIsFocused && searchedText && (
					<div className={styles.searchOverlay}>
						<SearchedProducts
							search={searchedText}
							callback={() => setSearchIsFocused(false)}
						/>
					</div>
				)}
			</div>

			<a href="/help-center" className={styles.icon}>
				<Icon kind="help" />
				<span>Help</span>
			</a>

			<div className={classNames(styles.icon, styles.cardInfo)}>
				<a href="/cart">
					<Icon kind="cart" />
				</a>
				<span>{shoppingCart.length}</span>
				<div className={styles.cartOverlay}>
					{shoppingCart.length !== 0 ? (
						<CartOverlay cartItems={shoppingCart} />
					) : (
						<div className={styles.emptyCard}>
							Shipping cart is empty
						</div>
					)}
				</div>
			</div>

			<a href="/account" className={styles.icon}>
				<Icon kind="account" />
				<span>Account</span>
			</a>
		</div>
	);
};
