import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import TopModal from "@/components/shared/modals/modal";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const BuyInternet = () => {
	// const url = process.env.BASE_URL ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
	const url = process.env.BASE_URL ??'';
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const username = auth?.userData?.username;
	const [amount, setAmount] = useState("0");
	const [data, setData] = useState<any>([]);
	const [cat, setCat] = useState<any>("");
	const [prod, setProd] = useState<any>("");
	const [option, setOption] = useState<any>([]);
	const [percent, setPercent] = useState("0");
	const [valuePrice, setValuePrice] = useState<number>(0);
	const [product, setProduct] = useState<string>("");
	const [provider, setProvider] = useState<null | "spectranet" | "smile">(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const [formData, setFormData] = useState({
		phone: "",
		amount: "",
		email: "",
		card_number: "",
	});
	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
		setOpen(false);
		setOpen2(true);
	};

	const handleError = () => {
		setOpen(false);
		setOpen3(true);
	};

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		handleInputChange(name, value);
	};

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
		setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

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
					api_key:
						"dPta1myn2bOZrttYqRqpy7ddD0mfC1iWaCkKAj4H65vlR5LQJn0b468CHQPSYErxQvrkIuETkhlKm7UJRirrOiKoGTirGFkFGEOs4XBlH50sMKOf00PjrJHOzNls8E6J",
					product_code: prod,
					phone: formData.card_number,
					//
					name: username,
					bucket: "wallet",
					user_reference: "12200000000000012",
				};
				console.log("now processing");
				const response = await axios.post(url, JSON.stringify(params), {
					headers: {
						"Content-Type": "application/json",
					},
				});

				console.log(response.data);
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

		if (!data.card_number) {
			errors.card_number = "Kindly enter your email address";
		}

		return errors;
	};
	useEffect(() => {
		if (cat !== "") {
			const option = data?.find((i: any) => i.sub_service_group_name === cat);
			setOption(option?.available_services);
			setAmount(option?.available_services[0].available_service_actual_price);
			setPercent(option?.[0].available_services[0].percent_commission);
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
		const postData = {
			process: "tp_available_service_code_by_sub_code",
			api_key:
				"dPta1myn2bOZrttYqRqpy7ddD0mfC1iWaCkKAj4H65vlR5LQJn0b468CHQPSYErxQvrkIuETkhlKm7UJRirrOiKoGTirGFkFGEOs4XBlH50sMKOf00PjrJHOzNls8E6J",
			service_code: `${provider}`, //smile, spectranet,
			percent_commission: percent,
		};

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
						let data = res.data.data;
						setData(data);
						setProduct(res.data.data_result[0].available_service_description);
						setAmount(res.data.data_result[0].available_service_default_price);
						setPercent(
							res.data.data[0].available_services[0].percent_commission
						);
						setOption(data[0].available_services);
						setAmount(
							data[0].available_services[0].available_service_actual_price
						);
						setPercent(
							res.data.data[0].available_services[0].percent_commission
						);
					}

					console.log(res.data);
				}
			} catch (err: any) {
				console.log(err.message);
			}
		};

		post();
	}, [provider]);

	useEffect(() => {
		const calculateDiscount = () => {
			const commission = parseInt(percent);
			console.log(commission);
			let calculatedValuePrice;
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
		<Grid container spacing={8} paddingX={3}>
			<Grid item sm={9} sx={{ mt: 3 }}>
				<Typography className="font-inter text-2xl font-[700] mb-0">
					Broadband Internet
				</Typography>
			</Grid>
			<Grid item sm={9}>
				<Typography className="font-inter text-lg mb-4 text-[#252525]">
					Choose Provider
				</Typography>
				<BasicCard>
					<div className="flex items-center space-x-3 mt-4">
						<button
							type="button"
							className={`${
								provider === "spectranet"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							} relative`}
							onClick={() => {
								setProvider("spectranet");
							}}
						>
							{provider === "spectranet" && (
								<img
									src="/images/png/clicked.png"
									className="absolute right-0 top-0"
									alt=""
								/>
							)}
							<img src="/images/png/spectranet.png" alt="" />
						</button>
						<button
							type="button"
							className={`${
								provider === "smile"
									? "border border-[#000] rounded-lg p-[1px]"
									: ""
							} relative`}
							onClick={() => {
								setProvider("smile");
							}}
						>
							{provider === "smile" && (
								<img
									src="/images/png/clicked.png"
									className="absolute right-0 top-0"
									alt=""
								/>
							)}
							<img src="/images/png/smile.png" alt="" />
						</button>
					</div>
				</BasicCard>
			</Grid>
			<Grid item sm={9}>
				<BasicCard>
					<form className="space-y-6 p-6">
						<div className="w-full space-y-4">
							<p className="text-[#4C535F] font-[500] font-int text-[14px]">
								Provider
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
								Enter {provider?.toUpperCase()} card number{" "}
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								<input
									type="text"
									name="card_number"
									value={formData.card_number}
									onChange={handleChangeInput}
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
									value={cat}
									onChange={(e) => setCat(e.target.value)}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
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
								Amount
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
								{/* <input
                  type="text"
                  value={amount}
                  disabled
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                /> */}
								<select
									value={prod}
									onChange={(e) => setProd(e.target.value)}
									name=""
									id=""
									className="border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]"
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
								Phone Number
							</p>
							<div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
								<div className="pl-2 pr-3 border-r">
									<span className="text-[#8D98AA] font-[600] font-int text-[14px]">
										+234
									</span>
								</div>
								<input
									type="phone"
									name="phone"
									value={formData.phone}
									onChange={handleChangeInput}
									className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
								/>
							</div>
						</div>

						<button
							type="button"
							onClick={handleOpen}
							style={{
								backgroundColor: "rgba(29, 191, 65, 1)",
								color: "rgba(255, 255, 255, 1)",
							}}
							className="w-[200px] py-2 rounded-lg font-int font-[700]"
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
							<span>{product}</span>
						</div>
						<div className="flex justify-between items-center">
							<span>AMOUNT:</span>
							<span></span>
						</div>
						<div className="flex justify-between items-center">
							<span>PHONE NUMBER:</span>
							<span></span>
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
							{loading ? "Processing..." : "Confirm"}
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
								08036528895 with{" "}
								<span style={{ color: "rgba(4, 142, 35, 1)" }}>
									50MB MTN Corporate Data at N15
								</span>
							</p>
						</div>
					</div>
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
			</Grid>
		</Grid>
	);
};

export default BuyInternet;
