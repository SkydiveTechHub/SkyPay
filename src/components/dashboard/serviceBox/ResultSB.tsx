import React, { FormEvent, useContext, useEffect, useState } from "react";
import AmountInput from "../amountInput";
import TopModal from "@/components/shared/modals/modal";
import { Typography } from "@mui/material";
import { AuthContext } from "@/context/authcontext/authcontext";
import axios from "axios";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import ReceiptModal from "@/components/shared/modals/receiptModal";

const ResultSB = () => {
	// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? " ";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const username = auth?.userData?.username;
	const [open1, setOpen1] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [amount, setAmount] = useState("0");
	const [quantity, setQuantity] = useState("1");
	const [product, setProduct] = useState<string>("");
	const [percent, setPercent] = useState("0");
	const [valuePrice, setValuePrice] = useState<number>(0);
	const [provider, setProvider] = useState<
		null | "waec" | "neco" | "nabteb" | "jamb"
	>("waec");
	const [message, setMessage] = useState("");
	const handleChangeProvider = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setProvider(
			event.target.value as null | "waec" | "neco" | "nabteb" | "jamb"
		);
	};

	const [loading, setLoading] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleOpen1 = () => {
		setOpen1(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleClose1 = () => {
		setOpen1(false);
	};

	const handleSwitch = () => {
		setOpen2(false);
		setOpen1(true);
	};

	const [open4, setOpen4] = React.useState(false);
	const handleClose4 = () => {
		setOpen4(false);
	};

	const handleOpen4 = () => {
		setOpen4(true);
	};

	useEffect(() => {
		const actual_price = parseInt(quantity) * parseInt(amount);
		setAmount(actual_price.toString());
	}, [quantity]);

	const [formData, setFormData] = useState({
		phone: "",
		amount: amount,
		email: "",
	});

	const [errors, setErrors] = useState<any>({});

	const handleValidation = () => {
		const validationErrors = validateFormData(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setOpen2(true);
			setOpen(false);
		}
	};

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
		// setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		handleInputChange(name, value);
	};

	const handleSubmit = async () => {
		const validationErrors = validateFormData(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setLoading(true);
			try {
				const params = {
					process: "buy",
					api_key: api_key,
					product_code: `${provider}_pin`,
					phone: formData.phone,
					quantity: quantity,
					name: username,
					bucket: "wallet",
					user_reference: "12200000000000012",
				};
				const response = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(params);
				const server_message = response.data.server_message;
				console.log(response.data);
				if (response.data.status) {
					setLoading(false);
					handleSwitch();
				} else {
					setLoading(false);
					handleError();
					setMessage(server_message);
				}
			} catch (error) {
				// toast.error('Login Failed')
				setLoading(false);
				console.error("Login failed", error);
				handleError();
				// Handle login error, e.g., display an error message
			}
		}
	};

	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};
		if (!data.phone) {
			errors.phone = "Please enter your phone number";
		}

		if (!data.email) {
			errors.email = "Kindly enter your email address";
		}

		return errors;
	};

	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);

	const handleOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};
	const handleClose3 = () => {
		setOpen3(false);
	};

	const handleError = () => {
		setOpen2(false);
		setOpen3(true);
	};

	useEffect(() => {
		const postData = {
			process: "tp_available_service_code_by_sub_code",
			api_key: api_key,
			service_code: `${provider}_pin`, //waec_pin, neco_pin, nabtech_pin
			percent: "percent_commission",
		};

		setLoading(true);
		console.log(postData);
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
						const firstData = res.data.data[0];
						setProduct(firstData.available_service_description);
						setAmount(firstData.available_service_default_price);
						setPercent(firstData.percent_commission);
					}

					console.log(res.data);
				}
			} catch (err: any) {
				console.log(err.message);
				// handleError();
			} finally {
				setLoading(false); // Set loading to false after processing the response
			}
		};

		post();
	}, [provider]);

	useEffect(() => {
		const calculateDiscount = () => {
			const commission = parseInt(percent);
			console.log(commission);
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
	return (
		<div className="flex justify-center">
			<button
				onClick={handleOpen}
				className="flex items-center w-[100%] h-[50px] gap-[11.544px] bg-[#C7E0FD] rounded-[5px] justify-center"
			>
				<img
					src="images/svgs/resultcheck.svg"
					alt="Result Checker"
					width={15}
				/>
				<p className="text-[#000] text-[12px] font-[500] leading-normal font-int">
					Result Checker
				</p>
			</button>
			<TopModal open={open} onClose={handleClose}>
				{/* <div className=" flex justify-end bg-Black font-extrabold">
          <button className="cursor-pointer" onClick={handleClose}>
          <img src="/images/png/close.png" alt=""  />
          </button>
        </div> */}
				<Typography
					sx={{ fontWeight: "700", color: "rgba(0, 0, 0, 1)", fontSize: 12 }}
				>
					Exam Type
				</Typography>

				<form className="space-y-5">
					<div className="flex items-center space-x-3 gap-8 mt-4">
						<select
							value={provider || ""}
							onChange={handleChangeProvider}
							className="border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
						>
							<option value="" disabled>
								Select Exam Type
							</option>
							<option value="waec">WAEC</option>
							<option value="neco">NECO</option>
							<option value="nabteb">NABTEB</option>
							<option value="jamb">JAMB</option>
						</select>
					</div>

					<div className="w-full space-y-4">
						<select
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							className="border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
						>
							{/* <option value="">Choose quantity </option> */}
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					</div>
					<div className="w-full space-y-4">
						<p className="text-[#4C535F] font-[500] font-int text-[14px]">
							Amount:{" "}
							<span className="text-[12px] italic">
								{loading ? "Loading amount..." : amount} per unit
							</span>
						</p>
						<AmountInput
							id="amount"
							name="amount"
							type="text"
							label=""
							value={amount}
							onChange={handleInputChange}
							placeholder="Enter Amount"
							disabled
							error={errors?.amount}
						/>
					</div>

					<AmountInput
						id="phone"
						name="phone"
						type="text"
						label="Enter Phone Number"
						value={formData.phone}
						onChange={handleInputChange}
						placeholder="Enter phone"
						error={errors.phone}
					/>

					<AmountInput
						id="email"
						name="email"
						type="text"
						label="Enter Email"
						value={formData.email}
						onChange={handleInputChange}
						placeholder="Enter email"
						error={errors?.email}
					/>

					<button
						type="button"
						onClick={() => {
							handleValidation();
						}}
						style={{ backgroundColor: "rgba(40, 192, 241, 1)" }}
						className="w-full rounded-lg py-3 flex justify-center items-center"
					>
						Proceed
					</button>
				</form>
			</TopModal>

			<TopModal open={open2} onClose={handleClose2}>
				<Typography sx={{ fontWeight: 700 }}>PRODUCT SUMMARY</Typography>

				<div className="space-y-4 mt-4">
					<div className="flex justify-between items-center">
						<span>PRODUCT:</span>
						<span>{provider?.toUpperCase()}</span>
					</div>

					<div className="flex justify-between items-center">
						<span>ACTUAL AMOUNT:</span>
						<span>₦ {amount}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>DISCOUNT AMOUNT:</span>
						<span>₦ {valuePrice}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>PHONE NUMBER:</span>
						<span>{formData.phone}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>TRANSACTION ID:</span>
						<span></span>
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
			<ConfirmModal open={open1} onClose={handleClose1}>
				<div className="text-center w-full">
					<div>
						<h3
							style={{ color: "rgba(0, 0, 0, 1)" }}
							className="font-int font-[700] text-[20px]"
						>
							{provider?.toUpperCase()} Pin Purchase Successful
						</h3>
					</div>
					<div className="w-full text-center">
						<p className="text-[14px] font-int">
							You have successfully purchased
						</p>
						<p
							style={{ color: "rgba(41, 41, 41, 1)" }}
							className="text-[14px] font-int font-[700]"
						>
							{provider?.toUpperCase()} Pin with{" "}
							<span style={{ color: "rgba(4, 142, 35, 1)" }}>
								N{valuePrice} {provider?.toUpperCase()}
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
							<p>{message}</p>
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
					<span className="text-sm">Number of pins purchased</span>
					<span className="text-sm font-[500]">{quantity}</span>
				</div>
			</ReceiptModal>
		</div>
	);
};

export default ResultSB;
