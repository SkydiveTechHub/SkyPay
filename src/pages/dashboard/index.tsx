import BasicCard from "@/components/dashboard/card";
import FundCard from "@/components/dashboard/fundCard";
import QuickRecharge from "@/components/dashboard/inputwithEdit";
import ServiceBoxes from "@/components/dashboard/serviceBoxes";
import SocialTabs from "@/components/social";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import QuickAction from "./QuickAction";
import Dashtable from "@/components/dashboard/tables/Dashtable";
import Link from "next/link";
import Rectable from "@/components/dashboard/tables/RecTable";
import isAuth from "../Protected";
import WalletCheck from "@/components/dashboard/home/WalletCheck";
import AccountCheck from "@/components/dashboard/home/AccountCheck";


function Dashboard() {
	return (
		<div className="max-w-[100%]">

				<Grid item sm={12}
				
				>
					<Grid sm={12}
					sx={{
						width: "100%",
						backgroundColor: 'rgba(127, 87, 241, 0.1)',
						py: 1,
						px: 2,
						borderLeft:'3px solid rgba(127, 87, 241)',
						borderRadius: "10px",
						display:'none'
					}}>

						<div className='w-full lg:w-[50%] flex flex-col justify-center md:w-full md:flex-row md:justify-between items-center'>
							<div>
								<p className="font-[500] text-[14px] font-int" style={{color:'rgba(127, 87, 241, 1)'}}>Add a card to your account for easy wallet funding</p>
							</div>
							<div>
								<Link href='/dashboard/kyc'><button className="bg-[#7F57F1] py-[8px] px-[15px] text-white rounded-md text-[14px] font-[800] ">Add One Now</button></Link>
								
							</div> 
						</div>
					</Grid>

					<Grid item sm={12} sx={{py:6}}>
						<div className="w-full flex flex-col md:flex-row gap-10">
							<WalletCheck/>
							<div className="hidden md:inline">
								<AccountCheck/>
							</div>
							


						</div>

					</Grid>


					<Grid
						item
						sm={12}
						sx={{
							width: "100%",
							// py: 4,
							px: 2,
							borderRadius: "10px",
							// "@media (max-width: 768px)": {
							// 	width: "80%",
							// },
							
						}}
					>
						<ServiceBoxes />
					</Grid>

					<Grid
						sm={12}
						sx={{
							backgroundColor: "#fff",
							py: 4,
							px: 2,
							borderRadius: "10px",
							mt: 4,
							width: "100%",
							// "@media (max-width: 768px)": {
							// 	width: "50%",
							// },
						}}
					>
						<div className="flex flex-row items-center w-full justify-between">
							<p
								style={{ color: "rgba(30, 0, 41, 1)" }}
								className="font-int font-[600] text-[16px]"
							>
								Transactions
							</p>
							<Link
								style={{
									color: "rgba(40, 192, 241, 1)",
								}}
								className="underline rounded-md font-[600] font-int text-[14px] "
								href="/dashboard/transactions"
							>
								See All
							</Link>
						</div>
						<div className="w-full overflow-x-scroll">
							<Rectable />
						</div>
					</Grid>
				</Grid>

		
		</div>
	);
}

export default isAuth(Dashboard);