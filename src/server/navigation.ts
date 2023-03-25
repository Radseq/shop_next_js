export async function getNavigation() {
	return [
		{
			id: 1,
			name: "Laptops",
			url: "/laptops",
			categories: [
				{
					id: 2,
					name: "Recommended product",
					subCategories: [],
					url: "recProd",
					product: {
						id: 1,
						name: "Some prod name",
						price: 23.24,
						imgUrl: "/products/10.png",
						descFirst: "description 1",
						descSecond: "description 2",
						descThird: "description 3",
					},
				},
				{
					id: 3,
					name: "2 in 1",
					url: "2in1",
					subCategories: [
						{
							id: 1,
							name: "Laptop 2 in 1 #1",
							linkUrl: "/Laptop2in11",
						},
						{
							id: 2,
							name: "Laptop 2 in 1 #2",
							linkUrl: "/Laptop2in12",
						},
						{
							id: 3,
							name: "Laptop 2 in 1 #3",
							linkUrl: "/Laptop2in13",
						},
					],
				},
				{
					id: 4,
					name: "NoterBooks",
					url: "NoterBooks",
					subCategories: [
						{
							id: 1,
							name: "NoterBooks #1",
							linkUrl: "/NoterBooks1",
						},
						{
							id: 2,
							name: "NoterBooks #2",
							linkUrl: "/NoterBooks2",
						},
						{
							id: 3,
							name: "NoterBooks #3",
							linkUrl: "/NoterBooks3",
						},
					],
				},
				{
					id: 5,
					name: "UltraBooks",
					url: "UltraBooks",
				},
			],
		},
		{
			id: 6,
			name: "Smartphones",
			url: "/smartphones",
			categories: [
				{
					id: 7,
					name: "Tablets",
					url: "/Tablets",
				},
				{
					id: 8,
					name: "Cases",
					url: "/Cases",
				},
				{
					id: 9,
					name: "Chargers",
					url: "/Chargers",
				},
			],
		},
	]
}
