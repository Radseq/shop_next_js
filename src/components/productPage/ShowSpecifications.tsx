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
			).map(([key, value]) => {
				const values = value.split(/\r?\n/);
				return (
					<dl key={key}>
						<dt>{key}:</dt>
						<div>
							{values.length > 0 ? (
								values.map((val) => {
									return <dd key={val}>{val}</dd>;
								})
							) : (
								<dd key={value}>{value}</dd>
							)}
						</div>
					</dl>
				);
			})}
		</div>
	);
};
