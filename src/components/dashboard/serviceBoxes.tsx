import { ReactNode } from "react";
import React from "react";
import AirtimeSB from "./serviceBox/AirtimeSB";
import DataSB from "./serviceBox/DataSB";
import CableSB from "./serviceBox/CableSB";
import ElectricSB from "./serviceBox/ElectricSB";
import InternetSB from "./serviceBox/InternetSB";
import ResultSB from "./serviceBox/ResultSB";

interface servicetype {
	img: string;
	text: string;
}

const services: servicetype[] = [
	{
		img: "images/svgs/buyairtime.svg",
		text: "Buy Airtime",
	},
	{
		img: "images/svgs/buydata.svg",
		text: "Buy Data",
	},
	{
		img: "images/svgs/cabletv.svg",
		text: "Cable TV",
	},
	{
		img: "images/svgs/payelect.svg",
		text: "Pay Electricity",
	},
	{
		img: "images/svgs/broadbrand.svg",
		text: "Broadband Internet",
	},
	{
		img: "images/svgs/resultcheck.svg",
		text: "Result Checker",
	},
];

const ServiceBoxes = () => {
	return (

		<div className="grid justify-center grid-cols-2 w-[100%] gap-4 md:grid md:grid-cols-3 md:gap-4 items-center md:space-x-3">

			<AirtimeSB />
			<DataSB />
			<CableSB />
			<ElectricSB />
			<InternetSB />
			<ResultSB />
		</div>
	);
};

export default ServiceBoxes;
