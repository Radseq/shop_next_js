import React, { useState } from "react";
import styles from "./PageFooter.module.css";
import { StyledInput } from "../StyledInput";
import Image from "next/image";
import classNames from "classnames";

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [emailPostResult, setEmailPostResult] = useState<
		boolean | undefined
	>();

	const sendEmailToApi = async () => {
		let res = await fetch(
			`http://localhost:3000/api/newsletter/newsletter/`,
			{
				method: "POST",
				body: JSON.stringify({
					email: email,
				}),
			}
		);
		let resJson = await res.json();
		if (res.status === 200) {
			setEmailPostResult(true);
		} else {
			setEmailPostResult(false);
		}
	};

	return (
		<div className={styles.newsLetter}>
			<span>Newsletter:</span>
			<p>
				Sign up to receive promotion code, and information about new
				promotions
			</p>
			<form>
				<StyledInput
					type="email"
					name="email"
					placeholder="Type email"
					required
					kind="primary"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						sendEmailToApi();
					}}
				>
					Sign up
				</button>
			</form>
			<div
				className={classNames(
					styles.newsLetterMessage,
					emailPostResult == true && styles.success,
					emailPostResult == false && styles.fail
				)}
			>
				{emailPostResult && "Saved in"}
				{emailPostResult == false
					? "Fail, please try again later"
					: null}
			</div>
		</div>
	);
};

export const PageFooter = () => {
	const phoneNumber = "12 234 212 231";
	const email = "some_email@gm.pl";

	return (
		<div className={styles.footer}>
			<div className={styles.main}>
				<Newsletter />
			</div>
			<div className={styles.side}>
				<div className={styles.contact}>
					<span>Contact</span>
					<div className={styles.icon}>
						<Image
							src="/images/phone.png"
							alt="phone icon"
							width="40"
							height="40"
						/>
						<a href={"tel:" + phoneNumber}>{phoneNumber}</a>
					</div>
					<div className={styles.daysHours}>
						<div>
							<span>mon.-fri.</span>
							<span>sat.-sun.</span>
						</div>
						<div>
							<span>8:00 - 20:00</span>
							<span>8:00 - 18:00</span>
						</div>
					</div>
				</div>
				<div className={styles.icon}>
					<Image
						src="/images/email.png"
						alt="email icon"
						width="40"
						height="40"
					/>
					<a href={"mailto:" + email}> {email}</a>
				</div>
				<div className={styles.icon}>
					<Image
						src="/images/pin.png"
						alt="phone icon"
						width="40"
						height="40"
					/>
					<a href="/contact">Our shoop</a>
				</div>
			</div>
		</div>
	);
};
