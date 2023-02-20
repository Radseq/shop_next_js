import { RootNavigation } from "@/components/header/Types";
import { Layout } from "@/components/Layout";
import { useCartSelector } from "@/lib/storeCart";
import { getNavigation } from "@/server/navigation";
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./delivery.module.css";
import stylesUtils from "../styles/utils.module.css";
import { FC, useState } from "react";
import { StyledInput } from "@/components/StyledInput";
import { CheckBox } from "@/components/deliveryPage/CheckBox";

type DeliveryAddress = {
	name: string;
	surname: string;
	street: string;
	buildingNumber: string;
	zipCode: string;
	city: string;
	phoneNumber: string;
	email: string;
};

type DeliveryPostData = {
	deliveryType: "currier" | "pickUpInShop";
	buyerType: "private" | "company";
	deliveryAddres: DeliveryAddress;
	invoideDeliveryAddres?: DeliveryAddress;
	paimentId: number;
	termsAndConditions: boolean;
};

export default function Cart(props: { navigationData: RootNavigation[] }) {
	const shoppingCart = useCartSelector((state) => state.shoppingCart);

	const postData: DeliveryPostData = {
		buyerType: "private",
		deliveryType: "currier",
		paimentId: 1,
		termsAndConditions: false,
		deliveryAddres: {
			city: "",
			email: "",
			name: "",
			phoneNumber: "",
			street: "",
			buildingNumber: "",
			surname: "",
			zipCode: "",
		},
	};

	const [deliveryPostData, setDeliveryPostData] = useState(postData);

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
				<h1 className={stylesUtils.headingXl}>Delivery and payment</h1>
				<div className={styles.content}>
					<h1 className={stylesUtils.headingLg}>Delivery</h1>
					<div className={styles.delivery}>
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
							iconSource={"/images/truck.png"}
						/>
						<CheckBox
							checkedValue={
								deliveryPostData.deliveryType === "pickUpInShop"
							}
							labelName={"Pick up in shop"}
							handleOnChange={() =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryType: "pickUpInShop",
								})
							}
							labelExtension={"(free)"}
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
					<h1 className={stylesUtils.headingLg}>Delivery address</h1>
					<div className={styles.deliveryAddress}>
						<StyledInput
							type="text"
							placeholder="Name or company name"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										name: e.target.value,
									},
								})
							}
						/>
						<StyledInput
							type="text"
							placeholder="Surame or company name"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										surname: e.target.value,
									},
								})
							}
						/>
						<StyledInput
							type="text"
							placeholder="Street"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										street: e.target.value,
									},
								})
							}
						/>
						<StyledInput
							type="text"
							placeholder="Building number"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										buildingNumber: e.target.value,
									},
								})
							}
						/>
						<StyledInput
							type="text"
							placeholder="Zip code"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										zipCode: e.target.value,
									},
								})
							}
						/>
						<StyledInput
							type="text"
							placeholder="City"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										city: e.target.value,
									},
								})
							}
						/>
						<StyledInput
							type="text"
							placeholder="Phone number"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										phoneNumber: e.target.value,
									},
								})
							}
						/>
						<StyledInput
							type="email"
							placeholder="Email"
							required
							kind="primary"
							onChange={(e) =>
								setDeliveryPostData({
									...deliveryPostData,
									deliveryAddres: {
										...deliveryPostData.deliveryAddres,
										email: e.target.value,
									},
								})
							}
						/>
					</div>
					<h1 className={stylesUtils.headingLg}>Invoice data</h1>
					{/* todo */}
					<div className={styles.deliveryAddress}>
						<label>
							<input type="checkbox" />I want to provide other
							invoice details
						</label>
					</div>
					<h1 className={stylesUtils.headingLg}>Payments</h1>
					<div className={styles.deliveryAddress}>
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
						/>
					</div>
					<h1 className={stylesUtils.headingMd}>Formal approvals</h1>
					<div className={styles.formalApprovals}>
						<CheckBox
							checkedValue={deliveryPostData.termsAndConditions}
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
