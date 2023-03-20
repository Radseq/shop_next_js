export type DeliveryAddressProps = {
	name: string;
	surname: string;
	street: string;
	buildingNumber: string;
	zipCode: string;
	city: string;
	phoneNumber: string;
	email: string;
};

export type DeliveryPostData = {
	deliveryType: "currier" | "pickUpInShop";
	buyerType: "private" | "company";
	deliveryAddres: DeliveryAddressProps;
	invoideDeliveryAddres?: DeliveryAddressProps;
	paimentId: number;
	termsAndConditions: boolean;
};