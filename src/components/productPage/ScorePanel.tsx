import React, { FC } from "react";
import ProgressBar from "../ProgressBar";
import styles from "./ScorePanel.module.css";
import { StarScore } from "../StarScore";
import { StyledButton } from "../StyledButton";
import { SvgStar } from "../svg/SvgStar";

// todo, i think about form in modal window
const onAddComment = () => {};

const calculateProgressOfProgressbar = (
	keyPair: [string, number][],
	votesCount: number
): Array<number> => {
	let progressValues = new Array<number>();

	Object.values(keyPair).forEach(([key, value]) => {
		progressValues.push((value / votesCount) * 100);
	});
	return progressValues;
};

export const ScorePanel: FC<{
	productName: string;
	votesCount: number;
	scores: Record<number, number>;
	averageVote: number;
}> = ({ productName, votesCount, scores, averageVote }) => {
	const sortedScoreDesc = Object.entries(scores).sort(
		([leftKey], [rightKey]) => Number(rightKey) - Number(leftKey)
	);

	const progressOfProgressBar = calculateProgressOfProgressbar(
		sortedScoreDesc,
		votesCount
	);

	return (
		<div className={styles.scorePanel}>
			<div className={styles.averageScorePanel}>
				<div className={styles.averageScore}>
					<span>
						{averageVote.toFixed(2).toString().replace(".", ",")}
					</span>
					<span>/10</span>
				</div>
				<div className={styles.averageScoreGraphic}>
					<StarScore
						score={averageVote}
						starCount={progressOfProgressBar.length}
					/>
				</div>
				<span>({votesCount} opinions)</span>
			</div>
			<div className={styles.perScoreOpinions}>
				{sortedScoreDesc.map(([key, value], index) => {
					return (
						<div className={styles.perScoreOptionRow} key={value}>
							<SvgStar />
							<span>{key}</span>
							<ProgressBar
								key={key}
								startValue={progressOfProgressBar[index]}
								endValue={100}
							/>
							<span>{value}</span>
						</div>
					);
				})}
			</div>
			<div className={styles.addOpinion}>
				<span>Have this product?</span>
				<span>Score {productName} and help others to choose</span>
				<StyledButton onClick={onAddComment} kind="secondary">
					Add opinion
				</StyledButton>
			</div>
		</div>
	);
};
