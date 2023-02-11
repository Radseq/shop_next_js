import { PageFooter } from "@/components/footer/PageFooter";
import { Navigation } from "@/components/header/Navigation";
import { TopBar } from "@/components/header/TopBar";
import { News } from "@/components/homePage/News";
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/MainPageBody.module.css";
import { RootNavigation } from "@/components/header/Types";
import { ImageToSlide } from "@/components/homePage/Types";
import { SeparateSection } from "@/components/homePage/SeparateSection";

export default function Home(props: {
	navigationData: RootNavigation[];
	advertisementData: ImageToSlide[];
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
			<main>
				<div className={styles.webMain}>
					<header>
						<TopBar />
						<Navigation navigations={props.navigationData} />
					</header>
					<main>
						<div className={styles.mainPageBody}>
							<News advertising={props.advertisementData} />
							<SeparateSection sectionName="Recomended products" />
						</div>
					</main>
					<footer>
						<PageFooter />
					</footer>
				</div>
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const navigationsResult = await fetch(
		"http://localhost:3000/api/navigation/navigation/"
	);
	const navigations = await navigationsResult.json();

	const advertisingResult = await fetch(
		"http://localhost:3000/api/advertising/advertisement/"
	);
	const advertisement = await advertisingResult.json();
	return {
		props: {
			navigationData: navigations,
			advertisementData: advertisement,
		},
	};
};
