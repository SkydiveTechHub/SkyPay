import React, { useContext, useEffect, useState } from "react";
import AmountInput from "../amountInput";
import TopModal from "@/components/shared/modals/modal";
import { Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "@/context/authcontext/authcontext";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import ReceiptModal from "@/components/shared/modals/receiptModal";

const InternetSB = () => {
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url =
		process.env.BASE_URL ?? " " ?? "http://localhost/SkyPay/index.php";
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);
	const [amount, setAmount] = useState("0");
	const [message, setMessage] = useState("");
	const [percent, setPercent] = useState<number>(0);
	const [valuePrice, setValuePrice] = useState<number>(0);
	const [provider, setProvider] = useState<null | "spectranet" | "smile">(
		"spectranet"
	);
	const [cat, setCat] = useState<any>("");
	const [option, setOption] = useState<any>([]);
	const [prod, setProd] = useState<any>("");
	const [data, setData] = useState<any>([]);
	const [errors, setErrors] = useState({});
	const [selectedProd, setSelectedProd] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);

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
		amount: "",
		serviceID: "",
		phone: "",
	});
	// this should work 37 - 67

	useEffect(() => {
		const postData = {
			process: "tp_available_service_code_by_sub_code",
			api_key: api_key,
			service_code: provider, //sprectranet , smile
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
						// console.log(res?.data?.data)
						setData(res?.data?.data);
						const firstData = res?.data?.data[0];
						setProd(firstData.available_service_system_name);
						setAmount(firstData.available_service_default_price);
						setPercent(firstData.percent_commission);
					}
				}
			} catch (err: any) {
				console.log(err.message);
			}
		};

		post();
	}, [provider]);

	useEffect(() => {
		const postData = {
			process: "verify",
			api_key: api_key,
			product_code: prod?.available_service_system_name,
			account_number: formData.serviceID,
		};

		const verifyID = async () => {
			try {
				const res = await axios.post(url, JSON.stringify(postData), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res) {
					if (res.status) {
						console.log(res);
					}
				}
			} catch (err: any) {
				console.log(err.message);
			}
		};

		verifyID();
	}, [formData.serviceID]);

	// this should work 71 - 80

	useEffect(() => {
		const selectedProduct = data?.find(
			(i: any) => i.available_service_system_name === prod
		);

		if (selectedProduct) {
			setProd(selectedProduct);
			setAmount(selectedProduct.available_service_default_price);
		}
	}, [prod, data]);

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
					product_code: prod?.available_service_system_name,
					phone: formData.phone,
					bucket: "wallet",
					amount: amount,
					user_reference: "102122y", //user reference is random number
				};

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
					handleError();
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

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};
		if (!data.phone) {
			errors.phone = "Please enter your phone number";
		}

		if (!data.serviceID) {
			errors.serviceID = "Please enter card number";
		} else if (data.serviceID.length < 10) {
			errors.serviceID = "Please enter valid card number";
		}

		// if (!amount) {
		// 	errors.amount = "Please enter amount";
		// } else if (parseInt(amount) < 100) {
		// 	errors.amount = "Minimum amount of airtime is N100";
		// }

		return errors;
	};

	return (
		<div className="flex justify-center">
			<button
				onClick={handleOpen}
				className="flex items-center w-[100%] h-[50px] gap-[11.544px] bg-[#FFF6E9] rounded-[5px] justify-center"
			>
				<img src="images/svgs/broadbrand.svg" alt="BBroadband Net" width={15} />
				<p className="text-[rgb(0,0,0)] text-[12px] font-[500] leading-normal font-int">
					Broadband Net
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
					Choose Your Preferred Network
				</Typography>

				<form className="space-y-5">
					<div className="flex items-center space-x-3 gap-8 mt-2">
						<button
							type="button"
							className={`${
								provider === "spectranet"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							} `}
							onClick={() => {
								setProvider("spectranet");
							}}
						>
							<img src="/images/png/spectranet.png" alt="" />
						</button>
						<button
							type="button"
							className={`${
								provider === "smile"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							}`}
							onClick={() => {
								setProvider("smile");
							}}
						>
							<img src="/images/png/smile.png" alt="" />
						</button>

						<div></div>
					</div>

					<div>
						<AmountInput
							id="phone"
							name="serviceID"
							type="phone"
							label={`Enter ${provider?.toUpperCase()} ID`}
							value={formData.serviceID}
							onChange={handleInputChange}
							placeholder="5311******"
							// error={errors?.serviceID}
						/>
					</div>
					<div>
						<select
							value={prod}
							onChange={(e) => setProd(e.target.value)}
							className="border p-2 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
						>
							{data?.map((i: any, index: number) => (
								<option key={index} value={i.available_service_system_name}>
									{i?.available_service_description}
								</option>
							))}
						</select>
					</div>

					{/* <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
          <select value={prod} onChange={(e)=>setProd(e.target.value)} name="" id="" className='border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]'>
                  {
                    option?.map((opt:any, ind:any)=>
                      <option key={ind} value={opt.available_service_name}>{opt.available_service_description}</option>
                    )
                  }
                </select>

          </div> */}

					<div>
						<AmountInput
							id="amount"
							name="amount"
							type="text"
							label="Amount"
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
							label="Enter Mobile Number"
							value={formData.phone}
							onChange={handleInputChange}
							placeholder="08111******"
							// error={errors?.phone}
						/>
					</div>

					<button
						type="button"
						onClick={() => {
							handleValidation(); // Close the main modal
						}}
						style={{ backgroundColor: "rgba(40, 192, 241, 1)" }}
						className="w-full rounded-lg py-2 flex justify-center items-center"
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
						<span>{provider?.toUpperCase()}</span>
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
					<span className="text-sm">Purchased</span>
					<span className="text-sm font-[500]">
						{provider?.toUpperCase()}
					</span>
				</div>
			</ReceiptModal>
		</div>
	);
};

export default InternetSB;
