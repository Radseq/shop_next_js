export type Description = {
	id: number;
	imageUrl: string;
	description: string;
	title: string;
};

export type Specification = {
	main: Record<string, string[]>;
	other: Record<string, string[]>;
};

export type ProductProps = {
	id: number;
	name: string;
	description: string;
	imageSrc: string;
	price: number;
	scoreValue: number;
	priceDiscount: number;
	quantity: number;
	descriptions: Description[];
	specification: Specification;
	installmentPrice?: number;
	freeDelivery: boolean;
	scores: Record<number, number>;
};

export type ProductComments = {
	allCommentsCount: number;
	comments: CommentProps[];
};

export type CommentProps = {
	id: number;
	username: string;
	avatarImgScr: string;
	addDate: string;
	comment: string;
	score: number;
	helpfullCommentCount: number;
	unhelpfulCommentCount: number;
	addTimeToServerTimeDiffrenceText: string;
};
