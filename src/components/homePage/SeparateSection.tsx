import { FC } from "react";
import styles from "./SeparateSection.module.css";

type SeparateSectionProps = {
	sectionName: string;
	url?: string;
};

export const SeparateSection: FC<SeparateSectionProps> = ({
	sectionName,
	url,
}) => {
	return (
		<div className={styles.sectionNavContainer}>
			<h2>{sectionName}</h2>
			{url && (
				<a href={url} className={styles.sectionNavShowAll}>
					Show all ❯
				</a>
			)}
		</div>
	);
};
