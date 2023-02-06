import { GetStaticProps, GetStaticPaths } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

export const fetchData = (id: string) =>
	axios.get(`http://localhost:3000/api/post/${id}/`).then(({ data }) => data);

export const Post = () => {
	const router = useRouter();
	const dummyDataID =
		typeof router.query?.id === "string" ? router.query.id : "";

	const {
		isSuccess,
		data: dummyData,
		isLoading,
		isError,
	} = useQuery(["getDummyData", dummyDataID], () => fetchData(dummyDataID), {
		enabled: dummyDataID.length > 0,
		staleTime: Infinity,
	});

	return (
		<div>
			<p>{dummyData.id}</p>
			<p>{dummyData.date}</p>
			<p>{dummyData.title}</p>
		</div>
	);
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id = params?.id as string;

	const queryClient = new QueryClient();
	console.log("id: ", id);
	await queryClient.prefetchQuery(["getDummyData", id], () => fetchData(id));
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
