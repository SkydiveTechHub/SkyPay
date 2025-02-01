import React from "react";
import Link from "next/link";

const Error = () => {
	return (
		<div className="container min-h-[100vh]">
			<h2 className="text-[#020d1e] text-center text-[120px] md:text-[180px] lg:text-[280px] leading-[160px] lg:leading-[250px] font-[800] font-int mt-[100px] lg:mt-[150px]">
				404
			</h2>
			<p className="text-center text-[#242331] text-[50px] lg:text-[70px] leading-[60px] lg:leading-[77px] font-[800] mb-[28px] font-int">
				Page Not Found
			</p>
			<p className="text-center text-[#797979] text-[22px] font-[400] leading-[34.628px] w-[100%] lg:w-[65%] mx-auto">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis congue
				pretium faucibus leo nisl nulla pharetra nullam.
			</p>
			<div className="text-center">
				<Link
					href="/"
					className="bg-[#020d1e] mt-[34px] mb-[40px] rounded-[39px] py-[20px] px-[54px] inline-block text-[#fff] text-[16px] font-[600] font-int leading-normal"
				>
					Homepage
				</Link>
			</div>
		</div>
	);
};

export default Error;
