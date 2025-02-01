import React from "react";
import { useState } from "react";
import styles from "./faq.module.css";

interface FaqItem {
	title: string;
	text: string;
}

const faqs: FaqItem[] = [
	{
		title: "How Can I Get Started?",
		text: "Getting started is to create an account and activate, thereafter, you fund your wallet and you are good to utilize the services. Welcome onboard!",
	},
	{
		title: "I just signed up, how can I activate my account?",
		text: "Make sure you fill in the correct details, fund your wallet via the provided account details. Thereafter, you are good.",
	},
	{
		title: "How long will it take to get a response after every purchase?",
		text: "It takes less than 15 seconds to get a response after each purchase.",
	},
	{
		title: "How much is the minimum amount to fund a wallet?",
		text: "You’d have to fund a minimum of 200 Naira in your wallet after your account has been activated.",
	},
	{
		title: "Can I have more than one registered account?",
		text: "Yes, you can have more than one account but with different emails and usernames when during registration. ",
	},
	{
		title: "Why should I become a Skypay User?",
		text: "Using Skypay, you will be able to recharge airtime anyday, activate your data instantly after purchase, pay your Electricity bills and TV Subscription. Skypay is a secured platform to perform all the aforementioned services with no delays. Skypay is fast and simple to navigate with the provided information. There is an instant resolution in case you experience any issues. ",
	},
	{
		title: "Is there a subscription fee during registration?",
		text: "No, there is no subscription fee attached, only your wallet needs to be funded after a completed registration.",
	},
	{
		title: "Can I operate the account outside Nigeria?",
		text: "Yes, you can, just change your country in the setting.",
	},
	{
		title: "Can I withdraw my money from the wallet?",
		text: "No, the funds are not withdrawable, you can only use it for the services available on the platform. Enjoy!",
	},
	{
		title: "For funding my wallet on Skypay, will there be bank charges?",
		text: "Yes, but it will be minimal compared to others. More questions, we got you covered. ",
	},
	{
		title: "Who Can Use Skypay? ",
		text: "Any Android or Apple mobile user can use Skypay to recharge airtime, subscribe data and pay bills. We also offer earning opportunities for any intending agent to resell.",
	},
];
const Faq = () => {
	const [curOpen, SetCurOpen] = useState<number | null>(null);
	return (
		<section className="container">
			<h2 className="lg:mt-[150px] mt-[100px] mb-[30px] text-center text-[#020d1e] text-[40px] font-[800] leading-[44px]">
				Frequently Asked Questions
			</h2>
			<div className={styles.accordion}>
				{faqs?.map((el, i) => (
					<AccordionItem
						title={el.title}
						key={el.title}
						numb={i}
						curOpen={curOpen}
						onOpen={SetCurOpen}
						text={el.text}
					/>
				))}
			</div>
		</section>
	);
};

const AccordionItem: React.FC<{
	title: string;
	numb: number;
	text: string;
	curOpen: number | null;
	onOpen: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ title, numb, text, curOpen, onOpen }) => {
	const isOpen = numb === curOpen;

	function handleClick() {
		onOpen(isOpen ? null : numb);
	}
	return (
		<div
			className={`${styles.item} ${isOpen ? styles.open : ""}`}
			onClick={handleClick}
		>
			<p className={styles.number}>{numb < 9 ? `0${numb + 1}` : numb + 1}</p>
			<p className={styles.title}>{title}</p>
			<p className={styles.icon}>{isOpen ? "-" : "+"}</p>
			<div className={styles.contentBox}>{isOpen && <div>{text}</div>}</div>
		</div>
	);
};
export default Faq;
