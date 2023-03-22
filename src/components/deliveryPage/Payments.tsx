import { FC, useState } from "react";
import { Icon } from "../Icon";
import { CheckBox } from "./CheckBox";

export const Payments: FC<{
	paymentId: number;
	deliveryType: "currier" | "pickUpInShop";
	setPaymentId: CallableFunction;
}> = ({ deliveryType, setPaymentId, paymentId }) => {
	return (
		<div>
			<CheckBox
				checkedValue={paymentId === 0}
				labelName={"Online"}
				handleOnChange={() => setPaymentId(0)}
				labelExtension={"(free)"}
				icon={<Icon kind="dotpay" />}
			/>
			<CheckBox
				checkedValue={paymentId === 1}
				labelName={"Credit card"}
				handleOnChange={() => setPaymentId(1)}
				labelExtension={"(free)"}
				icon={<Icon kind="credit_cart" />}
			/>
			<CheckBox
				checkedValue={paymentId === 2}
				labelName={"Blik"}
				handleOnChange={() => setPaymentId(2)}
				labelExtension={"(free)"}
				icon={<Icon kind="blik" />}
			/>
			<CheckBox
				checkedValue={paymentId === 3}
				labelName={"Transfer"}
				handleOnChange={() => setPaymentId(3)}
				labelExtension={"(free)"}
			/>
			<CheckBox
				checkedValue={paymentId === 4}
				labelName={"Pay on delivery"}
				handleOnChange={() => {
					if (deliveryType == "currier") setPaymentId(4);
				}}
				labelExtension={"(20 pln)"}
				icon={<Icon kind="wallet" />}
			/>
		</div>
	);
};
