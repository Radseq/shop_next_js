import { FC, useEffect, useState } from "react";
import { StyledButton } from "../StyledButton";
import styles from "./AddCommentPopUp.module.css";
import utilsStyles from "../../styles/utils.module.css";
import { InteractiveScores } from "../InteractiveScores";
import { StyledAlert } from "../StyledAlert";

const HIDE_ADD_COMMENT_MESSAGE_IN_MS = 10000; //10sec
const STAR_COUNT = 10;

type ProductComment = {
	productId: number;
	commentText: string;
	productScore: number | null;
};

const SendCommentToApi = async (productComment: ProductComment) => {
	return await fetch(`http://localhost:3000/api/product/comment/`, {
		method: "POST",
		body: JSON.stringify(productComment),
	});
};

export const AddCommentPopup: FC<{
	onCloseHandle: CallableFunction;
	productId: number;
}> = ({ onCloseHandle, productId }) => {
	const [productComment, setProductComment] = useState<ProductComment>({
		productId: productId,
		commentText: "",
		productScore: null,
	});

	const [commentAddState, setCommentAddState] = useState<
		"success" | "failure"
	>();

	useEffect(() => {
		if (!commentAddState) {
			return;
		}
		setTimeout(
			() => setCommentAddState(undefined),
			HIDE_ADD_COMMENT_MESSAGE_IN_MS
		);
	}, [commentAddState]);

	const sendComment = async () => {
		if (!productComment.commentText) {
			return;
		}

		const res = await SendCommentToApi(productComment);

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
						onSelectedScore={(score: number) => {
							setProductComment({
								...productComment,
								productScore: score,
							});
						}}
						starCount={STAR_COUNT}
					/>
				</div>
				<textarea
					required
					onChange={(e) =>
						setProductComment({
							...productComment,
							commentText: e.target.value,
						})
					}
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
						disabled={!productComment.commentText}
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
