import { FC } from "react";
import { CheckBox } from "./CheckBox";
import styles from "./BuyerType.module.css";

export const BuyerType: FC<{
	type: "private" | "company";
	setBuyerType: CallableFunction;
}> = ({ type, setBuyerType }) => {
	return (
		<div className={styles.buyerType}>
			<CheckBox
				checkedValue={type === "private"}
				labelName={"Private person"}
				handleOnChange={() => setBuyerType("private")}
			/>
			<CheckBox
				checkedValue={type === "company"}
				labelName={"Company"}
				handleOnChange={() => setBuyerType("company")}
			/>
		</div>
	);
};
