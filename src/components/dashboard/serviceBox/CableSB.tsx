import React, { FormEvent, useContext, useEffect, useState } from "react";
import AmountInput from "../amountInput";
import TopModal from "@/components/shared/modals/modal";
import { Typography } from "@mui/material";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "@/context/authcontext/authcontext";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import ReceiptModal from "@/components/shared/modals/receiptModal";

const CableSB = () => {
	// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? " ";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const username = auth?.userData?.username;
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);
	const [amount, setAmount] = useState("0");
	const [message, setMessage] = useState("");
	const [percent, setPercent] = useState<number>(0);
	const [valuePrice, setValuePrice] = useState<number>(0);
	const [data, setData] = useState<any>([]);
	const [prod, setProd] = useState("");
	const [selectedProd, setSelectedProd] = useState<any>({});
	const [provider, setProvider] = useState<
		null | "DSTV" | "GOTV" | "StarTimes"
	>("DSTV");

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
		setOpen3(true);
	};
	const [open2, setOpen2] = React.useState(false);

	const [open4, setOpen4] = React.useState(false);
	const handleClose4 = () => {
		setOpen4(false);
	};
	const handleFail = () => {
		setOpen1(false);
		setOpen2(true);
	};

	const handleOpen4 = () => {
		setOpen4(true);
	};

	const [formData, setFormData] = useState({
		card_no: "",
		phone: "",
	});

	const [errors, setErrors] = useState<any>({});

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

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

	const handleSubmit = async () => {
		const validationErrors = validateFormData(formData);
		console.log("got here");
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setLoading(true);
			try {
				const params = {
					process: "buy",
					api_key: api_key,
					product_code: prod,
					phone: formData.phone,
					amount: valuePrice,
					smartcard_number: formData.card_no,
					name: username,
					bucket: "wallet",
					user_reference: "12200000000000012",
				};
				console.log("now processing");
				console.log(params);
				const response = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});

				console.log(response.data);
				setMessage(response.data.server_message);
				if (response.data.status === true) {
					setLoading(false);
					handleSwitch();
				} else {
					setLoading(false);
					handleFail();
				}
			} catch (error) {
				// toast.error('Login Failed')
				setLoading(false);
				handleFail();
				console.error("Login failed", error);
				// Handle login error, e.g., display an error message
			}
		}
	};

	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};
		if (!data.phone) {
			errors.phone = "Please enter your phone number";
		}

		// if (!data.amount) {
		//   errors.amount = 'Please enter amount';
		// } else if (parseInt(data.amount) < 100) {
		//   errors.amount = 'Minimum amount of airtime is N100';
		// }

		if (!data.card_no) {
			errors.card_no = "Please enter card number";
		} else if (data.card_no.length < 10) {
			errors.card_no = "Please enter valid card number";
		}

		return errors;
	};

	useEffect(() => {
		const postData = {
			process: "tp_available_service_code_by_sub_code",
			api_key: api_key,
			service_code: provider, //dstv , startimes
		};

		const post = async () => {
			try {
				const res = await axios.post(
					"http://localhost/SkyPay/index.php",
					JSON.stringify(postData),
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (res) {
					if (res.status) {
						setData(res?.data?.data);
						const firstData = res?.data?.data[0];
						setSelectedProd(firstData.available_service_system_name);
						setProd(firstData.available_service_system_name);
						setAmount(firstData.available_service_default_price);
					}
				}
			} catch (err: any) {
				console.log(err.message);
			}
		};

		post();
	}, [provider]);

	useEffect(() => {
		console.log(data)
		const selectedProduct = data?.find(
			(i: any) => i.available_service_system_name === prod
		);

		if (selectedProduct) {
			setSelectedProd(selectedProduct);
			setAmount(selectedProduct.available_service_default_price);
		}
	}, [prod, data]);

	const handleValidation = () => {
		const validationErrors = validateFormData(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setOpen1(true);
			setOpen(false);
		}
	};

	return (
		<div className="flex justify-center">
			<button
				onClick={handleOpen}
				className="flex items-center w-[100%] h-[50px] gap-[11.544px] bg-[#E5FCF2] rounded-[5px] justify-center"
			>
				<img src="images/svgs/cabletv.svg" alt="Cable TV" width={15} />
				<p className="text-[#000] text-[12px] font-[500] leading-normal font-int">
					Cable TV
				</p>
			</button>
			<TopModal open={open} onClose={handleClose}>
				{/* <div className=" flex justify-end bg-Black font-extrabold">
          <button className="cursor-pointer" onClick={handleClose}>
          <img src="/images/png/close.png" alt=""  />
          </button>
        </div> */}
				<Typography
					sx={{
						fontWeight: "700",
						fontSize: 14,
						alignContent: "center",
						textAlign: "center",
					}}
				>
					Select Cable TV
				</Typography>

				<form className="space-y-5">
					<div className="flex justify-center gap-2 mt-4">
						<button
							type="button"
							className={`${
								provider === "DSTV"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("DSTV");
							}}
						>
							<img src="/images/svgs/DSTV.svg" alt="" />
						</button>

						<button
							type="button"
							className={`${
								provider === "GOTV"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("GOTV");
							}}
						>
							<img src="/images/svgs/GOTV.svg" alt="" />
						</button>
						<button
							type="button"
							className={`${
								provider === "StarTimes"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("StarTimes");
							}}
						>
							<img src="/images/svgs/StarTimes.svg" alt="" />
						</button>
					</div>

					<div style={{}} className="rounded-lg w-full p-3 space-y-6">
						<div>
							<AmountInput
								id="cardNumber"
								name="card_no"
								type="text"
								label={`Enter ${provider} Card Number`}
								value={formData.card_no}
								onChange={handleInputChange}
								placeholder="75523******"
								error={errors.card_no}
							/>
						</div>

						<div>
							<select
								value={prod}
								onChange={(e) => setProd(e.target.value)}
								className="border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
							>
								{data?.map((i: any, index: number) => (
									<option key={index} value={i.available_service_system_name}>
										{i?.available_service_description}
									</option>
								))}
							</select>
						</div>

						<div>
							<AmountInput
								id="amount"
								name="amount"
								type="text"
								label=""
								value={amount}
								onChange={handleInputChange}
								placeholder="Enter Amount"
								disabled
								// error={nameError}
							/>
						</div>
						<div>
							<AmountInput
								id="phone"
								name="phone"
								type="phone"
								label=""
								value={formData.phone}
								onChange={handleInputChange}
								placeholder="Enter Phone Number"
								error={errors.phone}
							/>
						</div>
					</div>

					<div className="flex justify-center gap-6">
						<button
							type="button"
							onClick={() => {
								handleValidation();
							}}
							style={{ backgroundColor: "rgba(40, 192, 241, 1)" }}
							className="w-full rounded-lg py-2 font-[500] flex justify-center items-center"
						>
							Confirm
						</button>
						{!loading ? (
							<input
								type="button"
								onClick={handleClose}
								style={{ backgroundColor: "#DADADA80" }}
								className="w-full rounded-lg py-2 font-[500] flex justify-center items-center"
								value="Cancel"
							/>
						) : (
							""
						)}
					</div>
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
						<span>TRANSACTION ID:</span>
						<span></span>
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
			<ConfirmModal open={open3} onClose={handleClose3}>
				<div className="text-center w-full">
					<div>
						<h3
							style={{ color: "rgba(0, 0, 0, 1)" }}
							className="font-int font-[700] text-[20px]"
						>
							ENJOY
						</h3>
					</div>
					<div className="w-full text-center">
						<p className="text-[14px] font-int">
							Your Subscription is Successful
						</p>
						<p
							style={{ color: "rgba(41, 41, 41, 1)" }}
							className="text-[14px] font-int font-[700]"
						>
							{prod.toUpperCase()} for{" "}
							<span style={{ color: "rgba(4, 142, 35, 1)" }}>N{amount} </span>
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
			<UnsuccessfulModal open={open2} onClose={handleClose2}>
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
					<span className="text-sm">Cable purchased</span>
					<span className="text-sm font-[500]">
						Prepaid {prod?.toUpperCase()}
					</span>
				</div>
			</ReceiptModal>
		</div>
	);
};

export default CableSB;
