import React from "react";
import Image from "next/image";
import classNames from "classnames";

type IconProps = {
	kind:
		| "cart"
		| "account"
		| "shop"
		| "help"
		| "none"
		| "truck"
		| "dotpay"
		| "credit_cart"
		| "blik"
		| "wallet";
	className?: string;
};

export const Icon: React.FC<IconProps> = ({ kind, className = "" }) => {
	return (
		<Image
			className={className}
			width="32"
			height="32"
			src={getIconSrcByKind(kind)}
			alt="icon"
		/>
	);
};

function getIconSrcByKind(kind: IconProps["kind"]): string {
	switch (kind) {
		case "cart":
			return "/images/cart.png";
		case "shop":
			return "/images/shop.png";
		case "account":
			return "/images/account.png";
		case "help":
			return "/images/help.png";
		case "truck":
			return "/images/truck.png";
		case "dotpay":
			return "/images/dotpay.png";
		case "credit_cart":
			return "/images/credit_cart.png";
		case "blik":
			return "/images/blik.png";
		case "wallet":
			return "/images/wallet.png";
		default: {
			console.error(`Not found image source by kind ${kind}`);
			return "";
		}
	}
}
