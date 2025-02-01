import React, { useState } from "react";
import BasicCard from "@/components/dashboard/card";
import { Grid } from "@mui/material";
import FundWithBank from "./fund-with-bank";
import FundWithCard from "./fund-with-card";

const fundWallet2 = () => {
	const [page, setPage] = useState<"withbank" | "withcard">("withbank");
	return (
		<Grid container>
			<Grid item sm={12} lg={10}>
				<h2 className="font-[600] text-[#252525] text-[27px] font-[inter] mb-7">
					Wallets
				</h2>
				<div className="bg-[#E6F9FF66] p-14 rounded-[20px] w-[80%]">
					<div className="space-x-4 mb-8">
						<button
							onClick={() => setPage("withbank")}
							className={`border-b px-3 py-2 font-int font-[500] text-[15px] ${
								page === "withbank"
									? "text-[#28C0F1] border-[#28C0F1] font-[700]"
									: "text-[#717B8C] border-[#717B8C]"
							} `}
						>
							Fund with Bank
						</button>
						<button
							onClick={() => setPage("withcard")}
							className={`border-b px-3 py-2 font-int font-[500] text-[15px] ${
								page === "withcard"
									? "text-[#28C0F1] border-[#28C0F1] font-[700]"
									: "text-[#717B8C] border-[#717B8C]"
							} `}
						>
							Fund with Card
						</button>
					</div>
					{page === "withbank" && <FundWithBank />}
					{page === "withcard" && <FundWithCard />}
				</div>
			</Grid>
		</Grid>
	);
};

export default fundWallet2;
