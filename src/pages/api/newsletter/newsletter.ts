import { isValid } from "@/lib/email"
import { addNewsletterEmail } from "@/server/newsletter/newsletter"
import type { NextApiRequest, NextApiResponse } from "next"

const postNewsLettersEmail = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { method } = req

	if (method !== "POST") {
		return res.status(405).end(`Method ${method} Not Allowed`)
	}

	const incomeEmail: { email: string } = JSON.parse(req.body)

	//req.body.email not working
	const parseResult = isValid(incomeEmail.email)

	if (!parseResult) {
		return res.status(400).send("Invalid email address")
	}

	const result = await addNewsletterEmail(incomeEmail.email)
	if (result) {
		return res.send(200)
	}

	return res.status(500).send({
		error: "Email already exists!",
	})
}

export default postNewsLettersEmail
