import React, { FormEvent, useContext, useEffect, useState } from "react";
import AmountInput from "../amountInput";
import TopModal from "@/components/shared/modals/modal";
import { Typography } from "@mui/material";
import axios from "axios";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import { AuthContext } from "@/context/authcontext/authcontext";
import ReceiptModal from "@/components/shared/modals/receiptModal";

const DataSB = () => {
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? " ";
	const [option, setOption] = useState<any>([]);
	const [data, setData] = useState<any>([]);
	const [message, setMessage] = useState("");
	const [cat, setCat] = useState<any>("");
	const [prod, setProd] = useState<any>("");
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);
	const [amount, setAmount] = useState("0");
	const [loading, setLoading] = useState<boolean>(false);
	const [provider, setProvider] = useState<
		null | "mtn" | "glo" | "airtel" | "9mobile"
	>("mtn");
	const [percent, setPercent] = useState("0");
	const [valuePrice, setValuePrice] = useState<number>(0);

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
	const handleOpen2 = () => {
		setOpen2(true);
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
	const handleFail = () => {
		setOpen1(false);
		setOpen2(true);
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
		const validationErrors = validateFormData(formData);

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
					bucket: "wallet",
					user_reference: "1", //user reference is random number
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
				if (response.data.status) {
					setLoading(false);
					handleSwitch();
				} else {
					setLoading(false);
					handleFail();
				}
			} catch (error) {
				// toast.error('Login Failed')
				setLoading(false);
				console.error(error);
				handleFail();

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

	useEffect(() => {
		const params = {
			process: "tp_available_service_code_data_by_network",
			api_key: api_key,
			network_name: provider,
			percent_commission: percent,
		};

		setLoading(true);
		const post = async () => {
			try {
				const res = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res) {
					if (res.status) {
						let data = res.data.data;
						console.log(params);
						console.log(data);
						setData(data);
						setOption(data[0].available_services);
						setAmount(
							data[0].available_services[0].available_service_actual_price
						);
						setProd(data[0].available_services[0].available_service_name);
						setPercent(data[0].available_services[0].percent_commission);
					}

					console.log(res);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false); // Set loading to false after processing the response
			}
		};

		post();
	}, [provider]);

	useEffect(() => {
		if (cat !== "") {
			const option = data?.find((i: any) => i.sub_service_group_name === cat);
			setOption(option?.available_services);
			setAmount(option?.available_services[0].available_service_actual_price);
			setProd(option?.available_services[0].available_service_name);
			setPercent(option?.available_services[0].percent_commission);
		}
	}, [cat]);

	useEffect(() => {
		if (prod !== "") {
			const product = option?.find(
				(i: any) => i.available_service_name === prod
			);
			setAmount(product?.available_service_actual_price);
			setPercent(product?.percent_commission);
		}
	}, [prod]);

	useEffect(() => {
		const calculateDiscount = () => {
			const commission = parseInt(percent);
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
				className="flex items-center w-[100%] h-[50px] gap-[11.544px] bg-[#E6F9FF] rounded-[5px] justify-center"
			>
				<img src="images/svgs/buydata.svg" alt="Buy Data" width={15} />
				<p className="text-[#000] text-[12px] font-[500] leading-normal font-int">
					Buy Data
				</p>
			</button>
			<TopModal open={open} onClose={handleClose}>
				{/* <div className=" flex justify-end bg-Black font-extrabold">
          <button className="cursor-pointer" onClick={handleClose}>
          <img src="/images/png/close.png" alt=""  />
          </button>
        
        </div> */}

				<form>
					<div>
						<AmountInput
							id="phone"
							name="phone"
							type="phone"
							label="Enter Mobile Number"
							value={formData.phone}
							onChange={handleInputChange}
							placeholder="08111******"
							error={errors?.phone}
						/>
					</div>

					<Typography
						sx={{
							fontWeight: "700",
							color: "rgba(0, 0, 0, 1)",
							fontSize: 12,
							mt: 3,
						}}
					>
						Choose Your Preferred Network
					</Typography>

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

					<div className="space-y-4 py-4">
						<div>
							<select
								value={cat}
								onChange={(e) => setCat(e.target.value)}
								name=""
								id=""
								className="border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
							>
								{data?.map((i: any, ind: any) => (
									<option value={i.sub_service_group_name} key={ind}>
										{i.sub_service_group_name}
									</option>
								))}
							</select>
						</div>
						<div>
							<select
								value={prod}
								onChange={(e) => setProd(e.target.value)}
								name=""
								id=""
								className="border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
							>
								{option?.map((opt: any, ind: any) => (
									<option key={ind} value={opt.available_service_name}>
										{opt.available_service_description}
									</option>
								))}
							</select>
						</div>

						<div>
							<input
								className="border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
								type="text"
								disabled
								value={amount}
							/>
						</div>
					</div>

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
			<TopModal open={open1} onClose={handleClose1}>
				<Typography sx={{ fontWeight: 700 }}>PRODUCT SUMMARY</Typography>

				<div className="space-y-4 mt-4">
					<div className="flex justify-between items-center">
						<span>PRODUCT:</span>
						<span>Prepaid {provider?.toUpperCase()}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>ACTUAL AMOUNT</span>
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
							DATA TopUp Successful
						</h3>
					</div>
					<div className="w-full text-center">
						<p className="text-[14px] font-int">You have successfully topup</p>
						<p
							style={{ color: "rgba(41, 41, 41, 1)" }}
							className="text-[14px] font-int font-[700]"
						>
							{formData.phone} with{" "}
							<span style={{ color: "rgba(4, 142, 35, 1)" }}>
								N{valuePrice} {prod.toUpperCase()}
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
					<span className="text-sm">Number of GB purchased</span>
					<span className="font-[500] text-sm"></span>
				</div>
			</ReceiptModal>
		</div>
	);
};

export default DataSB;
