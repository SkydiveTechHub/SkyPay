import BasicCard from "@/components/dashboard/card";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { Spinner } from "@chakra-ui/react";

interface Kyc3Props {
	handlestep3: () => void;
}
const Kyc3 = ({ handlestep3 }: Kyc3Props) => {
	// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? " ";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [loading, setLoading] = useState<boolean>(false);
	const [loading3, setLoading3] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		BvnName: "",
		BvnNumber: "",
		BvnPhoneNumber: "",
		BvnDob: "",
	});

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
		setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const validationErrors = validateFormData(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setLoading(true);
			const params = {
				process: "kyc",
				action: "verify_bvn",
				api_key: api_key,
				bvn_name: formData.BvnName,
				bvn_number: formData.BvnNumber,
				bvn_mobile: formData.BvnPhoneNumber,
				bvn_dob: formData.BvnDob,
			};
			console.log(params);

			try {
				const response = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});

				console.log(response.data);
				let status = response.data.status;
				let message = response.data.server_message;
				if (status) {
					setLoading(false);
					toast.success("Step two successfully saved");
				} else {
					setLoading(false);
					toast.error(message);
				}
			} catch (error) {
				console.error("Error:", error);
				// Handle error
			}
		}
	};

	const handleSkip3 = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setLoading3(true);
		try {
			const response = await axios.post(
				url,
				JSON.stringify({
					process: "kyc",
					action: "update_bvn_skipped",
					api_key: api_key,
					status: "no",
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
				setLoading3(false);
				toast.success(message);
				handlestep3();
			} else {
				setLoading3(false);
				toast.error(message);
			}
		} catch (error) {
			console.error("Error:", error);
			// Handle error
		}
	};
	const [errors, setErrors] = useState<Record<string, string>>({});
	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};

		if (!data.BvnName) {
			errors.BvnName = "Please enter BVN name";
		}
		if (!data.BvnNumber) {
			errors.BvnNumber = "Please enter BVN name";
		}
		if (!data.BvnDob) {
			errors.BvnDob = "Please enter your BVN date of birth";
		}
		if (!data.BvnPhoneNumber) {
			errors.BvnPhoneNumber = "Please enter your BVN phone number";
		}
		return errors;
	};
	useEffect(() => {
		const params = {
			process: "kyc",
			action: "user_has_done_bvn",
			api_key: api_key,
		};
		const post = async () => {
			try {
				const res = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (res.data.status === true) {
					handlestep3();
					console.log(res.data.status);
				}
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		post();
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item sm={9} sx={{ mt: 3 }}>
				<Typography className="font-inter text-[20px] text-[#28C0F1] font-[700] mb-0">
					Why Verify your BVN with us?
				</Typography>
				<Typography className="font-inter text-[20px] font-[700] mb-0">
					Fill in your BVN Details
				</Typography>
			</Grid>
			<Grid item sm={12} lg={9} className="w-[100%]">
				<BasicCard>
					<form onSubmit={handleSubmit} className="space-y-6 p-6">
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								BVN NAME
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="text"
									name="BvnName"
									value={formData.BvnName}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.BvnName && (
									<div className="error-message text-red-600">{errors.BvnName}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								BVN Number
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="number"
									name="BvnNumber"
									value={formData.BvnNumber}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.BvnNumber && (
									<div className="error-message text-red-600">{errors.BvnNumber}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								BVN Phone Number
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="tel"
									name="BvnPhoneNumber"
									value={formData.BvnPhoneNumber}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.BvnPhoneNumber && (
									<div className="error-message text-red-600">{errors.BvnPhoneNumber}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								BVN Date of Birth
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="date"
									name="BvnDob"
									value={formData.BvnDob}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.BvnDob && (
									<div className="error-message text-red-600 ">{errors.BvnDob}</div>
								)}
							</div>
						</div>
						<div className="flex gap-8">
							<button
								type="submit"
								disabled={loading ? true : false}
								// onClick={handleSubmit}
								style={{
									backgroundColor: "#28C0F1",
									color: "rgba(255, 255, 255, 1)",
								}}
								className="w-[250px] py-4 rounded-lg font-int font-[700]"
							>
								{loading ? <Spinner size="md" color="red.500" /> : "Verify BVN"}
							</button>

							<button
								type="submit"
								disabled={loading3 ? true : false}
								onClick={handleSkip3}
								style={{
									color: "#00052A",
								}}
								className="w-[180px] py-2 rounded-lg font-int font-[700] border-2 border-color: rgb(0 0 0);"
							>
								{loading3 ? <Spinner size="md" color="red.500" /> : "Skip"}
							</button>
						</div>
					</form>
				</BasicCard>
			</Grid>
		</Grid>
	);
};

export default Kyc3;
