import { z } from "zod";

const EMAIL_VERIFIER = z.coerce
	.string()
	.email({ message: "Invalid email address" })
	.min(10, { message: "Email is too short" });

export const isValid = (email: string) =>
	EMAIL_VERIFIER.safeParse(email).success;
