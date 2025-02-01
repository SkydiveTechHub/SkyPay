import React, { FormEvent, useContext, useEffect, useState } from "react";
import BasicCard from "@/components/dashboard/card";
import ErrorTag from "@/components/dashboard/error";
import { Typography } from "@mui/material";
import AmountInput from "@/components/dashboard/amountInput";
import { AuthContext } from "@/context/authcontext/authcontext";

const FundWithCard = () => {
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [formData, setFormData] = useState({
		// username: "",
		amount: "",
	});

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className="w-[48%]">
			<form className="flex flex-col space-y-8">
				<Typography
					sx={{
						fontSize: "20px",
						color: "#070707",
						fontWeight: "700",
						fontFamily: "Inter",
					}}
				>
					Card Deposit
				</Typography>
				<ErrorTag desc="Please note that you are required to pay a minimum of ₦100 " />
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
					id="amount"
					name="amount"
					type="text"
					label="Specify Amount"
					value={formData.amount}
					onChange={handleInputChange}
					placeholder="Type in the amount you want to topup"
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
		</div>
	);
};

export default FundWithCard;
