import { FC, useState } from "react";
import { StyledButton } from "../StyledButton";
import styles from "./AddCommentPopUp.module.css";
import utilsStyles from "../../styles/utils.module.css";
import { InteractiveScores } from "../InteractiveScores";

export const AddCommentPopup: FC<{
	onCloseHandle: CallableFunction;
	productId: number;
}> = ({ onCloseHandle, productId }) => {
	const [commentText, setCommentText] = useState<string>();

	const sendComment = async () => {
		if (!commentText) {
			return;
		}

		let res = await fetch(`http://localhost:3000/api/product/comment/`, {
			method: "POST",
			body: JSON.stringify({
				productId: productId,
				commentText: commentText,
			}),
		});

		if (res.status === 200) {
			alert("Thenks for comment!");
		} else {
			alert("Can't add comment, plese try again later!");
		}
	};

	const onSelectScore = (score: number) => {};

	return (
		<div className={styles.formPopUp}>
			<div className={styles.formContainer}>
				<h1 className={utilsStyles.headingLg}>Add comment</h1>
				<div className={styles.scorePanel}>
					<InteractiveScores
						onSelectedScore={onSelectScore}
						starCount={10}
					/>
				</div>
				<textarea
					required
					onChange={(e) => setCommentText(e.target.value)}
				/>
				<div className={styles.footer}>
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
