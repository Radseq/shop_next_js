import React, { FC, useState } from "react";
import ProgressBar from "../ProgressBar";
import styles from "./ScorePanel.module.css";
import { StarScore } from "../StarScore";
import { StyledButton } from "../StyledButton";
import { SvgStar } from "../svg/SvgStar";
import { AddCommentPopup } from "./AddCommentPopUp";

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
	productId: number;
}> = ({ productName, votesCount, scores, averageVote, productId }) => {
	const sortedScoreDesc = Object.entries(scores).sort(
		([leftKey], [rightKey]) => Number(rightKey) - Number(leftKey)
	);

	const [showAddCommentPopUp, setShowAddCommentPopUp] =
		useState<boolean>(false);

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
				{sortedScoreDesc.map(([scoredValue, scoredCount], index) => {
					return (
						<div
							className={styles.perScoreOptionRow}
							key={scoredValue}
						>
							<SvgStar />
							<span>{scoredValue}</span>
							<ProgressBar
								key={scoredValue}
								startValue={progressOfProgressBar[index]}
								endValue={100}
							/>
							<span>{scoredCount}</span>
						</div>
					);
				})}
			</div>
			<div className={styles.addOpinion}>
				<span>Have this product?</span>
				<span>Score {productName} and help others to choose</span>
				<StyledButton
					onClick={() => setShowAddCommentPopUp(true)}
					kind="secondary"
				>
					Add opinion
				</StyledButton>
				{showAddCommentPopUp && (
					<AddCommentPopup
						onCloseHandle={() => setShowAddCommentPopUp(false)}
						productId={productId}
					/>
				)}
			</div>
		</div>
	);
};
