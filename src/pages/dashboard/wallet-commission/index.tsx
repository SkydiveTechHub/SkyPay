import RegularInput from "@/components/dashboard/RegInput";
import AmountInput from "@/components/dashboard/amountInput";
import BasicCard from "@/components/dashboard/card";
import ErrorTag from "@/components/dashboard/error";
import FundCard from "@/components/dashboard/fundCard";
import QuickRecharge from "@/components/dashboard/inputwithEdit";
import ServiceBoxes from "@/components/dashboard/serviceBoxes";
import TopModal from "@/components/shared/modals/modal";
import SocialTabs from "@/components/social";
import { Grid, Typography } from "@mui/material";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import QuickAction from "../QuickAction";
import usePost from "@/hooks/usePost";
import { AuthContext } from "@/context/authcontext/authcontext";

function Commission() {
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [formData, setFormData] = useState({
		// username: "",
		amount: "",
	});

	const [errors, setErrors] = useState({});
	const [data, setData] = useState<any>({});
	const [commissionBalance, setCommissionBalance] = useState("0");

	const { myData } = usePost({
		process: "tp_balance",
		api_key: api_key,
	});

	useEffect(() => {
		setData(myData);
		console.log(myData);
	}, [myData]);

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
		// try {
		//   const response = await axios.post('/api/login', { email, password });
		//   console.log('Login successful', response.data);
		// } catch (error) {
		//   console.error('Login failed', error);
		// }
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
				<Grid item md={9} className="w-[100%]">
					<Grid sm={12}>
						<form className="flex flex-col space-y-8 w-[60%] ">
							<Typography
								sx={{
									color: "#070707",
									fontWeight: "700",
									fontFamily: "Inter",
								}}
							>
								Commission
							</Typography>
							<ErrorTag desc="Withdraw your commission into your wallet " />
							<Typography
								sx={{
									color: "#070707",
									fontWeight: "700",
									fontFamily: "Inter",
								}}
							>
								{/* Bonus Balance: N{data?.bonus_balance || 0} */}
							</Typography>
							<AmountInput
								id="username"
								name="username"
								type="number"
								label="Commission Balance"
								disabled
								value={commissionBalance}
								onChange={handleInputChange}
								placeholder="DanJohn"
							/>

							<AmountInput
								id="amount"
								name="amount"
								type="text"
								label="Amount to withdraw"
								value={formData.amount}
								onChange={handleInputChange}
								placeholder="Enter Amount"
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

			<TopModal open={open} onClose={handleClose}>
				<div className="flex flex-col w-full justify-center items-center space-y-6">
					<Typography
						sx={{
							fontWeight: "500",
							color: "rgba(0, 0, 0, 1)",
							textAlign: "center",
							fontSize: 12,
						}}
					>
						You are about to withdraw {amount} of your commission into your
						wallet.
					</Typography>

					<button
						type="submit"
						style={{
							backgroundColor: "rgba(29, 191, 65, 1)",
							color: "rgba(255, 255, 255, 1)",
						}}
						className="w-[200px] p-2 rounded-md font-[500] font-[inter]"
					>
						Withdraw
					</button>
				</div>
			</TopModal>
		</div>
	);
}

export default Commission;
