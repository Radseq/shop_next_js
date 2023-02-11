import React, { FC, useMemo, useState } from "react";
import styles from "./MenuItem.module.css";
import {
	MenuCategory,
	NavProduct,
	RootNavigationExt,
	SubCategory,
} from "./Types";
import Image from "next/image";
import Link from "next/link";

const isProduct = (value: NavProduct | SubCategory[]): value is NavProduct =>
	!Array.isArray(value);

const SubCategoryProduct: FC<{ value: NavProduct | SubCategory[] }> = (
	props
) => {
	if (!isProduct(props.value)) {
		const subCategories = props.value; // ts knows props.value is SubCategory[]
		return (
			<ul>
				{subCategories.map((subCategory) => (
					<li key={subCategory.id}>
						<Link href={subCategory.linkUrl}>
							{subCategory.name}
						</Link>
					</li>
				))}
			</ul>
		);
	}
	const product = props.value; // ts knows props.value is NavProduct
	return (
		<div className={styles.recommendedProduct} title={product.name}>
			<span>Recommended Product</span>
			<h3>{product.name}</h3>
			<div className={styles.recommendedProductBody}>
				<div className={styles.recommendedProductDesc}>
					<div>{product.descFirst}</div>
					<div>{product.descSecond}</div>
					<div>{product.descThird}</div>
				</div>
				<Image
					width="200"
					height="200"
					src={product.imgUrl}
					alt={product.name}
				/>
			</div>
			<div className={styles.recommendedProductPrice}>
				<span>only</span>
				<h2>{product.price}</h2>
			</div>
		</div>
	);
};

export const MenuItem: React.FC<{
	value: RootNavigationExt;
	onLeaveCategory: CallableFunction;
}> = (props) => {
	const [menuCategory, setMenuCategory] = useState<MenuCategory | undefined>(
		undefined
	);
	const rightProduct = useMemo(
		() => menuCategory?.product || menuCategory?.subCategories,
		[menuCategory]
	);
	const rootNav = props.value;

	const leftOffset = props.value.menuItemLeftOffset;
	const minWithToSwapRenderPosition = 520 + leftOffset;

	let categoryLeftPosition: number;
	let categoryRightPosition: number | undefined;

	//whole pane is greater than  windows width, so we render from right to left
	if (minWithToSwapRenderPosition > window.innerWidth) {
		let leftPosition = leftOffset + rootNav.menuItemWidth - 520;
		categoryLeftPosition = leftPosition < 0 ? 0 : leftPosition;
		categoryRightPosition =
			window.innerWidth - leftOffset - rootNav.menuItemWidth;
	} else {
		categoryLeftPosition = leftOffset;
		categoryRightPosition = undefined;
	}

	return (
		<div
			style={{ left: categoryLeftPosition, right: categoryRightPosition }}
			className={styles.menuItemCategories}
			onMouseLeave={() => props.onLeaveCategory()}
		>
			<section className={styles.leftSide}>
				<ul>
					{rootNav.categories.map((category) => (
						<li
							key={category.id}
							className={
								menuCategory?.id === category.id
									? styles.leftSideCategorySelected
									: undefined
							}
							onMouseEnter={() => setMenuCategory(category)}
						>
							{category.name}
						</li>
					))}
				</ul>
			</section>
			{rightProduct && (
				<section className={styles.rightSide}>
					<SubCategoryProduct value={rightProduct} />
				</section>
			)}
		</div>
	);
};
