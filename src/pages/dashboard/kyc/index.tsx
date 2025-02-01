import React from "react";
import Kyc1 from "@/components/dashboard/kyc1";
import Kyc2 from "@/components/dashboard/kyc2";
import Kyc3 from "@/components/dashboard/kyc3";
import Kycresult from "@/components/dashboard/kycresult";

const Completedkyc = () => {
	const [step1, setStep1] = React.useState(true);
	const [step2, setStep2] = React.useState(false);
	const [step3, setStep3] = React.useState(false);
	const [step4, setStep4] = React.useState(false);
	const handleStep1 = () => {
		setStep2(true);
		setStep1(false);
	};

	const handleStep2 = () => {
		setStep3(true);
		setStep2(false);
		setStep1(false);
	};

	const handleStep3 = () => {
		setStep4(true);
		setStep1(false);
		setStep2(false);
		setStep3(false);
	};

	const handleStep4 = () => {
		setStep4(false);
		setStep1(true);
	};

	return (
		<>
			{step1 && <Kyc1 handlestep1={handleStep1} />}
			{step2 && <Kyc2 handlestep2={handleStep2} />}
			{step3 && <Kyc3 handlestep3={handleStep3} />}
			{step4 && (
				<Kycresult handlestep1={handleStep1} handlestep4={handleStep4} />
			)}
		</>
	);
};

export default Completedkyc;
