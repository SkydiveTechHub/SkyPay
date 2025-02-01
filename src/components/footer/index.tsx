import Image from "next/image";
import Link from "next/link";
import React from "react";
import Text from "../shared/Text/text";

interface socials {
	href: string;
	src: string;
	alt: string;
}

interface footerLinks {
	title: string;
	links: any[];
}

const SocialLink = ({ href, src, alt }: socials) => (
	<Link href={href}>
		<Image width={25} height={25} src={src} alt={alt} />
	</Link>
);

const FooterLinkList = ({ title, links }: footerLinks) => (
	<div className="mt-4">
		<p className="text-[#28C0F1] font-[700] mb-3 md:mb-[2rem] sm:text-[18px] text-[14px]">
			{title}
		</p>
		<ul className="text-[#fff]">
			{links?.map((link, index) => (
				<li key={index} className="mb-3 sm:text-[16px] text-[12px] ">
					<Link href={link.href}>{link.text}</Link>
				</li>
			))}
		</ul>
	</div>
);

const Footer = () => {
	const socialLinks = [
		{ href: "", src: "images/svgs/fb.svg", alt: "Facebook" },
		{ href: "", src: "images/svgs/IG.svg", alt: "Instagram" },
		{ href: "", src: "images/svgs/LK.svg", alt: "LinkedIn" },
		{ href: "", src: "images/svgs/Mes.svg", alt: "Messenger" },
		{ href: "", src: "images/svgs/twitter_x.svg", alt: "Twitter" },
	];

	const serviceLinks = [
		{ href: "", text: "About Us" },
		{ href: "", text: "Product" },
		{ href: "/#testimonial", text: "Testimonial" },
	];

	const resourceLinks = [
		{ href: "/faq", text: "FAQ" },
		{ href: "/blog", text: "Blog" },
		{ href: "/privacy", text: "Private Policy" },
		{ href: "/tos", text: "Terms of Service" },
	];


	const contactLinks = [
		{ href: "", text: "Buy Airtime" },
		{ href: "", text: "Buy Data" },
		{ href: "", text: "Subscribe Cable Tv" },
		{ href: "", text: "Pay for Electricity" },
		{ href: "", text: "Result Checker" },
		{ href: "", text: "Broadband Internet" },
	];

	return (
		<footer className="lg:w-screen bg-pryColor justify-between pt-16">
			<div className="container flex justify-between flex-col lg:flex-row pb- max-w-[1440px] mx-auto">
				<div className="w-[100%] md:w-[90%] lg:w-[30%]">
					<div>
						<img
							className="w-[180px] h-[60px]"
							src="/images/png/LOGOF.png"
							alt="logo"
						/>
					</div>
					<div className="mt-10 mb-4 ">
						<Text
							color="#fff"
							weight="200"
							family="inter"
							text="Skypay is your all-in-one digital platform, enabling seamless, immediate payment of utility bills, airtime top-ups, and data purchases for your everyday needs."
						/>
						<div className="hidden md:flex gap-4 items-center mt-12 ">
							{socialLinks?.map((link, index) => (
								<SocialLink
									key={index}
									href={link.href}
									src={link.src}
									alt={link.alt}
								/>
							))}
						</div>
					</div>
				</div>
				<FooterLinkList title="Company" links={serviceLinks} />
				<FooterLinkList title="Resources" links={resourceLinks} />
				<FooterLinkList title="Services" links={contactLinks} />
				<div className="flex md:hidden space-x-6 items-center mt-6 mb-6 ">
					{socialLinks?.map((link, index) => (
						<SocialLink
							key={index}
							href={link.href}
							src={link.src}
							alt={link.alt}
						/>
					))}
				</div>
			</div>
			<div className="flex justify-center items-center border-t border-t-[#fff] py-4">
				<div className="text-center py-4 w-[80%] md:w-[40%]">
					<p className="text-[#fff] opacity-[0.6] sm:text-[18px] text-[12px]">
						Copyright @Skypay2023. All Right Reserved.{" "}
						<span className="font-[700]">
							Skypay is a registered trademark of CDLP Hub Ltd.
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
