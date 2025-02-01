import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import TopModal from "@/components/shared/modals/modal";
import ReceiptModal from "@/components/shared/modals/receiptModal";
import { AuthContext } from "@/context/authcontext/authcontext";
import GenerateID from "@/hooks/generateId";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useContext, useEffect, useState } from "react";

const BuyData = () => {
	// const url = process.env.BASE_URL ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ?? "";
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [option, setOption] = useState<any>([]);
	const [data, setData] = useState<any>([]);
	const [cat, setCat] = useState<any>("");
	const [prod, setProd] = useState<any>("");
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const [message, setMessage] = useState("");
	const [open2, setOpen2] = React.useState(false);
	const [open4, setOpen4] = React.useState(false);
	const [amount, setAmount] = useState("0");
	const [loading, setLoading] = useState<boolean>(false);
	const [percent, setPercent] = useState<number>(0);
	const [valuePrice, setValuePrice] = useState<number>(0);
	const [provider, setProvider] = useState<
		null | "mtn" | "glo" | "airtel" | "9mobile"
	>("mtn");
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [generate, setGenerate] = React.useState(false);
	const { id } = GenerateID(generate);

	const handleOpen = () => {
		setGenerate(true);
		setOpen(true);
	};

	const handleClose = () => {
		setGenerate(false);
		setOpen(false);
	};

	const handleOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};

	const handleSwitch = () => {
		setOpen(false);
		setOpen2(true);
	};
	const handleClose4 = () => {
		setOpen4(false);
	};

	const handleOpen4 = () => {
		setOpen4(true);
	};

	const [selectedBundleAmount, setSelectedBundleAmount] = useState<
		number | null
	>(null);

	const [formData, setFormData] = useState({
		phone: "",
		selectedBundle: "",
	});

	const handleChangeInput = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		handleInputChange(name, value);
	};
	const [open3, setOpen3] = React.useState(false);
	const handleClose3 = () => {
		setOpen3(false);
	};
	const handleError = () => {
		setOpen(false);
		setOpen3(true);
	};

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
		setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

	useEffect(() => {
		const params = {
			process: "tp_available_service_code_data_by_network",
			api_key: api_key,
			network_name: provider,
		};
		const post = async () => {
			try {
				const res = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res) {
					if (res.status) {
						let data = res?.data?.data;
						setData(data);
						console.log(data);
						setOption(data[0].available_services);
						setAmount(
							data[0].available_services[0].available_service_actual_price
						);
						setPercent(data[0].available_services[0].percent_commission);
						setProd(data[0].available_services[0].available_service_name);
					}

					console.log(res.data);
				}
			} catch (error) {
				console.log(error);
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

	useEffect(() => {
		if (cat !== "") {
			const option = data?.find((i: any) => i.sub_service_group_name === cat);
			setOption(option?.available_services);
			setAmount(option?.available_services[0].available_service_actual_price);
		}
	}, [cat]);

	useEffect(() => {
		if (prod !== "") {
			console.log(prod);
			const product = option?.find(
				(i: any) => i.available_service_name === prod
			);
			setAmount(product?.available_service_actual_price);
		}
	}, [prod]);

	useEffect(() => {
		if (cat !== "") {
			const option = data?.find((i: any) => i.sub_service_group_name === cat);
			setOption(option?.available_services);
			setAmount(option?.available_services[0].available_service_actual_price);
		}
	}, [cat]);

	useEffect(() => {
		if (prod !== "") {
			const product = option?.find(
				(i: any) => i.available_service_name === prod
			);
			setAmount(product?.available_service_actual_price);
		}
	}, [prod]);
	const handleValidation = () => {
		const validationErrors = validateFormData(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setOpen(true);
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
					user_reference: "1",
				};
				console.log(params);
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

		// if (!data.amount) {
		// 	errors.amount = "Please enter amount";
		// } else if (data.amount.length < 100) {
		// 	errors.amount = "Minimum amount of airtime is N100";
		// }

		return errors;
	};

	return (
		<Grid container spacing={4} paddingX={{ sm: 0, md: 3 }}>

			<Grid item sm={9} className="w-[100%]">
				<Typography className="font-inter text-lg mb-4 text-[#252525]">
					Choose your network
				</Typography>
				<BasicCard>
					<div className="grid grid-cols-4 gap-4 md:flex items-center space-x-3 w-full">
						<button
							type="button"
							style={{
								backgroundColor: "rgba(255, 196, 3, 0.3)",
								// width: provider === "mtn" ? "120px" : "100px",
								height: provider === "mtn" ? "60px" : "50px",
							}}
							className={`${
								provider === "mtn"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							} relative w-[50px] md:w-[100px] p-2 flex items-center justify-center rounded-lg`}
							onClick={() => {
								setProvider("mtn");
							}}
						>
							{provider === "mtn" && (
								<img
									src="/images/png/clicked.png"
									className="absolute right-0 top-0 w-4"
									alt=""
								/>
							)}
							<img
								className="w-[35px] h-[35px]"
								src="/images/png/mtn.png"
								alt=""
							/>
							<div className="border-l hidden md:inline ml-1 px-1 border-[#000]">
								<span className="font-[600] text-[12px] font-int">MTN</span>
							</div>
						</button>
						<button
							type="button"
							style={{
								backgroundColor: "rgba(227, 6, 19, 0.3)",
								// width: provider === "airtel" ? "120px" : "100px",
								height: provider === "airtel" ? "60px" : "50px",
							}}
							className={`${
								provider === "airtel"
									? "border border-[#000] rounded-lg "
									: ""
							} relative   w-[50px] md:w-[100px] p-2 flex items-center justify-center rounded-lg`}
							onClick={() => {
								setProvider("airtel");
							}}
						>
							{provider === "airtel" && (
								<img
									src="/images/png/clicked.png"
									className="absolute right-0 top-0 w-4"
									alt=""
								/>
							)}
							<img
								className="w-[35px] h-[35px]"
								src="/images/png/airtel.png"
								alt=""
							/>
							<div className=" border-l hidden md:inline ml-1  px-1 border-[#000]">
								<span className="font-[600] text-[12px] font-int">AIRTEL</span>
							</div>
						</button>
						<button
							type="button"
							style={{
								backgroundColor: "rgba(0, 151, 0, 0.3)",
								// width: provider === "glo" ? "120px" : "100px",
								height: provider === "glo" ? "60px" : "50px",
							}}
							className={`${
								provider === "glo"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							} relative w-[50px] md:w-[100px] p-2 flex items-center justify-center rounded-lg`}
							onClick={() => {
								setProvider("glo");
							}}
						>
							{provider === "glo" && (
								<img
									src="/images/png/clicked.png"
									className="absolute right-0 top-0 w-4"
									alt=""
								/>
							)}
							<img
								className="w-[35px] h-[35px]"
								src="/images/png/glo.png"
								alt=""
							/>
							<div className="border-l hidden md:inline ml-1 px-1 border-[#000]">
								<span className="font-[600] text-[12px] font-int">GLO</span>
							</div>
						</button>
						<button
							type="button"
							style={{
								backgroundColor: "rgba(0, 151, 0, 0.3)",
								// width: provider === "9mobile" ? "120px" : "100px",
								height: provider === "9mobile" ? "60px" : "50px",
							}}
							className={`${
								provider === "9mobile"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							} relative w-[50px] md:w-[100px] p-2 flex items-center justify-center rounded-lg`}
							onClick={() => {
								setProvider("9mobile");
							}}
						>
							{provider === "9mobile" && (
								<img
									src="/images/png/clicked.png"
									className="absolute right-0 top-0 w-4"
									alt=""
								/>
							)}
							<img
								className="w-[35px] h-[35px]"
								src="/images/png/9mobile.png"
								alt=""
							/>
							<div className="border-l hidden md:inline ml-1 px-1 border-[#000]">
								<span className="font-[600] text-[12px] font-int">9MOBILE</span>
							</div>
						</button>
					</div>
				</BasicCard>
			</Grid>
			<Grid item sm={9} className="w-[100%]">
				<BasicCard>
					<form className="space-y-6 p-2 md:p-6 w-full">
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Network
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="text"
									disabled
									value={provider === null ? "" : provider.toUpperCase()}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Choose Bundle
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
								<select
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
									value={cat}
									onChange={(e) => setCat(e.target.value)}
									name=""
									id=""
								>
									{data?.map((i: any, ind: any) => (
										<option value={i.sub_service_group_name} key={ind}>
											{i.sub_service_group_name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Select Bundle
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
								<select
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
									value={prod}
									onChange={(e) => setProd(e.target.value)}
									name=""
									id=""
								>
									{option?.map((opt: any, ind: any) => (
										<option value={opt.available_service_name}>
											{opt.available_service_description}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Amount
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="text"
									disabled
									value={amount}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
							</div>
						</div>

						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Phone
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
								<div className="pl-2 pr-3 border-r">
									<span className="text-[#8D98AA] font-[600] font-int text-[14px]">
										+234
									</span>
								</div>
								<input
									type="phone"
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
									value={formData.phone}
									onChange={handleChangeInput}
									name="phone"
								/>
								{errors.phone && (
									<small className="text-[rgb(255,0,0)]">{errors.phone}</small>
								)}
							</div>
						</div>

						<button
							type="button"
							onClick={() => {
								handleValidation();
							}}
							style={{
								backgroundColor: "rgba(29, 191, 65, 1)",
								color: "rgba(255, 255, 255, 1)",
							}}
							className=" w-[100%] md:w-[200px] py-2 rounded-lg font-int font-[700]"
						>
							Continue
						</button>
					</form>
				</BasicCard>

				<TopModal open={open} onClose={handleClose}>
					<Typography sx={{ fontWeight: 700 }}>PRODUCT SUMMARY</Typography>
					<div className="space-y-4 mt-4">
						<div className="flex justify-between items-center">
							<span>PRODUCT:</span>
							<span> {prod}</span>
						</div>
						<div className="flex justify-between items-center">
							<span>VALUE:</span>
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
							<span>{String(id)}</span>
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

				{/* confirmation modal */}
				<ConfirmModal open={open2} onClose={handleClose2}>
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
							<p className="text-[14px] font-int">
								You have successfully topup
							</p>
							<p
								style={{ color: "rgba(41, 41, 41, 1)" }}
								className="text-[14px] font-int font-[700]"
							>
								{formData.phone} with{" "}
								<span style={{ color: "rgba(4, 142, 35, 1)" }}>
									{prod.toUpperCase()}
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
						<div className="w-full text-center">
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
						<span className="font-[500] text-sm">{prod.toUpperCase()}</span>
					</div>
				</ReceiptModal>
			</Grid>
		</Grid>
	);
};

export default BuyData;
