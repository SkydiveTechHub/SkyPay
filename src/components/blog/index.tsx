import React from "react";
import Image from "next/image";
import Link from "next/link";

interface blogtype {
	img: string;
	btn1: string;
	btn2: string;
	date: string;
	title: string;
	paragraph: string;
	link: string;
}

const blogs: blogtype[] = [
	{
		img: "images/png/blog1.png",
		btn1: "Marketing",
		btn2: "Analysis",
		date: "November 15, 2022",
		title: "10 Top tips for making your Saas product sticky",
		paragraph:
			"It is a long established fact that a reader will be distracted by the readable content of a page from when looking at it layout. The point of using Lorem Ipsum",
		link: "Read More",
	},
	{
		img: "images/png/blog2.png",
		btn1: "Marketing",
		btn2: "Analysis",
		date: "November 16, 2022",
		title: "How to identify growth KPIs that are relevant",
		paragraph:
			"It is a long established fact that a reader will be distracted by the readable content of a page from when looking at it layout. The point of using Lorem Ipsum",
		link: "Read More",
	},
	{
		img: "images/png/blog3.png",
		btn1: "Marketing",
		btn2: "Analysis",
		date: "November 17, 2022",
		title: "Is it worth it to build a mobile app for your business?",
		paragraph:
			"It is a long established fact that a reader will be distracted by the readable content of a page from when looking at it layout. The point of using Lorem Ipsum",
		link: "Read More",
	},
	{
		img: "images/png/blog4.png",
		btn1: "Marketing",
		btn2: "Analysis",
		date: "November 18, 2022",
		title: "How to choose the right app reseller program",
		paragraph:
			"It is a long established fact that a reader will be distracted by the readable content of a page from when looking at it layout. The point of using Lorem Ipsum",
		link: "Read More",
	},
	{
		img: "images/png/blog5.png",
		btn1: "Marketing",
		btn2: "Analysis",
		date: "November 19, 2022",
		title: "5 Top tips for making your Saas product sticky",
		paragraph:
			"It is a long established fact that a reader will be distracted by the readable content of a page from when looking at it layout. The point of using Lorem Ipsum",
		link: "Read More",
	},
	{
		img: "images/png/blog6.png",
		btn1: "Marketing",
		btn2: "Analysis",
		date: "November 20, 2022",
		title: "5 Technologies that are true student helpers these days",
		paragraph:
			"It is a long established fact that a reader will be distracted by the readable content of a page from when looking at it layout. The point of using Lorem Ipsum",
		link: "Read More",
	},
];

const Blog = () => {
	return (
		<section className="container">
			<div className="text-center mt-[150px]">
				<h1 className="text-[#242331] text-[50px] md:text-[55.071px] font-[800] font-int leading-[110%] mb-[15px]">
					News & Articles
				</h1>
				<p className="text-[#4F4F4F] text-[17px] md:text-[18.357px] font-[400] font-int leading-[157.4%] w-[100%] lg:w-[48%] mx-auto">
					Lorem ipsum dolor sit amet consectetur adipiscing elit interdum
					ullamcorper sed pharetra sene.
				</p>
			</div>
			<div className="grid grid-cols-1 justify-center items-center gap-y-[50px]  md:gap-x-[50px] mt-[29.37px] max-w-[1200px] w-[100%] mx-auto lg:grid-cols-2">
				{blogs?.map((blog) => (
					<BlogItems
						key={blog.title}
						img={blog.img}
						btn1={blog.btn1}
						btn2={blog.btn2}
						date={blog.date}
						title={blog.title}
						paragraph={blog.paragraph}
						link={blog.link}
					/>
				))}
			</div>
		</section>
	);
};

const BlogItems: React.FC<blogtype> = ({
	img,
	btn1,
	btn2,
	date,
	title,
	paragraph,
	link,
}) => {
	const containerStyle = {
		backgroundImage: `url(${img})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		transition: "transform 0.3s ease-in-out",
	};
	return (
		<div className="bg-[#F9F9F9] rounded-[36.714px] md:p-[30.11px] p-[25px] w-[100%] mx-auto overflow-hidden">
			<div
				style={containerStyle}
				className="w-[100%] md:w-[100%] h-[248.189px] rounded-[20px] md:rounded-[29.371px] p-[30px] mx-auto relative"
			>
				<div className="absolute block bottom-[20px] left-[20px] text-[#242331] font-int text-[13px] font-[600] mx-auto">
					<span className="mr-[10px] lg:mb-[0] mb-[20px] rounded-[28.637px] bg-[#fff] py-[11px] px-[30px] inline-block">
						{btn1}
					</span>
					<span className="rounded-[28.637px] bg-[#fff] py-[11px] px-[30px]">
						{btn2}
					</span>
				</div>
			</div>

			<div className="mt-[33px]">
				<p className="text-[#4F4F4F] font-int text-[13px] font-[400] leading-[157.4%]">
					{date}
				</p>
				<h3 className="text-[#242331] font-int text-[25px] md:text-[29.371px] font-[800] leading-[123%] mt-[15px]">
					{title}
				</h3>
				<p className="text-[#4F4F4F] text-[14px] md:text-[16px] font-[400] leading-[157.4%] font-int mt-[13.2px] mb-[28px]">
					{paragraph}
				</p>
				<Link
					href=""
					className="text-[#242331] focus:text-[#020d1e] text-[13.2px] font-[700] underline leading-normal font-int"
				>
					{link}
				</Link>
			</div>
		</div>
	);
};

export default Blog;
