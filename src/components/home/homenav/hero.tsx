import React from "react";
import Button from "@/components/shared/Button/button";
import Image from "next/image";
import Link from "next/link";
import DownloadBtn from "@/components/shared/DownloadBtn";

function Hero() {
	return (
		<div  className="sm:pt-0 pt-[116px] z-[-1]">
			<div className="md:flex mx-auto justify-between pt-[40px] items-center w-[85%] min-h-[100vh] ">
				<div className="max-w-[444px]">
					<h1 className="text-[#000] font-rope sm:text-[44.914px] text-[30px] sm:text-left text-center font-[800] sm:leading-[65.33px] leading-[40px] sm:tracking-[-1.347px] tracking-[-0.9px] ">
						Nigeria’s No.1 Choice For{" "}
						<span className="text-[#28C0F1]">
							{" "}
							<span >Airtime,</span> Data{" "}
							<span >And</span>{" "}
							<span >Bills Payment</span>
						</span>
					</h1>
					<p className="sm:mt-0 mt-[10px] text-[#000111] sm:text-left text-center sm:text-[18px] text-[14px] max-w-[420px] mb-8">
						We simply make you stay connected online, with friends and family
						and paying bills effortlessly.
					</p>
					<div className="mt-[36px] flex sm:justify-start justify-center ">
						<Link href='/register'>
						<Button
							px="12px"
							py="12px"
							width={"180px"}
							height={"47px"}
							bgcolor="#020d1e"
							border="2px solid #020d1e"
							fontsize={"15px"}
							fontWeight={700}
							textColor="#fff"
							text="Get Started"
							rounded="12px"
						/>
						</Link>
					</div>
					{/* <DownloadBtn/> */}
				</div>

				<div
					className="sm:mt-0 mt-[30px]"
					data-aos="fade-zoom-in"
					data-aos-easing="ease-in"
					data-aos-duration="300"
				>
					<img
						className="max-w-[100%] w-[500px]"
						src={"/images/png/heroPhone.png"}
						alt="hero-image"
					/>
				</div>
			</div>
		</div>
	);
}

export default Hero;
