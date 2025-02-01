import React from "react";
import { useState } from "react";

interface FaqItem {
	title: string;
	text: string;
}

const faqs: FaqItem[] = [
	{
		title: "What is Skypay?",
		text: "Getting started is to create an account and activate, thereafter, you fund your wallet and you are good to utilize the services. Welcome onboard!",
	},
	{
		title: "How many hours do you operate?",
		text: "Make sure you fill in the correct details, fund your wallet via the provided account details. Thereafter, you are good.",
	},
	{
		title: "Is there a time frame for making payments?",
		text: "It takes less than 15 seconds to get a response after each purchase.",
	},
	{
		title: "Are there any charges? ",
		text: "You’d have to fund a minimum of 200 Naira in your wallet after your account has been activated.",
	},
];
const Faq = () => {
	const [curOpen, SetCurOpen] = useState<number | null>(null);
	return (
		<>
			<h2 className="mt-[30px] text-[#333333] mb-5 text-[28px] font-[700] leading-[44px]">
				Frequently Asked Questions
			</h2>
			<div className="flex flex-col gap-10 mb-16">
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
		</>
	);
};

export default Faq;

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
			className="cursor-pointer border-b-[3px] font-int border-[#E0E4EC] pb-5"
			onClick={handleClick}
		>
			<div className="flex gap-4  text-[#333333] font-[500] text-[20px]">
				<p className="">{numb < 9 ? `0${numb + 1}` : numb + 1}</p>
				<p className="flex-1">{title}</p>
				<p className="text-[26px]">{isOpen ? "-" : "+"}</p>
			</div>

			<div className="pl-[42px] pr-4  text-[#333333] font-[400] text-[18px]">
				{isOpen && <div>{text}</div>}
			</div>
		</div>
	);
};
