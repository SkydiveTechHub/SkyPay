import React, {
	ChangeEvent,
	FormEvent,
	useContext,
	useEffect,
	useState,
} from "react";
import BasicCard from "./card";
import AmountInput from "./amountInput";
import ErrorTag from "./error";
import TopModal from "../shared/modals/modal";
import { Typography } from "@mui/material";
import { AuthContext } from "@/context/authcontext/authcontext";
import axios from "axios";

const FundCard = () => {
	const url = process.env.BASE_URL ?? ' ';
	const [selectedOption, setSelectedOption] = useState<string>("debit_card");
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [bankData, setBankData] = useState<any>([]);
	const [formData, setFormData] = useState({
		amount: "",
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
		// try {
		//   const response = await axios.post('/api/login', { email, password });
		//   console.log('Login successful', response.data);
		// } catch (error) {
		//   console.error('Login failed', error);
		// }
	};

	useEffect(() => {
		const params = {
			process: "tp_bank_details",
			api_key: api_key,
		};

		const post = async () => {
			if (selectedOption === "bank_deposit") {
				try {
					const response = await axios.post(url, JSON.stringify(params));
					setBankData(response.data.data[0].accounts);
				} catch (error) {
					console.error(error);
				}
			}
		};

		post();
	}, [selectedOption]);

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [amount, setAmount] = useState("0");
	const [provider, setProvider] = useState<
		null | "mtn" | "glo" | "airtel" | "9mobile"
	>(null);

	return (
		<BasicCard>
			<p className="font-int font-[600] text-[#22347F] text-[14px] ">
				Fund Wallet
			</p>
			<ErrorTag desc="Please note that you are required to pay a minimum of ₦100 " />
			<form action="" className="flex flex-col gap-5">
				<div className="w-full">
					<AmountInput
						id="email"
						name="amount"
						type="text"
						label="Amount"
						value={formData.amount}
						onChange={handleInputChange}
						placeholder="Amount"
						// error={nameError}
					/>
				</div>

				<div>
					<p
						style={{ color: "rgba(0, 0, 0, 1)" }}
						className="font-[500] text-[12px] font-[inter] mb-4"
					>
						Choose Payment method
					</p>
					<div className="flex w-full justify-center gap-8">
						<div>
							<input
								type="radio"
								id="buyAgain"
								name=""
								checked={selectedOption === "debit_card"}
								onChange={(e) => setSelectedOption(e.target.value)}
								value="debit_card"
							/>
							<label
								htmlFor="buyAgain"
								style={{ color: "rgba(0, 0, 0, 1)" }}
								className="ml-1 font-[500] text-[12px] font-[inter] mb-4"
							>
								Debit Card
							</label>
						</div>
						<div>
							<input
								type="radio"
								id="buyAgain"
								name=""
								checked={selectedOption === "bank_deposit"}
								onChange={(e) => setSelectedOption(e.target.value)}
								value="bank_deposit"
							/>
							<label
								htmlFor="buyAgain"
								style={{ color: "rgba(0, 0, 0, 1)" }}
								className="ml-1 font-[500] text-[12px] font-[inter] mb-4"
							>
								Bank Deposit
							</label>
						</div>
					</div>
				</div>
				<button
					type="button"
					onClick={handleOpen}
					style={{
						backgroundColor: "rgba(29, 191, 65, 1)",
						color: "rgba(255, 255, 255, 1)",
					}}
					className="w-full p-2 rounded-md font-[600] font-[inter]"
				>
					Continue
				</button>
			</form>
			<TopModal open={open} onClose={handleClose}>
				<div className="flex gap-6 flex-col">
					<p className="font-int font-[600] ">Bank Deposit</p>
					<div>
						<span className="text-[red] text-[12px] font-int">
							Deposit Money into the below account provided and your wallet will
							be credited after confirmation.{" "}
							<span className="text-[#000]">
								Contact Admin on +2347049828687
							</span>
						</span>
					</div>
					<select className="w-full p-2 rounded-lg border outline-none">
						<option value="">Choose Bank</option>
						{bankData?.map((i: any, ind: number) => (
							<option key={ind} value={i.account_number}>
								{i.bank_name} - {i.account_number}
							</option>
						))}
					</select>

					<button className="w-full py-3 bg-[#28C0F1] text-[#000] font-int font-[500] rounded-lg">
						Payment Done
					</button>
				</div>
			</TopModal>
		</BasicCard>
	);
};

export default FundCard;
