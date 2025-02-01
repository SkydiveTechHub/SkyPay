import React, { useState } from "react";
import AmountInput from "../amountInput";
import TopModal from "@/components/shared/modals/modal";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const ElectricSB = () => {
	const [open, setOpen] = React.useState(false);
	const [amount, setAmount] = useState("0");
	const [provider, setProvider] = useState<
		null | "mtn" | "glo" | "airtel" | "9mobile"
	>(null);
	const router = useRouter();

	const handleOpen = () => {
		router.push("/dashboard/buy-electricity");
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [formData, setFormData] = useState({
		amount: "",
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className="flex justify-center">
			<button
				onClick={handleOpen}
				className="flex items-center w-[100%] h-[50px] gap-[11.544px] bg-[#FFEBE9] rounded-[5px] justify-center"
			>
				<img src="images/svgs/payelect.svg" alt="Pay Electricity" width={15} />
				<p className="text-[#000] text-[12px] font-[500] leading-normal font-int">
					Pay Electricity
				</p>
			</button>
			{/* <TopModal open={open} onClose={handleClose}>
				<Typography
					sx={{ fontWeight: "700", color: "rgba(0, 0, 0, 1)", fontSize: 12 }}
				>
					Choose Your Preferred Network
				</Typography>

				<form className="space-y-5">
					<div className="flex items-center space-x-3 mt-4">
						<button
							type="button"
							className={`${
								provider === "mtn"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("mtn");
							}}
						>
							<img src="/images/png/mtn.png" alt="" />
						</button>
						<button
							type="button"
							className={`${
								provider === "airtel"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("airtel");
							}}
						>
							<img src="/images/png/airtel.png" alt="" />
						</button>
						<button
							type="button"
							className={`${
								provider === "glo"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("glo");
							}}
						>
							<img src="/images/png/glo.png" alt="" />
						</button>
						<button
							type="button"
							className={`${
								provider === "9mobile"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("9mobile");
							}}
						>
							<img src="/images/png/9mobile.png" alt="" />
						</button>
					</div>

					<div
						style={{ backgroundColor: "rgba(34, 52, 127, 1)" }}
						className="rounded-lg w-full p-3 space-y-6"
					>
						<div className="w-full flex justify-between items-center ">
							<p
								style={{ color: "rgba(255, 255, 255, 1)" }}
								className="font-[500] font-int"
							>
								Enter Amount
							</p>
							<p
								style={{ color: "rgba(255, 255, 255, 1)" }}
								className="font-[500] font-int"
							>
								Min: N50
							</p>
						</div>
						<div>
							<p
								style={{ color: "rgba(255, 255, 255, 1)" }}
								className="font-int font-[700] text-[28px]"
							>
								₦{amount}:00
							</p>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<button
							type="button"
							onClick={() => setAmount("500")}
							style={{
								backgroundColor: "rgba(34, 52, 127, 1)",
								color: "rgba(255, 255, 255, 1)",
							}}
							className="rounded-2xl py-1 px-3 text-[12px] font-[400]"
						>
							+₦500
						</button>
						<button
							type="button"
							onClick={() => setAmount("1000")}
							style={{
								backgroundColor: "rgba(34, 52, 127, 1)",
								color: "rgba(255, 255, 255, 1)",
							}}
							className="rounded-2xl py-1 px-3 text-[12px] font-[400]"
						>
							+₦1000
						</button>
						<button
							type="button"
							onClick={() => setAmount("3000")}
							style={{
								backgroundColor: "rgba(34, 52, 127, 1)",
								color: "rgba(255, 255, 255, 1)",
							}}
							className="rounded-2xl py-1 px-3 text-[12px] font-[400]"
						>
							+₦3000
						</button>
						<button
							type="button"
							onClick={() => setAmount("5000")}
							style={{
								backgroundColor: "rgba(34, 52, 127, 1)",
								color: "rgba(255, 255, 255, 1)",
							}}
							className="rounded-2xl py-1 px-3 text-[12px] font-[400]"
						>
							+₦5000
						</button>
					</div>

					<div>
						<AmountInput
							id="phone"
							name="amount"
							type="phone"
							label="Enter Mobile Number"
							value={formData.amount}
							onChange={handleInputChange}
							placeholder="08111******"
							// error={nameError}
						/>
					</div>

					<input
						type="submit"
						style={{ backgroundColor: "rgba(40, 192, 241, 1)" }}
						className="w-full rounded-lg py-3 flex justify-center items-center"
						value="Proceed"
					/>
				</form>
			</TopModal> */}
		</div>
	);
};

export default ElectricSB;
