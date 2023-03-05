import { FC, useState } from "react";
import { StyledButton } from "../StyledButton";
import styles from "./AddCommentPopUp.module.css";

export const AddCommentPopup: FC<{
	onCloseHandle: CallableFunction;
	productId: number;
}> = ({ onCloseHandle, productId }) => {
	const [commentText, setCommentText] = useState<string>();

	const sendComment = async () => {
		let res = await fetch(`http://localhost:3000/api/product/comment/`, {
			method: "POST",
			body: JSON.stringify({
				text: commentText,
				productId: productId,
			}),
		});
	};

	return (
		<div className={styles.formPopUp}>
			<form className={styles.formContainer}>
				<h1>Add comment</h1>

				<textarea
					required
					onChange={(e) => setCommentText(e.target.value)}
				/>
				<div className={styles.footer}>
					<StyledButton kind="primary" onClick={() => sendComment()}>
						Send
					</StyledButton>
					<StyledButton
						onClick={() => onCloseHandle()}
						kind="secondary"
					>
						Cancel
					</StyledButton>
				</div>
			</form>
		</div>
	);
};
