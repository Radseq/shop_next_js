import { FC, useEffect, useState } from "react";
import { StyledButton } from "../StyledButton";
import styles from "./AddCommentPopUp.module.css";
import utilsStyles from "../../styles/utils.module.css";
import { StyledAlert } from "../StyledAlert";
import { InteractiveScores } from "../InteractiveScores";
import { useAddComment } from "@/lib/useCommentData";
import { ProductCommentRequest } from "./Types";

const HIDE_ADD_COMMENT_MESSAGE_IN_MS = 10000; //10sec
const STAR_COUNT = 10;

export const AddCommentPopup: FC<{
	onCloseHandle: CallableFunction;
	productId: number;
}> = ({ onCloseHandle, productId }) => {
	const [productComment, setProductComment] = useState<ProductCommentRequest>(
		{
			productId: productId,
			commentText: "",
			productScore: null,
		}
	);

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

	const { mutate: addComment } = useAddComment(
		() => setCommentAddState("success"),
		() => setCommentAddState("failure")
	);

	return (
		<div className={styles.formPopUp}>
			<div className={styles.formContainer}>
				<h1 className={utilsStyles.headingLg}>Add comment</h1>
				<InteractiveScores
					onSelectedScore={(score: number) => {
						setProductComment({
							...productComment,
							productScore: score,
						});
					}}
					currentScore={productComment.productScore ?? 0}
					starCount={STAR_COUNT}
				/>
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
							addComment(productComment);
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
