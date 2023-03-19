import { News } from "@/components/homePage/News";
import { GetStaticProps } from "next";
import Head from "next/head";
import { RootNavigation } from "@/components/header/Types";
import { ImageToSlide } from "@/components/homePage/Types";
import { SeparateSection } from "@/components/homePage/SeparateSection";
import { RecommendedProducts } from "@/components/homePage/recommendedProducts/RecommendedProducts";
import { RecommendedProduct } from "@/components/homePage/recommendedProducts/Types";
import { Promotions } from "@/components/homePage/promotions/Promotions";
import { Promotion } from "@/components/homePage/promotions/Types";
import { HitsOfTheWeek } from "@/components/homePage/hitsOfTheWeekSlider/HitsOfTheWeek";
import { HitOfWeekProduct } from "@/components/homePage/hitsOfTheWeekSlider/Types";
import { BestSellers } from "@/components/homePage/bestsellers/BestSellers";
import { BestsellerProduct } from "@/components/homePage/bestsellers/Types";
import { Layout } from "@/components/Layout";
import { getNavigation } from "@/server/navigation";
import { getPromotion } from "@/server/promotion";
import { getAllRecommendedProducts } from "@/server/recommendedProducts/recommendedProduct";
import { getAllBestsellerProducts } from "@/server/bestseller/bestseller";
import { getAdvertisement } from "@/server/advertising/advertisement";
import { getCacheData, setCacheData } from "@/cache";
import { getHitsOfWeekProducts } from "@/server/hitsOfTheWeek/hitsOfTheWeek";

export default function Home(props: {
	navigation: RootNavigation[];
	advertisement: ImageToSlide[];
	recommendedProducts: RecommendedProduct[];
	promotions: Promotion[];
	hitsOfTheWeekProducts: HitOfWeekProduct[];
	bestsellers: BestsellerProduct[];
}) {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout navigation={props.navigation}>
				<News advertising={props.advertisement} />
				<SeparateSection sectionName="Recomended products" />
				<RecommendedProducts
					recommendedProduct={props.recommendedProducts}
				/>
				<hr />
				<SeparateSection sectionName="Promotions" url="/promotions" />
				<Promotions promotionsData={props.promotions} />
				<hr />
				<SeparateSection
					sectionName="Hits of the week"
					url="/hitsoftheweek"
				/>
				<HitsOfTheWeek hitsOfTheWeek={props.hitsOfTheWeekProducts} />
				<hr />
				<SeparateSection sectionName="Bestsellers" url="/bestsellers" />
				<BestSellers products={props.bestsellers} />
				<hr />
			</Layout>
		</div>
	);
}

export const getServerSideProps: GetStaticProps = async ({}) => {
	const cacheKey = "homePage";
	let cacheResult = await getCacheData(cacheKey);
	if (cacheResult) {
		cacheResult = JSON.parse(cacheResult);
	} else {
		const [
			navigation,
			advertisement,
			recommendedProducts,
			promotions,
			hitsOfTheWeekProducts,
			bestsellers,
		] = await Promise.all([
			getNavigation(),
			getAdvertisement(),
			getAllRecommendedProducts([]),
			getPromotion(),
			getHitsOfWeekProducts(),
			getAllBestsellerProducts(),
		]);
		cacheResult = {
			navigation,
			advertisement,
			recommendedProducts,
			promotions,
			hitsOfTheWeekProducts,
			bestsellers,
		};
		await setCacheData(cacheKey, JSON.stringify(cacheResult));
	}

	return {
		props: cacheResult,
	};
};
