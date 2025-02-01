import React from "react";
import { ReactElement } from "react";
import Error from "@/components/errorr";

const ErrorPage = () => {
	return (
			<div style={{ background: "rgba(40, 192, 241, 0.11)" }}>
				<Error></Error>
			</div>
	);
};
ErrorPage.getLayout = (Page: ReactElement) => {
	return <>{Page}</>;
};
export default ErrorPage;
