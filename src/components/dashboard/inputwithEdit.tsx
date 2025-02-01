import React, {
	FormEvent,
	useContext,
	useEffect,
	useState,
	ChangeEvent,
} from "react";
import axios from "axios";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import BasicCard from "./card";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Typography } from "@mui/material";
import TopModal from "../shared/modals/modal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import Commission from "@/pages/dashboard/wallet-commission";
import ReceiptModal from "@/components/shared/modals/receiptModal";

const QuickRecharge = () => {
	const url = process.env.BASE_URL ?? ' ';
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [amount, setAmount] = useState("");
	const [percent, setPercent] = useState<number>(0);
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [amountError, setAmountError] = useState<string | null>(null);
	const [provider, setProvider] = useState<
		null | "mtn" | "glo" | "airtel" | "9mobile"
	>("mtn");

	const [valuePrice, setValuePrice] = useState<number>(0);
	const [data, setData] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);

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
						console.log(res.data);
					}
				}
			} catch (err: any) {
				// console.log(err.message);
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

	// const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setPhoneNumber(e.target.value);
	// 	setErrors((prevErrors: Record<string, string | null>) => ({
	// 		...prevErrors,
	// 		phone: null,
	// 	}));
	// };

	// const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setAmount(e.target.value);
	// 	setErrors((prevErrors: Record<string, string | null>) => ({
	// 		...prevErrors,
	// 		amount: null,
	// 	}));
	// };

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
		setOpen(false);
		setOpen2(true);
	};

	const handleError = () => {
		setOpen(false);
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

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({ ...prevState, phone: e.target.value }));
	};
	const handleCancel = () => {
		setFormData((prevState) => ({ ...prevState, phone: "" }));
	};

	const handleValidation = () => {
		const validationErrors = validateFormData(formData);

		if (validationErrors.phone || validationErrors.amount) {
			setErrors(validationErrors);
		} else {
			setErrors({});
			setOpen(true);
			// setOpen1(true);
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
				if (response.data.status) {
					setLoading(false);
					handleSwitch();
					console.log("Data Response", response.data.status);
				} else {
					setLoading(false);
					handleError();
					console.log("Not correct", response.data.status);
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
		} else if (parseInt(data.amount) < 100) {
			errors.amount = "Minimum amount of airtime is N100";
		}

		return errors;
	};

	return (
		<BasicCard>
			<div className="w-full flex flex-col space-y-6">
				<p className="font-int font-[500] text-[#000000] text-[14px] ">
					Buy Airtime
				</p>

				<div className=" h-[40px] border rounded-md flex items-center px-3">
					<select name="" id="" className="border-r">
						<option value="">
							<img className="w-full h-full" src="/images/png/mtn.png" alt="" />{" "}
						</option>
						<option value="">
							<img
								className="w-full h-full"
								src="/images/png/airtel.png"
								alt=""
							/>{" "}
						</option>
						<option value="">
							<img className="w-full h-full" src="/images/png/glo.png" alt="" />{" "}
						</option>
						<option value="">
							<img
								className="w-full h-full"
								src="/images/png/9mobile.png"
								alt=""
							/>{" "}
						</option>
					</select>
					<input
						type="phone"
						className=" bg-transparent w-[80%] outline-none"
						placeholder="Phone Number"
						value={formData.phone}
						onChange={handleInputChange}
					/>

					<button
						className="h-full border-l pl-3"
						type="button"
						onClick={handleCancel}
					>
						<img src="/images/svgs/cancel.svg" alt="cancel" />
					</button>
				</div>
				{errors && (
					<small className="error-message text-[red]">{errors.phone}</small>
				)}
				<div className=" h-[40px] border rounded-md flex items-center px-3">
					<input
						type="text"
						className="h-full bg-transparent w-[90%] focus:outline-none"
						placeholder="Amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>

					<button className="h-full" type="button">
						<img src="/images/svgs/pencil.svg" alt="edit pencil" />
					</button>
				</div>
				{errors && (
					<small className="error-message text-[red]">{errors.amount}</small>
				)}

				<button
					type="button"
					onClick={handleValidation}
					style={{
						backgroundColor: "rgba(29, 191, 65, 1)",
						color: "rgba(255, 255, 255, 1)",
					}}
					className="w-full p-2 rounded-md font-[600] font-[inter]"
				>
					Buy Now
				</button>
			</div>

			<TopModal open={open} onClose={handleClose}>
				<Typography sx={{ fontWeight: 700 }}>PRODUCT SUMMARY</Typography>

				<div className="space-y-4 mt-4">
					<div className="flex justify-between items-center">
						<span>PRODUCT:</span>
						<span>Prepaid MTN</span>
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
		</BasicCard>
	);
};

export default QuickRecharge;
