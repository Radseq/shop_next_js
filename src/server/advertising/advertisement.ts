import { prisma } from "prisma/prisma"

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
	})
	return allAdvertisements
}

export const getAdvertisement = async () => {
	return await getAllAdvertisementFromDB()
}
