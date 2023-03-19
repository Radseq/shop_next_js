export type Description = {
	id: number;
	imageSrc: string;
	description: string;
	title: string;
};

export type Specification = {
	main: Record<string, string>;
	other: Record<string, string>;
};

export type Product = {
	id: number;
	name: string;
	description: string;
	imageSrc: string;
	price: number;
	discountPrice: number;
	quantity: number;

	installmentPrice?: number;
	freeDelivery: boolean;
};

export type ProductPage = {
	product: Product;
	specifications: Specification;
	descriptions: Description[];
	scores: Record<number, number>;
	comments: ProductComments;
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
