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
} from "@/components/deliveryPage/types";
import { DeliveryAddress } from "@/components/deliveryPage/DeliveryAddress";
import { Icon } from "@/components/Icon";

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
	paimentId: 1,
	termsAndConditions: false,
	deliveryAddres: emptyDeliveryAddress,
};

export default function Cart(props: { navigationData: RootNavigation[] }) {
	const shoppingCart = useCartSelector((state) => state.shoppingCart);


	const [deliveryPostData, setDeliveryPostData] = useState(postData);

	const [checkDeliveryDateInvoice, setCheckDeliveryDateInvoice] =
		useState<boolean>(false);

	const handleInvoiceDeliveryCheckBox = () => {
		const show = !checkDeliveryDateInvoice;
		setCheckDeliveryDateInvoice(!checkDeliveryDateInvoice);
		if (show) {
			setDeliveryPostData({
				...deliveryPostData,
				invoideDeliveryAddres: emptyDeliveryAddress,
			});
		}

		if (!show) {
			setDeliveryPostData({
				...deliveryPostData,
				invoideDeliveryAddres: undefined,
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
						<div className={styles.deliveryType}>
							<CheckBox
								checkedValue={
									deliveryPostData.deliveryType === "currier"
								}
								labelName={"Currier - DLS, DHL"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										deliveryType: "currier",
									})
								}
								labelExtension={"(free)"}
								icon={<Icon kind="truck" />}
							/>
							<CheckBox
								checkedValue={
									deliveryPostData.deliveryType ===
									"pickUpInShop"
								}
								labelName={"Pick up in shop"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										deliveryType: "pickUpInShop",
									})
								}
								labelExtension={"(free)"}
								icon={<Icon kind="shop" />}
							/>
						</div>
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
									deliveryAddres: deliveryAddres,
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
						<div>
							<CheckBox
								checkedValue={deliveryPostData.paimentId === 0}
								labelName={"Online"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										paimentId: 0,
									})
								}
								labelExtension={"(free)"}
								icon={<Icon kind="dotpay" />}
							/>
							<CheckBox
								checkedValue={deliveryPostData.paimentId === 1}
								labelName={"Credit card"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										paimentId: 1,
									})
								}
								labelExtension={"(free)"}
								icon={<Icon kind="credit_cart" />}
							/>
							<CheckBox
								checkedValue={deliveryPostData.paimentId === 2}
								labelName={"Blik"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										paimentId: 2,
									})
								}
								labelExtension={"(free)"}
								icon={<Icon kind="blik" />}
							/>
							<CheckBox
								checkedValue={deliveryPostData.paimentId === 3}
								labelName={"Transfer"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										paimentId: 3,
									})
								}
								labelExtension={"(free)"}
							/>
							<CheckBox
								checkedValue={deliveryPostData.paimentId === 4}
								labelName={"Pay on delivery"}
								handleOnChange={() =>
									setDeliveryPostData({
										...deliveryPostData,
										paimentId: 4,
									})
								}
								labelExtension={"(20 pln)"}
								icon={<Icon kind="wallet" />}
							/>
						</div>
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
						<button onClick={()=>console.log(deliveryPostData)}></button>
					</div>
					<aside className={styles.panel}>Panel</aside>
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
