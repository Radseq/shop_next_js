import axios from "axios";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { StarScore } from "../StarScore";
import Image from "next/image";
import styles from "./SearchedProducts.module.css";
import { SearchProduct, SearchResult } from "./Types";
import Link from "next/link";

const AdditionalProducts: FC<{
	products?: SearchProduct[];
	groupName: string;
}> = ({ products, groupName }) => {
	if (!products) {
		return null;
	}

	return (
		<div className={styles.searchProducts}>
			<span>{groupName}</span>
			<ul>
				{products.map((product) => {
					return (
						<li key={product.id}>
							<Link href={`/products/${product.id}`}>
								<div className={styles.product}>
									<Image
										width="70"
										height="70"
										src={product.imgSrc}
										alt="product"
									/>
									<div>
										<span className={styles.productTitle}>
											{product.name}
										</span>
										<div className={styles.score}>
											<StarScore
												score={product.score}
												starCount={10}
											/>
										</div>
										<span>{product.price} pln</span>
									</div>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export const SearchedProducts: FC<{ search: string; callback: () => void }> = ({
	search,
	callback,
}) => {

	// todo hook to do function every x instead every key press
	const fetchData = () =>
		axios
			.get(`http://localhost:3000/api/product/search/${search}/`)
			.then(({ data }) => data);

	const { isSuccess, data, isLoading, isError } = useQuery(
		["getSearchResult"],
		() => fetchData(),
		{
			enabled: search.length > 0,
			staleTime: 0,
		}
	);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {data.error.message}</span>;
	}

	const searchResultQuery: SearchResult = data;

	if (isSuccess && searchResultQuery) {
		return (
			<div className={styles.searchResults} onMouseLeave={callback}>
				<ul>
					{searchResultQuery.productSearchResult.map((product) => {
						return (
							<li key={product.id + product.name}>
								<Link href={`/products/${product.id}`}>
									{product.name}
									<span>{product.price} pln</span>
								</Link>
							</li>
						);
					})}
				</ul>
				{searchResultQuery.lastSeenProducts ? (
					<AdditionalProducts
						groupName="Last Seen"
						products={searchResultQuery.lastSeenProducts}
					/>
				) : (
					<AdditionalProducts
						groupName="Recomended Products"
						products={searchResultQuery.recomendedProducts}
					/>
				)}
			</div>
		);
	}
	return null;
};
