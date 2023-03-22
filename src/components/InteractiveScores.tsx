import { FC, useState } from "react";
import styles from "./InteractiveScores.module.css";
import { SvgStar } from "./svg/SvgStar";

function generateStars(numberOfStars: number) {
	return [...new Array(numberOfStars)].map((_, index) => index + 1);
}

export const InteractiveScores: FC<{
	starCount: number;
	currentScore: number;
	onSelectedScore: CallableFunction;
	highlightColor?: string;
	color?: string;
}> = ({
	starCount,
	onSelectedScore,
	currentScore,
	highlightColor = "#efca00",
	color = "#757575",
}) => {
	const [hoveredStar, setHoveredStar] = useState<number | null>(null);

	const selectStarColor = (star: number) => {
		const targetStar = hoveredStar || currentScore;
		return star <= targetStar ? highlightColor : color;
	};
	return (
		<ul className={styles.scores} onMouseLeave={() => setHoveredStar(null)}>
			{generateStars(starCount).map((star) => (
				<li
					key={star}
					className={styles.score}
					onMouseEnter={() => setHoveredStar(star)}
					onClick={() => onSelectedScore(star)}
				>
					<SvgStar
						className={styles.star}
						color={selectStarColor(star)}
					/>
				</li>
			))}
		</ul>
	);
};
