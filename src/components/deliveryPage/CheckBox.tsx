import { FC } from "react";
import Image from "next/image";
import styles from "./CheckBox.module.css";

export const CheckBox: FC<{
	labelName: string;
	labelExtension?: string;
	checkedValue: boolean;
	handleOnChange: CallableFunction;
	iconSource?: string;
}> = ({
	labelName,
	labelExtension,
	checkedValue,
	handleOnChange,
	iconSource,
}) => {
	return (
		<fieldset className={styles.checkBox}>
			<label>
				<input
					type="checkbox"
					checked={checkedValue}
					onChange={() => handleOnChange()}
				/>
				<span>{labelName}</span>
				{labelExtension && <span> {labelExtension}</span>}
			</label>
			{iconSource && (
				<Image width="32" height="32" src={iconSource} alt="icon" />
			)}
		</fieldset>
	);
};
