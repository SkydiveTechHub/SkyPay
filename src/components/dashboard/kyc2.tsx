import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import TopModal from "@/components/shared/modals/modal";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { Spinner } from "@chakra-ui/react";

interface Kyc2Props {
	handlestep2: () => void;
}
const Kyc2 = ({ handlestep2 }: Kyc2Props) => {
	// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? " ";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [loading, setLoading] = useState<boolean>(false);
	const [loading2, setLoading2] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		ninName: "",
		ninNumber: "",
		ninPhoneNumber: "",
		ninDob: "",
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
				action: "verify_nin",
				api_key: api_key,
				nin_name: formData.ninName,
				nin_number: formData.ninNumber,
				nin_mobile: formData.ninPhoneNumber,
				nin_dob: formData.ninDob,
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
					handlestep2();
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

	const handleSkip2 = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setLoading2(true);
		try {
			const response = await axios.post(
				url,
				JSON.stringify({
					process: "kyc",
					action: "update_nin_skipped",
					api_key: api_key,
					status: "yes",
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
				setLoading2(false);
				toast.success(message);
				handlestep2();
			} else {
				setLoading2(false);
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

		if (!data.ninName) {
			errors.ninName = "Please enter NIN name";
		}
		if (!data.ninNumber) {
			errors.ninNumber = "Please enter NIN number";
		}
		if (!data.ninDob) {
			errors.ninDob = "Please enter your NIN date of birth";
		}
		if (!data.ninPhoneNumber) {
			errors.ninPhoneNumber = "Please enter your NIN phone number";
		}
		return errors;
	};

	useEffect(() => {
		const params = {
			process: "kyc",
			action: "user_has_done_nin",
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
					handlestep2();
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
					Why Verify your NIN with us?
				</Typography>
				<Typography className="font-inter text-[20px] font-[700] mb-0">
					Fill in your NIN Details
				</Typography>
			</Grid>
			<Grid item sm={12} lg={9} className="w-[100%]">
				<BasicCard>
					<form onSubmit={handleSubmit} className="space-y-6 p-6">
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								NIN NAME
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="text"
									name="ninName"
									value={formData.ninName}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.ninName && (
									<div className="error-message text-red-600">{errors.ninName}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								NIN Number
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="number"
									name="ninNumber"
									value={formData.ninNumber}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.ninNumber && (
									<div className="error-message text-red-600">{errors.ninNumber}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								NIN Phone Number
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="tel"
									name="ninPhoneNumber"
									value={formData.ninPhoneNumber}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.ninPhoneNumber && (
									<div className="error-message text-red-600">{errors.ninPhoneNumber}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								NIN Date of Birth
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="date"
									name="ninDob"
									value={formData.ninDob}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.ninDob && (
									<div className="error-message text-red-600">{errors.ninDob}</div>
								)}
							</div>
						</div>
						<div className="flex flex-col items-center gap-8 md:flex-row justify-center md:justify-start">
							<button
								disabled={loading ? true : false}
								style={{
									backgroundColor: "#28C0F1",
									color: "rgba(255, 255, 255, 1)",
								}}
								className=" w-[100%] md:w-[230px] py-2 rounded-lg font-int font-[700] px-2"
							>
								{loading ? (
									<Spinner size="md" color="red.500" />
								) : (
									"Verify Account With NIN"
								)}
							</button>

							<button
								type="submit"
								disabled={loading ? true : false}
								onClick={handleSkip2}
								style={{
									color: "#00052A",
								}}
								className="w-[100%] md:w-[180px] py-2 rounded-lg font-int font-[700] border-2 border-color-[#28C0F1];"
							>
								{loading2 ? <Spinner size="md" color="red.500" /> : "Skip"}
							</button>
						</div>
					</form>
				</BasicCard>
			</Grid>
		</Grid>
	);
};

export default Kyc2;
