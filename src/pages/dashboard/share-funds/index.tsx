import RegularInput from "@/components/dashboard/RegInput";
import AmountInput from "@/components/dashboard/amountInput";
import BasicCard from "@/components/dashboard/card";
import ErrorTag from "@/components/dashboard/error";
import FundCard from "@/components/dashboard/fundCard";
import QuickRecharge from "@/components/dashboard/inputwithEdit";
import ServiceBoxes from "@/components/dashboard/serviceBoxes";
import TopModal from "@/components/shared/modals/modal";
import SocialTabs from "@/components/social";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import QuickAction from "../QuickAction";
import usePost from "@/hooks/usePost";

function Dashboard() {
	const [data, setData] = useState<any>({});
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const url = process.env.BASE_URL ?? "";
	const [formData, setFormData] = useState({
		email: "",
		amount: "",
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState<boolean>(false);

	const { myData } = usePost({
		process: "tp_balance",
		api_key: api_key,
	});
	useEffect(() => {
		setData(myData);
	}, [myData]);

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async () => {
		// e.preventDefault();
		console.log("now");
		const validationErrors = validateFormData(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			console.log("loading");
			setLoading(true);
			const params = {
				process: "tp_transfer_funds",
				api_key: api_key,
				reciever: formData.email,
				amount: formData.amount,
			};
			try {
				const response = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});

				console.log(response);
				let message = response.data.server_message;
				if ((message = "Registration Successful, Please Login")) {
					setLoading(false);
					toast.success("Registration Successful");
				} else {
					setLoading(false);
					toast.error("Registration Unsuccessful");
				}
			} catch (error) {
				console.error("Error fetching countries:", error);
			}
		}
	};

	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};

		if (!data.email) {
			errors.email = "Please enter your email address";
		} else if (!/\S+@\S+\.\S+/.test(data.email)) {
			errors.email = "Please enter a valid email address";
		}
		if (!data.amount) {
			errors.amount = "Please enter your amount";
		}

		// else if (/^[0-9]+$/.test(data.amount)) {
		//   errors.amount = 'Amount can only be digits';
		// }

		return errors;
	};

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [amount, setAmount] = useState("0");

	return (
		<div className="max-w-full">
			<Grid container spacing={6}>
				<Grid item md={9}>
					<Grid sm={12}>
						<form className="flex flex-col space-y-8 p-2 md:p-8 w-[70%]">
							<Typography
								sx={{
									color: "#070707",
									fontWeight: "700",
									fontFamily: "Inter",
								}}
							>
								Share wallet funds
							</Typography>
							<ErrorTag desc="Please ensure that you confirm the username or phone number of the client you want to share credit with " />
							<Typography
								sx={{
									color: "#070707",
									fontWeight: "700",
									fontFamily: "Inter",
								}}
							>
								{/* Wallet Balance: N{data?.wallet_balance || 0} */}
							</Typography>
							<RegularInput
								id="email"
								name="email"
								type="email"
								label="Username or Phone number"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="DanJohn"
							/>

							<AmountInput
								id="amount"
								name="amount"
								type="number"
								label="Amount"
								value={formData.amount}
								onChange={handleInputChange}
								placeholder="Enter amount"
							/>
							<button
								type="button"
								onClick={handleOpen}
								style={{
									backgroundColor: "#28C0F1",
									color: "rgba(255, 255, 255, 1)",
								}}
								className="w-full p-2 rounded-md font-[600] font-[inter]"
							>
								Continue
							</button>

							<TopModal open={open} onClose={handleClose}>
								<div className="flex flex-col w-full justify-center items-center space-y-6">
									<Typography
										sx={{
											fontWeight: "500",
											color: "rgba(0, 0, 0, 1)",
											fontSize: 12,
										}}
									>
										You are about to transfer {formData.amount} to{" "}
										{formData.email}
									</Typography>

									<button
										onClick={handleSubmit}
										style={{
											backgroundColor: "rgba(29, 191, 65, 1)",
											color: "rgba(255, 255, 255, 1)",
										}}
										className="w-[200px] p-2 rounded-md font-[500] font-[inter]"
									>
										Transfer
									</button>
								</div>
							</TopModal>
						</form>
					</Grid>
				</Grid>
				{/* <Grid
					item
					md={3}
					sx={{ display: "flex", flexDirection: "column", gap: 4 }}
				>
					<QuickAction />
				</Grid> */}
			</Grid>
		</div>
	);
}

export default Dashboard;
