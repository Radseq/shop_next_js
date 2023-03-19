import { GetStaticProps } from "next";
import { Description, ProductDate } from "@/components/productPage/Types";
import { FC } from "react";
import styles from "./Product.module.css";
import { StarScore } from "@/components/StarScore";
import { ShowSpecifications } from "@/components/productPage/ShowSpecifications";
import { BuyPanel } from "@/components/productPage/BuyPanel";
import { ScorePanel } from "@/components/productPage/ScorePanel";
import { CommentsPanel } from "@/components/productPage/Comments";
import { Layout } from "@/components/Layout";
import { RootNavigation } from "@/components/header/Types";
import Image from "next/image";
import { getNavigation } from "@/server/navigation";
import { getProductById } from "@/server/products/product";
import { getCacheData, setCacheData } from "@/cache";

const ProductDescriptions: FC<{ descriptions: Description[] }> = (props) => {
	return (
		<div>
			{props.descriptions.map((desc) => {
				return (
					<div key={desc.id} className={styles.description}>
						<img src={desc.imageSrc} alt="icon"></img>
						<p>{desc.description}</p>
					</div>
				);
			})}
		</div>
	);
};

export default function Product(props: {
	navigation: RootNavigation[];
	productData: ProductDate;
}) {
	const { product, specifications, scores } = props.productData;

	const votesCount = Object.values(scores).reduce(
		(prev, curr) => prev + curr,
		0
	);

	const averageVoteValue = Object.entries(scores)
		.map(([key, value]) => {
			return Number(key) * value;
		})
		.reduce((a, b) => a + b, 0);

	const weightedAverage = averageVoteValue / votesCount;

	return (
		<Layout navigation={props.navigation}>
			<div className={styles.header}>
				<Image
					width="600"
					height="600"
					src={product.imageSrc}
					alt={product.name}
				/>
				<div className={styles.asidePanel}>
					<div className={styles.asideHeader}>
						<h2>{product.name}</h2>
						<div className={styles.scores}>
							<StarScore score={weightedAverage} starCount={10} />
							<span>({votesCount} opinions)</span>
						</div>
					</div>
					<div className={styles.asideContent}>
						<div className={styles.specificationsMain}>
							{specifications && (
								<ShowSpecifications
									specifications={specifications}
									isMain={true}
									className={styles.specificationsMain}
								/>
							)}
						</div>
						<BuyPanel purchasedProduct={product} />
					</div>
				</div>
			</div>
			<ProductDescriptions
				descriptions={props.productData.descriptions}
			/>
			<h2>Specification</h2>
			<div className={styles.specificationsOther}>
				{specifications && (
					<ShowSpecifications
						specifications={specifications}
						isMain={false}
						className={styles.specificationsOther}
					/>
				)}
			</div>
			<div className={styles.comments}>
				<hr />
				<h2>Opinions</h2>
				<ScorePanel
					votesCount={votesCount}
					scores={scores}
					productName={product.name}
					averageVote={weightedAverage}
				/>
				<hr />
				<CommentsPanel productId={Number(product.id)} />
			</div>
			<hr />
		</Layout>
	);
}

export const getServerSideProps: GetStaticProps = async ({ params }) => {
	const id = params?.id as string;

	const cacheKey = "productPage" + id;
	let cacheResult = await getCacheData(cacheKey);
	if (cacheResult) {
		cacheResult = JSON.parse(cacheResult);
	} else {
		const [navigation, productData] = await Promise.all([
			getNavigation(),
			getProductById(parseInt(id)),
		]);
		cacheResult = {
			navigation,
			productData,
		};
		await setCacheData(cacheKey, JSON.stringify(cacheResult));
	}

	return {
		props: cacheResult,
	};
};
