import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import TopModal from "@/components/shared/modals/modal";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState, FormEvent } from "react";
import { Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Kyc1Props {
	handlestep1: () => void;
}

const Kyc1 = ({ handlestep1 }: Kyc1Props) => {
	// const router = useRouter();
	// const url = process.env.BASE_URL ?? ' ?? ' ?? ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? " " ?? "";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		dob: "",
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
			try {
				const response = await axios.post(
					url,
					JSON.stringify({
						process: "kyc",
						action: "kyc_step_one",
						api_key: api_key,
						first_name: formData.firstname,
						last_name: formData.lastname,
						dob: formData.dob,
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
				// Handle response
				if (message === "step one successfully saved") {
					setLoading(false);
					toast.success("Step one successfully saved");
					handlestep1();
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

	const [errors, setErrors] = useState<Record<string, string>>({});
	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};
		if (!data.firstname) {
			errors.firstname = "Please enter your firstname";
		}
		if (!data.lastname) {
			errors.lastname = "Please enter your lastname";
		}
		if (!data.dob) {
			errors.dob = "Please enter your dob";
		}

		return errors;
	};

	useEffect(() => {
		const params = {
			process: "kyc",
			action: "kyc_step_one_check",
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
					handlestep1();
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
				<Typography className="font-inter text-2xl font-[700] mb-0">
					Platform Generate KYC
				</Typography>
			</Grid>
			<Grid item sm={12} lg={9} className="w-[100%]">
				<BasicCard>
					<form onSubmit={handleSubmit} className="space-y-6 p-6">
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								First Name
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="text"
									name="firstname"
									value={formData.firstname}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.firstname && (
									<div className="error-message text-red-600">{errors.firstname}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Last Name
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="text"
									name="lastname"
									value={formData.lastname}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.lastname && (
									<div className="error-message text-red-600">{errors.lastname}</div>
								)}
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Date of Birth
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="date"
									name="dob"
									value={formData.dob}
									onChange={(event) =>
										handleInputChange(event.target.name, event.target.value)
									}
									// value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
								{errors.dob && (
									<div className="error-message text-red-600">{errors.dob}</div>
								)}
							</div>
						</div>

						<button
							disabled={loading ? true : false}
							type="submit"
							style={{
								backgroundColor: "#28C0F1",
								color: "rgba(255, 255, 255, 1)",
							}}
							className="w-[100%] md:w-[200px] py-2 rounded-lg font-int font-[700]"
						>
							{loading ? (
								<Spinner size="md" color="red.500" />
							) : (
								"Submit Step One"
							)}
						</button>
						{/* <button
							disabled={loading ? true : false}
							type="submit"
							className="w-full bg-[#5570F1] rounded-lg text-[#fff] h-[40px]"
						>
							{loading ? (
								<Spinner size="md" color="red.500" />
							) : (
								"Submit Step One"
							)}
						</button> */}
					</form>
				</BasicCard>
			</Grid>
		</Grid>
	);
};

export default Kyc1;
