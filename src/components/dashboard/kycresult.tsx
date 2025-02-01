import React, { useContext, useEffect, useState, FormEvent } from "react";
import { AuthContext } from "@/context/authcontext/authcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@chakra-ui/react";

interface KycresultProps {
	handlestep1: () => void;
	handlestep4: () => void;
}
const kycresult = ({ handlestep1, handlestep4 }: KycresultProps) => {
	const url = process.env.BASE_URL ?? " ";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [loading, setLoading] = useState<boolean>(false);
	const [ninSkippedCheck, setNinSkippedCheck] = useState(false);
	const [bvnSkippedCheck, setBvnSkippedCheck] = useState(false);

	useEffect(() => {
		const fetchNinSkippedCheck = async () => {
			const params = {
				process: "kyc",
				action: "nin_skipped_check",
				api_key: api_key,
			};
			try {
				const res = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				setNinSkippedCheck(res.data.status);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchBvnSkippedCheck = async () => {
			const params = {
				process: "kyc",
				action: "bvn_skipped_check",
				api_key: api_key,
			};
			try {
				const res = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				setBvnSkippedCheck(res.data.status);
			} catch (error) {
				console.log(error);
			}
		};

		fetchNinSkippedCheck();
		fetchBvnSkippedCheck();
	}, [api_key, url]);

	const handleLinkNin = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(
				url,
				JSON.stringify({
					process: "kyc",
					action: "link_account",
					api_key: api_key,
					type: "nin",
				}),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			let userData = response.data.data;
			let token = userData.api_key;
			let message = response.data.server_message;
			let status = response.data.status;
			// Handle response
			if (status) {
				setLoading(false);
				toast.success(message);
				handlestep4();
			} else {
				setLoading(false);
				toast.error(message);
			}
		} catch (error) {
			console.error("Error:", error);
			// Handle error
		}
	};
	const handleLinkBvn = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(
				url,
				JSON.stringify({
					process: "kyc",
					action: "link_account",
					api_key: api_key,
					type: "bvn",
				}),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			let userData = response.data.data;
			let token = userData.api_key;
			let message = response.data.server_message;
			let status = response.data.status;
			// Handle response
			if (status) {
				setLoading(false);
				toast.success(message);
				handlestep4();
			} else {
				setLoading(false);
				toast.error(message);
			}
		} catch (error) {
			console.error("Error:", error);
			// Handle error
		}
	};

	let buttonText = "Try Again";
	let resultMsg = "KYC Verification Failed, Please Try Again";
	if (ninSkippedCheck && bvnSkippedCheck) {
		buttonText = "Try Again";
		resultMsg = "KYC Verification Failed, Please Try Again";
	} else if (ninSkippedCheck && !bvnSkippedCheck) {
		resultMsg = "BVN Verification Successful, Please link BVN to acccount";
		buttonText = "Link BVN to account";
	} else if (!ninSkippedCheck && bvnSkippedCheck) {
		buttonText = "Link NIN to account";
		resultMsg = "NIN Verification Successful, Please link NIN to acccount";
	}
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (buttonText === "Try Again") {
			handlestep4();
		}
		if (buttonText === "Link NIN to account") {
			handleLinkNin(e);
		}
		if (buttonText === "Link BVN to account") {
			handleLinkBvn(e);
		}
	};
	return (
		<div>
			<h2 className="text-[30px] mb-3">KYC Completion Page</h2>
			<p>{resultMsg}</p>
			<button
				disabled={loading ? true : false}
				className="bg-[#cc330d] py-2 px-6 text-[white] mt-6 text-[18px] rounded"
				onClick={(e) => handleClick(e)}
			>
				{loading ? <Spinner size="md" color="red.500" /> : buttonText}
			</button>
		</div>
	);
};

export default kycresult;
