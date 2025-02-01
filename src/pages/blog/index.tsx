import React from "react";
import { ReactElement } from "react";
import LandingPageLayout from "@/components/layout/landingPageLayout";
import Blog from "@/components/blog";

const BlogPage = () => {
	return (
		<LandingPageLayout>
			<div>
				<Blog />
			</div>
		</LandingPageLayout>
	);
};
BlogPage.getLayout = (Page: ReactElement) => {
	return <>{Page}</>;
};
export default BlogPage;
