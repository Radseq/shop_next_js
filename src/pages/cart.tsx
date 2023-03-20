import { CartFooter } from "@/components/cartPage/CartFooter";
import { PromotionCodePanel } from "@/components/cartPage/PromotionCodePanel";
import { ShopCartItem } from "@/components/cartPage/ShopCartItem";
import { RootNavigation } from "@/components/header/Types";
import { Layout } from "@/components/Layout";
import { useCartSelector } from "@/lib/storeCart";
import { getNavigation } from "@/server/navigation";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "./cart.module.css";

export const getStaticProps: GetStaticProps = async ({}) => {
	const navigation = await getNavigation();

	return {
		props: {
			navigation,
		},
	};
};

export default function Cart(props: { navigation: RootNavigation[] }) {
	const shoppingCart = useCartSelector((state) => state.shoppingCart);

	return (
		<div>
			<Head>
				<title>Cart</title>
				<meta name="description" content="Your shop cart" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout navigation={props.navigation}>
				<div className={styles.cartPageMain}>
					<div className={styles.catrItems}>
						<h2>Cart({shoppingCart.length})</h2>
						{shoppingCart.map((item) => (
							<ShopCartItem item={item} />
						))}
					</div>
					<aside>
						<PromotionCodePanel />
						<CartFooter cartItems={shoppingCart}>
							<Link href="/delivery">Buy</Link>
						</CartFooter>
					</aside>
				</div>
			</Layout>
		</div>
	);
}
