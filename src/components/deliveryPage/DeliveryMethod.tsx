import { FC, useState } from "react";
import { Icon } from "../Icon";
import { CheckBox } from "./CheckBox";
import styles from "./DeliveryMethod.module.css";

export const DeliveryMethod: FC<{
	deliveryType: "currier" | "pickUpInShop";
	setDeliveryType: CallableFunction;
}> = ({ deliveryType, setDeliveryType }) => {
	return (
		<div className={styles.deliveryType}>
			<CheckBox
				checkedValue={deliveryType === "currier"}
				labelName={"Currier - DLS, DHL"}
				handleOnChange={() => {
					setDeliveryType("currier");
				}}
				labelExtension={"(free)"}
				icon={<Icon kind="truck" />}
			/>
			<CheckBox
				checkedValue={deliveryType === "pickUpInShop"}
				labelName={"Pick up in shop"}
				handleOnChange={() => {
					setDeliveryType("pickUpInShop");
				}}
				labelExtension={"(free)"}
				icon={<Icon kind="shop" />}
			/>
		</div>
	);
};
