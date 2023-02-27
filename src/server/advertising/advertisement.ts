import { getCacheData, setCacheData } from "@/cache";
import { prisma } from "prisma/prisma";

const getAllAdvertisementFromDB = async () => {
	const allAdvertisements = await prisma.advertisement.findMany({
		select: {
			id: true,
			name: true,
			description: true,
			imageSrc: true,
		},
		where: {
			expiredDate: {
				gte: new Date(),
			},
		},
	});
	return allAdvertisements;
};

export const getAdvertisement = async () => {
	const advertisements = await getAllAdvertisementFromDB();

	let result = await getCacheData("advertisement");
	if (result) {
		result = JSON.parse(result);
	} else {
		result = advertisements;
		await setCacheData("advertisement", JSON.stringify(result));
	}

	return result;
};
