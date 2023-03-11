import { FC, useEffect, useState } from "react";
import { StyledButton } from "../StyledButton";
import styles from "./AddCommentPopUp.module.css";
import utilsStyles from "../../styles/utils.module.css";
import { InteractiveScores } from "../InteractiveScores";

const ApiResult: FC<{ result: "successfully" | "failed" }> = ({ result }) => {
	if (result === "successfully")
		return (
			<span className={utilsStyles.success}>
				Comment successfully added!
			</span>
		);
	return (
		<span className={utilsStyles.fail}>
			Can't add comment, plese try again later!
		</span>
	);
};

export const AddCommentPopup: FC<{
	onCloseHandle: CallableFunction;
	productId: number;
}> = ({ onCloseHandle, productId }) => {
	const [commentText, setCommentText] = useState<string>();
	const [productScore, setProductScore] = useState<number | null>(null);
	const [commentAddState, setCommentAddState] = useState<
		"successfully" | "failed"
	>();

	const hideMessageAfterMS = 10000;

	useEffect(() => {
		setTimeout(() => setCommentAddState(undefined), hideMessageAfterMS);
	}, [commentAddState, hideMessageAfterMS]);

	const sendComment = async () => {
		if (!commentText) {
			return;
		}

		let res = await fetch(`http://localhost:3000/api/product/comment/`, {
			method: "POST",
			body: JSON.stringify({
				productId,
				commentText,
				productScore,
			}),
		});

		if (res.status === 200) {
			setCommentAddState("successfully");
		} else {
			setCommentAddState("failed");
		}
	};

	return (
		<div className={styles.formPopUp}>
			<div className={styles.formContainer}>
				<h1 className={utilsStyles.headingLg}>Add comment</h1>
				<div className={styles.scorePanel}>
					<InteractiveScores
						onSelectedScore={setProductScore}
						starCount={10}
					/>
				</div>
				<textarea
					required
					onChange={(e) => setCommentText(e.target.value)}
				/>
				<div className={styles.footer}>
					{commentAddState && <ApiResult result={commentAddState} />}

					<StyledButton
						kind="primary"
						onClick={(e) => {
							e.preventDefault();
							sendComment();
						}}
					>
						Send
					</StyledButton>
					<StyledButton
						onClick={() => onCloseHandle()}
						kind="secondary"
					>
						Cancel
					</StyledButton>
				</div>
			</div>
		</div>
	);
};
