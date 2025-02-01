import React from "react";
import { useState } from "react";
import Faq from "./faq";
import TopModal from "@/components/shared/modals/modal";
import RegularInput from "@/components/dashboard/RegInput";

const Support = () => {
	const [formData, setFormData] = useState({
		email: "",
		amount: "",
	});
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	return (
		<div>
			<h2 className="font-int font-[600] text-[30px] leading-[43.57px] mb-5">
				Get help/FAQs
			</h2>
			<div className="w-[90%] p-10 bg-[#E6F9FF] rounded-[20px]">
				<div className="w-[55%]">
					<h3 className="text-[30px] font-int font-[700] leading-[38.73px] text-[#333333] mb-3">
						Create a ticket
					</h3>
					<p className="text-[17px] font-[400] font-int text-[#7F8187] mb-3">
						Raise a complaint and our team would reach out to you in less than 8
						hours.
					</p>
					<div className="flex gap-4">
						<button
							className="bg-[#28C0F1] rounded-[8px] px-6 py-2 text-[#fff] text-[16px] font-[Manrope] font-[700]"
							onClick={handleOpen}
						>
							Raise a complaint
						</button>
						<button className="px-6 py-2 border-[1px] rounded-[8px] border-[#333333] text-[16px] font-[Manrope] font-[700]">
							View my ticket
						</button>
					</div>
				</div>
				<div className="border-t-[4px] border-[#E0E4EC] mt-20">
					<Faq />
				</div>
			</div>
			<TopModal open={open} onClose={handleClose}>
				<div className="font-int">
					<h3 className="font-[700] text-[28px] text-[#333333]">
						Support ticket
					</h3>
					<p className="font-[400] text-[#7F8187] text-[16px]">
						To Create a Dispute or Complain, enter the following required
						information
					</p>
					<form className="flex flex-col space-y-8 p-2 w-[100%] mt-8">
						<RegularInput
							id="Subject"
							name="Subject"
							type="Subject"
							label="Subject"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Type in subject"
						/>
						<div className="font-int">
							<label htmlFor="myTextarea" className="mb-1 block">
								Message
							</label>
							<textarea
								className="border rounded-[8px] p-3 w-full h-[170px] border-none outline-none bg-[#EDF2F6]"
								name=""
								placeholder="Type in message"
								id="myTextarea"
							></textarea>
						</div>
						<button
							type="button"
							onClick={handleOpen}
							style={{
								backgroundColor: "#28C0F1",
								color: "rgba(255, 255, 255, 1)",
							}}
							className="w-full p-2 rounded-md font-[600] font-[inter]"
						>
							Submit
						</button>
					</form>
				</div>
			</TopModal>
		</div>
	);
};

export default Support;
