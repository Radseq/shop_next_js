import { FC, ReactElement } from "react";
import styles from "./CheckBox.module.css";

export const CheckBox: FC<{
	labelName: string;
	labelExtension?: string;
	checkedValue: boolean;
	handleOnChange: CallableFunction;
	icon?: ReactElement;
}> = ({
	labelName,
	labelExtension,
	checkedValue,
	handleOnChange,
	icon,
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
			{icon}
		</fieldset>
	);
};
