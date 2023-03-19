import { FC, useEffect, useState } from "react";
import { StyledButton } from "../StyledButton";
import styles from "./AddCommentPopUp.module.css";
import utilsStyles from "../../styles/utils.module.css";
import { InteractiveScores } from "../InteractiveScores";
import { CONFIG } from "@/config";
import { StyledAlert } from "../StyledAlert";

export const AddCommentPopup: FC<{
	onCloseHandle: CallableFunction;
	productId: number;
}> = ({ onCloseHandle, productId }) => {
	const [commentText, setCommentText] = useState<string>();
	const [productScore, setProductScore] = useState<number | null>(null);
	const [commentAddState, setCommentAddState] = useState<
		"success" | "failure"
	>();

	useEffect(() => {
		if (!commentAddState) {
			return;
		}
		setTimeout(
			() => setCommentAddState(undefined),
			CONFIG.HIDE_ADD_COMMENT_MESSAGE_IN_MS
		);
	}, [commentAddState]);

	const sendComment = async () => {
		if (!commentText) {
			return;
		}

		const res = await fetch(`http://localhost:3000/api/product/comment/`, {
			method: "POST",
			body: JSON.stringify({
				productId,
				commentText,
				productScore,
			}),
		});

		if (res.status === 200) {
			setCommentAddState("success");
		} else {
			setCommentAddState("failure");
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
					{commentAddState && (
						<StyledAlert result={commentAddState}>
							{commentAddState === "success"
								? "Comment successfully added!"
								: "Can't add comment, plese try again later!"}
						</StyledAlert>
					)}

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
