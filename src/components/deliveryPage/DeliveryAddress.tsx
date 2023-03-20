import { StyledInput } from "../StyledInput";
import styles from "./DeliveryAddress.module.css";
import stylesUtils from "../../styles/utils.module.css";
import { DeliveryAddressProps } from "./types";
import { FC } from "react";

export const DeliveryAddress: FC<{
	deliveryData: DeliveryAddressProps;
	setDeliveryData: CallableFunction;
	title: string;
}> = ({ deliveryData, setDeliveryData, title }) => {
	return (
		<div>
			<h1 className={stylesUtils.headingLg}>{title}</h1>
			<div className={styles.deliveryAddress}>
				<StyledInput
					type="text"
					placeholder="Name or company name"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							name: e.target.value,
						})
					}
				/>
				<StyledInput
					type="text"
					placeholder="Surame or company name"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							surname: e.target.value,
						})
					}
				/>
				<StyledInput
					type="text"
					placeholder="Street"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							street: e.target.value,
						})
					}
				/>
				<StyledInput
					type="text"
					placeholder="Building number"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							buildingNumber: e.target.value,
						})
					}
				/>
				<StyledInput
					type="text"
					placeholder="Zip code"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							zipCode: e.target.value,
						})
					}
				/>
				<StyledInput
					type="text"
					placeholder="City"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							city: e.target.value,
						})
					}
				/>
				<StyledInput
					type="text"
					placeholder="Phone number"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							phoneNumber: e.target.value,
						})
					}
				/>
				<StyledInput
					type="email"
					placeholder="Email"
					required
					kind="primary"
					onChange={(e) =>
						setDeliveryData({
							...deliveryData,
							email: e.target.value,
						})
					}
				/>
			</div>
		</div>
	);
};
