import React from "react";
import TopModal from "@/components/shared/modals/modal";

const FundWithBank = () => {
	return (
		<form className="w-[60%] mt-[90px] pb-16">
			<div className="flex gap-6 flex-col">
				<p className="font-int font-[600] ">Bank Deposit</p>
				<div>
					<span className="text-[#F30000] text-[14px] font-[700] font-int">
						Deposit Money into the below account provided and your wallet will
						be credited after confirmation.{" "}
						<span className="text-[#000]">Contact Admin on +2347049828687</span>
					</span>
				</div>
				<select className="w-full p-2 rounded-lg border outline-none">
					{/* <option value="">Choose Bank</option>
						{bankData?.map((i: any, ind: number) => (
							<option key={ind} value={i.account_number}>
								{i.bank_name} - {i.account_number}
							</option>
						))} */}
					<option value="Michael">Michael Bank</option>
					<option value="Kayode">Kayode Bank</option>
				</select>

				<button className="w-full py-3 bg-[#28C0F1] text-[#fff] font-int font-[600] rounded-lg">
					Payment Done
				</button>
			</div>
		</form>
	);
};

export default FundWithBank;
