import { FC } from "react";
import { Icon } from "../Icon";
import { CheckBox } from "./CheckBox";
import { PaymentType } from "./types";

export const Payments: FC<{
	paymentType: PaymentType;
	deliveryType: "currier" | "pickUpInShop";
	setPaymentId: CallableFunction;
}> = ({ deliveryType, setPaymentId, paymentType }) => {
	return (
		<div>
			<CheckBox
				checkedValue={paymentType === "Online"}
				labelName={"Online"}
				handleOnChange={() => setPaymentId("Online")}
				labelExtension={"(free)"}
				icon={<Icon kind="dotpay" />}
			/>
			<CheckBox
				checkedValue={paymentType === "CreditCard"}
				labelName={"Credit card"}
				handleOnChange={() => setPaymentId("CreditCard")}
				labelExtension={"(free)"}
				icon={<Icon kind="credit_cart" />}
			/>
			<CheckBox
				checkedValue={paymentType === "Blik"}
				labelName={"Blik"}
				handleOnChange={() => setPaymentId("Blik")}
				labelExtension={"(free)"}
				icon={<Icon kind="blik" />}
			/>
			<CheckBox
				checkedValue={paymentType === "Transfer"}
				labelName={"Transfer"}
				handleOnChange={() => setPaymentId("Transfer")}
				labelExtension={"(free)"}
			/>
			<CheckBox
				checkedValue={paymentType === "OnDelivery"}
				labelName={"Pay on delivery"}
				handleOnChange={() => {
					if (deliveryType == "currier") setPaymentId("OnDelivery");
				}}
				labelExtension={"(20 pln)"}
				icon={<Icon kind="wallet" />}
			/>
		</div>
	);
};
