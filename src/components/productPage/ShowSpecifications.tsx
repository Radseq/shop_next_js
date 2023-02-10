import React, { FC } from "react";

import styles from "./ShowSpecifications.module.css";
import { Specification } from "./Types";

export const ShowSpecifications: FC<{
	specifications: Specification;
	isMain: boolean;
	className: string;
}> = ({ specifications, isMain }) => {
	return (
		<div
			className={
				isMain ? styles.specificationsMain : styles.specificationsOther
			}
		>
			{Object.entries(
				isMain ? specifications.main : specifications.other
			).map(([key, values]) => {
				return (
					<dl key={key}>
						<dt>{key}:</dt>
						<div>
							{values.map((val) => {
								return <dd key={val}>{val}</dd>;
							})}
						</div>
					</dl>
				);
			})}
		</div>
	);
};
