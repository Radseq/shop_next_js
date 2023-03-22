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

export type PaymentType =
	| "Online"
	| "CreditCard"
	| "Blik"
	| "Transfer"
	| "OnDelivery";

export type DeliveryPostData = {
	deliveryType: "currier" | "pickUpInShop";
	buyerType: "private" | "company";
	deliveryAddres: DeliveryAddressProps;
	invoideDeliveryAddres?: DeliveryAddressProps;
	paimentType: PaymentType;
	termsAndConditions: boolean;
};
