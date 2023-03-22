import { RootNavigation } from "@/components/header/Types";
import { Layout } from "@/components/Layout";
import { useCartSelector } from "@/lib/storeCart";
import { getNavigation } from "@/server/navigation";
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./delivery.module.css";
import stylesUtils from "../styles/utils.module.css";
import { useState } from "react";
import { CheckBox } from "@/components/deliveryPage/CheckBox";
import {
	DeliveryAddressProps,
	DeliveryPostData,
	PaymentType,
} from "@/components/deliveryPage/types";
import { DeliveryAddress } from "@/components/deliveryPage/DeliveryAddress";
import { Icon } from "@/components/Icon";
import { CartItem } from "@/components/cart/CartItem";
import { Payments } from "@/components/deliveryPage/Payments";
import { DeliveryMethod } from "@/components/deliveryPage/DeliveryMethod";

const emptyDeliveryAddress: DeliveryAddressProps = {
	city: "",
	email: "",
	name: "",
	phoneNumber: "",
	street: "",
	buildingNumber: "",
	surname: "",
	zipCode: "",
};

const postData: DeliveryPostData = {
	buyerType: "private",
	deliveryType: "currier",
	paimentType: "Online",
	termsAndConditions: false,
	deliveryAddres: emptyDeliveryAddress,
};

export default function Cart(props: { navigationData: RootNavigation[] }) {
	const shoppingCart = useCartSelector((state) => state.shoppingCart);

	const [deliveryPostData, setDeliveryPostData] = useState(postData);

	const [checkDeliveryDateInvoice, setCheckDeliveryDateInvoice] =
		useState<boolean>(false);

	const handleInvoiceDeliveryCheckBox = () => {
		setCheckDeliveryDateInvoice(!checkDeliveryDateInvoice);
		if (!checkDeliveryDateInvoice) {
			setDeliveryPostData({
				...deliveryPostData,
				invoideDeliveryAddres: emptyDeliveryAddress,
			});
		}

		if (checkDeliveryDateInvoice) {
			setDeliveryPostData({
				...deliveryPostData,
				invoideDeliveryAddres: undefined,
			});
		}
	};

	const handleChangeDeliveryType = (
		deliveryType: "currier" | "pickUpInShop"
	) => {
		// we can't pay on delivery when we pick up product in shop
		if (
			deliveryType == "pickUpInShop" &&
			deliveryPostData.paimentType === "OnDelivery"
		) {
			setDeliveryPostData({
				...deliveryPostData,
				paimentType: "Transfer",
				deliveryType: deliveryType,
			});
		} else {
			setDeliveryPostData({
				...deliveryPostData,
				deliveryType: deliveryType,
			});
		}
	};

	return (
		<div>
			<Head>
				<title>Delivery</title>
				<meta name="description" content="Your shop cart" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout navigation={props.navigationData}>
				<div className={styles.delivery}>
					<div className={styles.content}>
						<h1 className={stylesUtils.headingXl}>
							Delivery and payment
						</h1>
						<h1 className={stylesUtils.headingLg}>Delivery</h1>
						<DeliveryMethod
							deliveryType={deliveryPostData.deliveryType}
							setDeliveryType={(
								deliveryType: "currier" | "pickUpInShop"
							) => handleChangeDeliveryType(deliveryType)}
						/>
						<h1 className={stylesUtils.headingLg}>Buying as</h1>
						<div className={styles.buyerType}>
							<CheckBox
								checkedValue={
									deliveryPostData.buyerType === "private"
								}
								labelName={"Private person"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										buyerType: "private",
									})
								}
							/>
							<CheckBox
								checkedValue={
									deliveryPostData.buyerType === "company"
								}
								labelName={"Company"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										buyerType: "company",
									})
								}
							/>
						</div>
						<DeliveryAddress
							deliveryData={deliveryPostData.deliveryAddres}
							setDeliveryData={(
								deliveryAddres: DeliveryAddressProps
							) => {
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres,
								});
							}}
							title="Delivery Address"
						/>
						<h1 className={stylesUtils.headingLg}>Invoice data</h1>
						<div className={styles.deliveryAddress}>
							<label>
								<input
									type="checkbox"
									checked={checkDeliveryDateInvoice}
									onChange={handleInvoiceDeliveryCheckBox}
								/>
								I want to provide other invoice details
							</label>
						</div>

						{checkDeliveryDateInvoice &&
							deliveryPostData.invoideDeliveryAddres && (
								<DeliveryAddress
									title="Invoice Delivery Address"
									deliveryData={
										deliveryPostData.invoideDeliveryAddres
									}
									setDeliveryData={(
										deliveryAddres: DeliveryAddressProps
									) => {
										setDeliveryPostData({
											...deliveryPostData,
											invoideDeliveryAddres:
												deliveryAddres,
										});
									}}
								/>
							)}

						<h1 className={stylesUtils.headingLg}>Payments</h1>
						<Payments
							paymentType={deliveryPostData.paimentType}
							deliveryType={deliveryPostData.deliveryType}
							setPaymentId={(paimentType: PaymentType) =>
								setDeliveryPostData({
									...deliveryPostData,
									paimentType,
								})
							}
						/>
						<h1 className={stylesUtils.headingMd}>
							Formal approvals
						</h1>
						<div className={styles.formalApprovals}>
							<CheckBox
								checkedValue={
									deliveryPostData.termsAndConditions
								}
								labelName={"Terms and conditions"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										termsAndConditions:
											!deliveryPostData.termsAndConditions,
									})
								}
								labelExtension={"(required)"}
							/>
						</div>
					</div>
					<aside className={styles.panel}>
						{shoppingCart.map((cartProduct) => (
							<CartItem cartProduct={cartProduct} />
						))}
					</aside>
				</div>
			</Layout>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async ({}) => {
	const [navigationData] = await Promise.all([getNavigation()]);

	return {
		props: {
			navigationData,
		},
	};
};
