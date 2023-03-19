import { isValid } from "@/lib/email";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/prisma";

const addNewsletterEmail = async (email: string) => {
	if (await isEmailExists(email)) return false;

	const add = await prisma.newsletter.create({
		data: {
			email: email,
			addDate: new Date(),
		},
	});

	return add.id ?? false;
};

const isEmailExists = async (email: string) => {
	const alreadyExistsEmail = await prisma.newsletter.findUnique({
		where: {
			email: email,
		},
	});
	return alreadyExistsEmail;
};

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, method } = req;

	const incomeEmail: { email: string } = JSON.parse(req.body);

	switch (method) {
		case "POST":
			//req.body.email not working
			const parseResult = isValid(incomeEmail.email);

			if (!parseResult) {
				return res.status(400).send("Invalid email address");
			}

			const result = await addNewsletterEmail(incomeEmail.email);
			if (result) {
				res.send(200);
			} else {
				res.status(500).send({
					error: `Email already exists!`,
				});
			}
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
