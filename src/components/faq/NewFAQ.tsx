import React from "react";
import { useState } from "react";
import styles from "./faq.module.css";

interface FaqItem {
	title: string;
	text: string;
}


const faqs: FaqItem[] = [
	{
		title: "Is my personal information secure with Skypay?",
		text: "Yes, we prioritize the security of your personal information and use advanced encryption methods to protect it.",
	},
	{
		title: "Can I use the same account on multiple devices?",
		text: "Yes, you can access your Skypay account from multiple devices for added convenience.",
	},
	{
		title: "What should I do if I forget my password?",
		text: "You can easily reset your password through the app by following the forgot password link.",
	},
	{
		title: "How can I contact customer support if I have an issue?",
		text: "You can reach our customer support team via phone, email, or through the in-app chat feature.",
	},
	{
		title: "Is there a minimum amount required to add funds to my Skypay account?",
		text: "No, there is no minimum amount required to add funds to your Skypay account.",
	},

];



const NewFaq = () => {
	const [curOpen, SetCurOpen] = useState<number | null>(null);
	return (
		<section className=" px-4 py-20 w-full ">
			<h2 className="  text-center text-[#020d1e] text-[24px] md:text-[40px] font-[600] font-int leading-[44px] mb-6">
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
			{/* <p className={styles.number}>{numb < 9 ? `0${numb + 1}` : numb + 1}</p> */}
			<div className={styles.header}>
			<p className={styles.title}>{title}</p>
			<p className={styles.icon}>{isOpen ? "-" : "+"}</p>			
			</div>

			<div className={styles.contentBox}>{isOpen && <div>{text}</div>}</div>
		</div>
	);
};
export default NewFaq;
