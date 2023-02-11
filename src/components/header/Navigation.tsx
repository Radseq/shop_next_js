import classNames from "classnames";
import React, { FC, useState } from "react";
import { MenuItem } from "./MenuItem";
import styles from "./Navigation.module.css";
import { RootNavigation, RootNavigationExt } from "./Types";

export const Navigation: FC<{ navigations: RootNavigation[] }> = ({
	navigations,
}) => {
	const [menuItemHover, setMenuItemHover] = useState<
		RootNavigationExt | undefined
	>(undefined);

	const getNumberFromString = (str: string): number => {
		let regex = /\d+/g;
		let matches = str.match(regex);

		if (matches) {
			let result = Number(matches[0]);
			return result ? result : 0;
		}

		return 0;
	};

	const handleMenuItemLinkHover = (
		element: HTMLAnchorElement,
		menuItem: RootNavigation
	) => {
		let width = element.offsetWidth;
		const linkElementStyles = window.getComputedStyle(element);
		const padding = getNumberFromString(linkElementStyles.padding);
		const borderWidth = getNumberFromString(linkElementStyles.borderWidth);
		width += padding + borderWidth + 1;

		const menuItemExt: RootNavigationExt = {
			categories: menuItem.categories,
			id: menuItem.id,
			name: menuItem.name,
			url: menuItem.url,
			menuItemLeftOffset: element.offsetLeft,
			menuItemWidth: width,
		};
		setMenuItemHover((e) => (e = menuItemExt));
	};

	return (
		<nav
			className={styles.menu}
			onMouseLeave={() => {
				setMenuItemHover(undefined);
			}}
		>
			<ul>
				{navigations.map((menuItem) => {
					return (
						<li key={menuItem.id}>
							<a
								href={menuItem.url}
								onMouseEnter={(e) => {
									handleMenuItemLinkHover(
										e.currentTarget,
										menuItem
									);
								}}
								className={classNames(
									styles.menuItem,
									menuItemHover?.id === menuItem.id
										? styles.menuItemSelected
										: undefined
								)}
							>
								{menuItem.name}
							</a>
						</li>
					);
				})}
			</ul>
			{menuItemHover && (
				<div>
					<MenuItem
						value={menuItemHover}
						onLeaveCategory={() => {
							setMenuItemHover(undefined);
						}}
					/>
					<div className={styles.bodyOverlay} />
				</div>
			)}
		</nav>
	);
};
