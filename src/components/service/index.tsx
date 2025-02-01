import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./service.module.css";

interface ServiceBoxProps {
	icon: string;
	text: string;
	hoverIcon: string;
	hoverText: string;
}

// ServiceBox component
const ServiceBox: React.FC<ServiceBoxProps> = ({
	icon,
	text,
	hoverIcon,
	hoverText,
}) => {
	const [hovered, setHovered] = useState(false);

	const handleMouseEnter = () => {
		setHovered((hover) => !hover);
	};

	const handleMouseLeave = () => {
		setHovered((hover) => !hover);
	};
	const iconClass = hovered ? styles["hovered-icon"] : "";
	return (
		<div
			className={styles.containerr}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className={styles.icon}>
				{!hovered && <img src={icon} alt={text} className="iconImg" />}
				{hovered && <p>{hoverText}</p>}
				{/* {hovered && <Link href="/service">{hoverIcon}</Link>} */}
				{/* <img src={hovered ? hoverIcon : icon} alt={text} /> */}
			</div>
			{!hovered && <p>{text}</p>}
			{hovered && (
				<Link href="">
					<span className={iconClass}>{hoverIcon}</span>
				</Link>
			)}
			{/* <p>{hovered ? hoverText : text}</p> */}
		</div>
	);
};

// Services component renders a container for the service section.
// maps over the servicesData array and renders a ServiceBox for each service.
// data-aos attributes suggest the use of the AOS (Animate On Scroll) library for animation effects.
function Services() {
	return (
		<div id="service" className="container">
			<div className={styles.serviceContainer}>
				{servicesData?.map((service, index) => (
					<div
						key={index}
						data-aos="fade-up"
						data-aos-easing="ease-in-out"
						data-aos-duration="600"
						data-aos-delay={`${index * 100}`}
					>
						<ServiceBox
							icon={service.icon}
							text={service.text}
							hoverText={service.hoverText}
							hoverIcon={service.hoverIcon}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Services;

const servicesData = [
	{
		icon: "images/svgs/device.svg",
		text: "Buy Airtime",
		hoverText: "Mtn, Glo, Airtel, 9mobile",
		hoverIcon: "Buy Airtime",
	},
	{
		icon: "images/svgs/satellite-dish.svg",
		text: "Buy Data",
		hoverText: "Mtn, Glo, Airtel, 9mobile",
		hoverIcon: "Buy Data",
	},
	{
		icon: "images/svgs/solar_tv-bold.svg",
		text: "Subscribe Cable TV",
		hoverText: "Dstv, Gotv, Startimes",
		hoverIcon: "Subscribe Cable TV",
	},
	{
		icon: "images/svgs/healthicons_electricity.svg",
		text: "Pay for Electricity",
		hoverText: "Ibedc, Ekedc, Aedc",
		hoverIcon: "Pay for Electricity",
	},
	{
		icon: "images/svgs/zondicons_education.svg",
		text: "Result Checker",
		hoverText: "Waec, Neco, Nabteb, Utme ",
		hoverIcon: "Result Checker",
	},
	{
		icon: "images/svgs/pepicons-pop_internet-circle.svg",
		text: "Broadband Internet",
		hoverText: "Smile, Spectranet, e.t.c",
		hoverIcon: "Broadband Internet",
	},
];
