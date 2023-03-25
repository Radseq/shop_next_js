import React from "react";
import Image from "next/image";
import styles from "./Icon.module.css";

type IconProps = {
	kind: "cart" | "account" | "shop" | "help" | "none";
};

export const Icon: React.FC<IconProps> = ({ kind }) => {
	return (
		<Image
			className={styles.icon}
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
		default: {
			console.error(`Not found image source by kind ${kind}`);
			return "";
		}
	}
}
