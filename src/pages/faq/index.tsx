import React from "react";
import { ReactElement } from "react";
import LandingPageLayout from "@/components/layout/landingPageLayout";
import Faq from "@/components/faq";

const FaqPage = () => {
	return (
		<LandingPageLayout>
			<div style={{ background: "rgba(40, 192, 241, 0.11)" }}>
				<Faq />
			</div>
		</LandingPageLayout>
	);
};
FaqPage.getLayout = (Page: ReactElement) => {
	return <>{Page}</>;
};
export default FaqPage;
