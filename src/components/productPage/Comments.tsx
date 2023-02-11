import { FC, useEffect, useState } from "react";
import styles from "./Comments.module.css";
import { CommentProps, ProductComments } from "./Types";
import { StarScore } from "../StarScore";
import { StyledButton } from "../StyledButton";
import { ThumbUp } from "../svg/ThumbUp";
import { ThumbDown } from "../svg/ThumbDown";
import axios from "axios";
import { useQuery } from "react-query";

const Comment: FC<{ commentProps: CommentProps }> = ({ commentProps }) => {
	return (
		<div className={styles.comment}>
			<div className={styles.userPanel}>
				<div className={styles.user}>
					<img src={commentProps.avatarImgScr} alt="avatar" />
					<span>{commentProps.username}</span>
				</div>
				<span>{commentProps.addDate}</span>
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<StarScore score={commentProps.score} starCount={10} />
					<span>{commentProps.addTimeToServerTimeDiffrenceText}</span>
				</div>
				<div className={styles.body}>{commentProps.commentText}</div>
				<div className={styles.footer}>
					<span>This opinion was helpful?</span>
					<button>
						<ThumbUp />
					</button>
					<span>{commentProps.helpfullCommentCount}</span>
					<button>
						<ThumbDown />
					</button>
					<span>{commentProps.unhelpfulCommentCount}</span>
				</div>
			</div>
		</div>
	);
};

export const CommentsPanel: FC<{ productId: number }> = ({ productId }) => {
	const [pageIndex, setPageIndex] = useState(1);
	const [productCommentsData, setProductCommentsData] =
		useState<ProductComments>();

	useEffect(() => {
		axios
			.get(
				`http://localhost:3000/api/product/comment/${productId}/${pageIndex}`
			)
			.then(({ data }) => {
				setProductCommentsData(data);
			});
	}, [pageIndex]);

	if (!productCommentsData) return null;

	const productComments = productCommentsData!;

	const loadNextComments = () => {
		setPageIndex(pageIndex + 1);
	};

	const loadPreviousComments = () => {
		setPageIndex(pageIndex - 1);
	};

	// todo below replace pageIndex with productCommentsQuery.data.pageIndex, when api will be written
	return (
		<div className={styles.commentsPanel}>
			<h2>
				User Opinions <span>({productComments.allCommentsCount})</span>
			</h2>
			<hr />
			<span>
				Results:{" "}
				{pageIndex * productComments.pageSize -
					productComments.pageSize}{" "}
				- {pageIndex * productComments.pageSize} of{" "}
				{productComments.allCommentsCount}{" "}
			</span>
			<hr />
			{productComments.comments.map((comment) => {
				return (
					<div key={comment.id}>
						<Comment commentProps={comment} />
						<hr />
					</div>
				);
			})}
			<div className={styles.pagining}>
				<span>Page:</span>
				{pageIndex > 1 && (
					<StyledButton onClick={loadPreviousComments} kind="primary">
						{" "}
						{pageIndex - 1}
					</StyledButton>
				)}
				<StyledButton onClick={loadPreviousComments} kind="secondary">
					{pageIndex}
				</StyledButton>
				{pageIndex * productComments.pageSize <
					productComments.allCommentsCount && (
					<StyledButton onClick={loadNextComments} kind="primary">
						{" "}
						{pageIndex + 1}
					</StyledButton>
				)}
			</div>
		</div>
	);
};
