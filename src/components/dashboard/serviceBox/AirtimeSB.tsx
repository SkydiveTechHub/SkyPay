import React, { FormEvent, useContext, useEffect, useState } from "react";
import AmountInput from "../amountInput";
import TopModal from "@/components/shared/modals/modal";
import { Typography } from "@mui/material";
import axios from "axios";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import { AuthContext } from "@/context/authcontext/authcontext";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import Commission from "@/pages/dashboard/wallet-commission";
import ReceiptModal from "@/components/shared/modals/receiptModal";

const AirtimeSB = () => {
	// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? " ";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);
	const [percent, setPercent] = useState<number>(0);
	const [message, setMessage] = useState("");
	const [amount, setAmount] = useState("0");
	const [provider, setProvider] = useState<
		null | "mtn" | "glo" | "airtel" | "9mobile"
	>("mtn");
	const [data, setData] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);

	const [valuePrice, setValuePrice] = useState<number>(0);

	useEffect(() => {
		const postData = {
			process: "tp_available_service_code_airtime",
			api_key: api_key,
			service_name: `prepaid_${provider}`,
			// "percent_commission": percent,
		};

		const post = async () => {
			try {
				const res = await axios.post(url, JSON.stringify(postData), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res) {
					if (res.status) {
						setData(res);
						setAmount(res.data.data.available_service_actual_price);
						setPercent(res.data.data.percent_commission);
					}
				}
			} catch (err: any) {
				console.log(err.message);
			}
		};

		post();
	}, [provider]);

	useEffect(() => {
		const calculateDiscount = () => {
			const commission = percent;
			if (commission !== 0) {
				let calculatedValuePrice = (commission / 100) * parseInt(amount);
				const valueAmount = parseInt(amount) - calculatedValuePrice;
				setValuePrice(valueAmount);
			} else {
				setValuePrice(parseInt(amount));
			}
		};

		calculateDiscount();
	}, [amount]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen1 = () => {
		setOpen1(true);
	};

	const handleClose1 = () => {
		setOpen1(false);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};

	const handleClose3 = () => {
		setOpen3(false);
	};
	const handleSwitch = () => {
		setOpen1(false);
		setOpen2(true);
	};

	const handleError = () => {
		setOpen1(false);
		setOpen3(true);
	};

	const [open4, setOpen4] = React.useState(false);
	const handleClose4 = () => {
		setOpen4(false);
	};

	const handleOpen4 = () => {
		setOpen4(true);
	};

	const [formData, setFormData] = useState({
		phone: "",
	});

	const [errors, setErrors] = useState<any>({});

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleValidation = () => {
		const validationErrors = validateFormData(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setOpen1(true);
			setOpen(false);
		}
	};

	const handleSubmit = async () => {
		// e.preventDefault();
		const validationErrors = validateFormData(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setLoading(true);
			try {
				const params = {
					process: "buy",
					api_key: api_key,
					product_code: data?.data?.data?.available_service_name,
					amount: valuePrice,
					phone: formData.phone,
					bucket: "wallet",
					user_reference: "100002", //user reference is a random number
				};
				const response = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});

				console.log(params);
				if (response.data.status) {
					setLoading(false);
					handleSwitch();
				} else {
					setLoading(false);
					handleError();
					console.log(response.data);
					setMessage(response.data.server_message);
				}
			} catch (error) {
				// toast.error('Login Failed')
				setLoading(false);
				handleError();
				console.error(error);
				// Handle login error, e.g., display an error message
			}
		}
	};

	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};
		if (!data.phone) {
			errors.phone = "Please enter your phone number";
		}

		if (!amount) {
			errors.amount = "Please enter amount";
		} else if (parseInt(amount) < 100) {
			errors.amount = "Minimum amount of airtime is N100";
		}

		return errors;
	};

	return (
		<div className="flex justify-center">
			<button
				onClick={handleOpen}
				className="flex items-center w-[100%] h-[50px] gap-[11.544px] bg-[#F0EFFF] rounded-[5px] justify-center "
			>
				<img src="images/svgs/buyairtime.svg" alt="Buy Airtime" width={15} />
				<p className="text-[#000] text-[12px] font-[500] leading-normal font-int">
					Airtime Top-up
				</p>
			</button>
			<TopModal open={open} onClose={handleClose}>
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
								{" "}
								₦{amount}:00
							</p>
						</div>
					</div>
					{errors.amount && (
						<small className="text-[rgb(255,0,0)]">{errors.amount}</small>
					)}

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
							name="phone"
							type="phone"
							label="Enter Mobile Number"
							value={formData.phone}
							onChange={handleInputChange}
							placeholder="08111******"
							error={errors.phone}
						/>
					</div>

					<button
						type="button"
						onClick={() => {
							handleValidation();
						}}
						style={{ backgroundColor: "rgba(40, 192, 241, 1)" }}
						className="w-full rounded-lg py-3 flex justify-center items-center font-[500]"
					>
						Proceed
					</button>
				</form>
			</TopModal>
			<TopModal open={open1} onClose={handleClose1}>
				<Typography sx={{ fontWeight: 700 }}>PRODUCT SUMMARY</Typography>

				<div className="space-y-4 mt-4">
					<div className="flex justify-between items-center">
						<span>PRODUCT:</span>
						<span>Prepaid {provider?.toUpperCase()}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>VALUE</span>
						<span>{amount}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>AMOUNT:</span>
						<span>{valuePrice}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>PHONE NUMBER:</span>
						<span>{formData.phone}</span>
					</div>
					<div className="flex justify-between items-center">
						<small>
							<i>You've enjoyed {percent}% discount on this transaction</i>
						</small>
						{/* <span>TRANSACTION ID:</span>
                    <span></span> */}
					</div>

					<button
						type="button"
						onClick={handleSubmit}
						style={{
							backgroundColor: "rgba(29, 191, 65, 1)",
							color: "rgba(255, 255, 255, 1)",
						}}
						className="w-[200px] py-2 rounded-lg font-int font-[700]"
					>
						{loading ? "Processing ..." : "Confirm"}
					</button>
				</div>
			</TopModal>

			<ConfirmModal open={open2} onClose={handleClose2}>
				<div className="text-center w-full">
					<div>
						<h3
							style={{ color: "rgba(0, 0, 0, 1)" }}
							className="font-int font-[700] text-[20px]"
						>
							Airtime TopUp Successful
						</h3>
					</div>
					<div className="w-full text-center">
						<p className="text-[14px] font-int">You have successfully topup</p>
						<p
							style={{ color: "rgba(41, 41, 41, 1)" }}
							className="text-[14px] font-int font-[700]"
						>
							{amount} with{" "}
							<span style={{ color: "rgba(4, 142, 35, 1)" }}>
								N{valuePrice} {provider?.toUpperCase()} Airtime
							</span>
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={() => {
						handleClose2();
						handleOpen4();
					}}
					style={{
						backgroundColor: "rgba(29, 191, 65, 1)",
						color: "rgba(255, 255, 255, 1)",
					}}
					className="w-[150px] py-2 rounded-lg font-int text-[14px] font-[600]"
				>
					View Reciept
				</button>
			</ConfirmModal>
			<UnsuccessfulModal open={open3} onClose={handleClose3}>
				<div className="text-center w-full">
					<div>
						<h3
							style={{ color: "rgba(30, 0, 41, 1))" }}
							className="font-int font-[700] text-[20px]"
						>
							Error Occured
						</h3>
					</div>
					<div className="w-full text-center">
						<p className="text-[14px] font-int">
							Your transaction has not been fulfilled.
						</p>
						<p className="text-[14px] font-int">{message}</p>
					</div>
				</div>
			</UnsuccessfulModal>

			<ReceiptModal
				open={open4}
				onClose={handleClose4}
				phone={formData.phone}
				source={"wallet"}
				provider={provider ?? ""}
				status={"Successful"}
				date={""}
				after_balance={""}
				amount={valuePrice}
			>
				<div className="flex justify-between items-center gap-32">
					<span className="text-sm">Card purchased</span>
					<span className="text-sm font-[500]">
						Prepaid {provider?.toUpperCase()}
					</span>
				</div>
			</ReceiptModal>
		</div>
	);
};

export default AirtimeSB;
