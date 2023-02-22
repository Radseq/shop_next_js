import { StyledInput } from "../StyledInput";
import styles from "./DeliveryAddress.module.css";
import stylesUtils from "../../styles/utils.module.css";
import { DeliveryPostData } from "./types";
import { FC } from "react";

export const DeliveryAddress: FC<{
	deliveryData: DeliveryPostData;
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
							deliveryAddres: {
								...deliveryData,
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
						setDeliveryData({
							...deliveryData,
							deliveryAddres: {
								...deliveryData.deliveryAddres,
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
						setDeliveryData({
							...deliveryData,
							deliveryAddres: {
								...deliveryData.deliveryAddres,
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
						setDeliveryData({
							...deliveryData,
							deliveryAddres: {
								...deliveryData.deliveryAddres,
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
						setDeliveryData({
							...deliveryData,
							deliveryAddres: {
								...deliveryData.deliveryAddres,
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
						setDeliveryData({
							...deliveryData,
							deliveryAddres: {
								...deliveryData.deliveryAddres,
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
						setDeliveryData({
							...deliveryData,
							deliveryAddres: {
								...deliveryData.deliveryAddres,
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
						setDeliveryData({
							...deliveryData,
							deliveryAddres: {
								...deliveryData.deliveryAddres,
								email: e.target.value,
							},
						})
					}
				/>
			</div>
		</div>
	);
};
