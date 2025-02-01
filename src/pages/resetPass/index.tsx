import React from "react";
import { ReactElement } from "react";
import ResetPass from "@/components/resetPass";


const ResetPassPage = () => {
	return (
		
			<div style={{ background: "rgba(40, 192, 241, 0.11)" }}>
				<ResetPass />
			</div>
	
	);
};
ResetPassPage.getLayout = (Page: ReactElement) => {
	return <>{Page}</>;
};
export default ResetPassPage;
