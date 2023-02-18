import { GetStaticProps, GetStaticPaths } from "next";
import { Description, ProductProps } from "@/components/productPage/Types";
import { FC } from "react";
import styles from "./Product.module.css";
import { StarScore } from "@/components/StarScore";
import { ShowSpecifications } from "@/components/productPage/ShowSpecifications";
import { BuyPanel } from "@/components/productPage/BuyPanel";
import axios from "axios";
import { ScorePanel } from "@/components/productPage/ScorePanel";
import { CommentsPanel } from "@/components/productPage/Comments";
import { Layout } from "@/components/Layout";
import { RootNavigation } from "@/components/header/Types";
import Image from "next/image";
import { getNavigation } from "@/server/navigation";
import { getProduct } from "@/server/product";

const ProductDescriptions: FC<{ descriptions: Description[] }> = (props) => {
	return (
		<div>
			{props.descriptions.map((desc) => {
				return (
					<div key={desc.id} className={styles.description}>
						<img src={desc.imageUrl} alt="icon"></img>
						<p>{desc.description}</p>
					</div>
				);
			})}
		</div>
	);
};

export default function Product(props: {
	navigation: RootNavigation[];
	product: ProductProps;
}) {
	const votesCount = Object.values(props.product.scores).reduce(
		(prev, curr) => prev + curr,
		0
	);
	return (
		<Layout navigation={props.navigation}>
			<div className={styles.header}>
				<Image
					width="600"
					height="600"
					src={props.product.imageSrc}
					alt={props.product.name}
				/>
				<div className={styles.asidePanel}>
					<div className={styles.asideHeader}>
						<h2>{props.product.name}</h2>
						<div className={styles.scores}>
							<StarScore
								score={props.product.scoreValue}
								starCount={10}
							/>
							<span>({votesCount} opinions)</span>
						</div>
					</div>
					<div className={styles.asideContent}>
						<div className={styles.specificationsMain}>
							<ShowSpecifications
								specifications={props.product.specification}
								isMain={true}
								className={styles.specificationsMain}
							/>
						</div>
						<BuyPanel purchasedProduct={props.product} />
					</div>
				</div>
			</div>
			<ProductDescriptions descriptions={props.product.descriptions} />
			<h2>Specification</h2>
			<div className={styles.specificationsOther}>
				<ShowSpecifications
					specifications={props.product.specification}
					isMain={false}
					className={styles.specificationsOther}
				/>
			</div>
			<div className={styles.comments}>
				<hr />
				<h2>Opinions</h2>
				<ScorePanel
					productScore={props.product.scoreValue}
					votesCount={votesCount}
					scores={props.product.scores}
					productName={props.product.name}
				/>
				<hr />
				<CommentsPanel productId={Number(props.product.id)} />
			</div>
			<hr />
		</Layout>
	);
}

export const getServerSideProps: GetStaticProps = async ({ params }) => {
	const id = params?.id as string;

	const [navigation, product] = await Promise.all([
		getNavigation(),
		getProduct(parseInt(id)),
	]);

	return {
		props: {
			navigation,
			product,
		},
	};
};
