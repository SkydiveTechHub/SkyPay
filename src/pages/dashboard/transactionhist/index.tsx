import MyDataGrid from "@/components/dashboard/Transactions";
import { AuthContext } from "@/context/authcontext/authcontext";
import usePost from "@/hooks/usePost";
import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import axios from "axios";
const url = process.env.BASE_URL??'';

const TransctionsPage = () => {
	const [table, setTable] = useState<"pending" | "failed" | "successful">(
		"failed"
	);
	const auth = React.useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		const post = async () => {
			try {
				setLoading(true); // Set loading to true before making the request
				const postData = {
					process: "tp_transaction_history",
					api_key: api_key,
					action_check: `${table}_history`,
				};
				const res = await axios.post(url, JSON.stringify(postData), {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (res && res.status === 200) {
					const dataArray = res?.data?.data;
					setData(dataArray);
					setLoading(false);
				}
			} catch (err: any) {
				console.log(err.message);
				setLoading(false);
			}
		};

		post();
	}, [table]);

	// React.useEffect(()=>{
	//   if (myData.data){
	//     console.log(lsetLoading)
	//     console.log(myData)
	//     setLoading(true)
	//     setData(myData.data)
	//     setLoading(false)
	//   }
	// },[myData, table])

	return (
		<div className="space-y-4">
			<div className="space-x-3">
				<button
					onClick={() => setTable("pending")}
					className={`border-[#020d1e] border text-[#020d1e] ${
						table === "pending" && "bg-[#020d1e] text-[#fff]"
					} py-[12px] font-int font-[500] text-[14px] text-[#333333] px-12 rounded-lg`}
				>
					Pending
				</button>
				<button
					onClick={() => setTable("failed")}
					className={`border-[#020d1e] border text-[#020d1e] ${
						table === "failed" && "bg-[#020d1e] text-[#fff]"
					} py-[12px] font-int font-[500] text-[14px] text-[#333333] px-12 rounded-lg`}
				>
					Failed
				</button>
				<button
					onClick={() => setTable("successful")}
					className={`border-[#020d1e] border text-[#020d1e] ${
						table === "successful" && "bg-[#020d1e] text-[#fff]"
					} py-[12px] font-int font-[500] text-[14px] text-[#333333] px-12 rounded-lg`}
				>
					Successful
				</button>
			</div>
			{data && (
				<div className="bg-white p-6 shadow-lg ">
					<div className="flex pb-5 flex-col md:flex-row justify-between">
                    <div>
						<h3 className="font-int font-[600] text-[23px]">
							{table.toUpperCase()} Transactions
						</h3>
					</div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <button className="flex justify-around items-center pl-4 pr-4 bg-[#F0EFFF] text-[#1E1E1E] w-[8rem] rounded-md  font-int font-[500] text-[14px]">
                            By Date
							
							<img src="/images/svgs/arrowview.svg" alt="" className="w-[10px] h-[10px]"  />
			
                        </button>
                        <button className="flex justify-around items-center pl-4 pr-4 bg-[#F0EFFF] text-[#1E1E1E] w-[8rem] rounded-md  font-int font-[500] text-[14px]">
                            By Service
							<img src="/images/svgs/arrowview.svg" alt="" className="w-[10px] h-[10px]"  />

                        </button>
                        <button className="flex justify-around items-center pl-4 pr-4 bg-[#F0EFFF] text-[#1E1E1E] w-[8rem] rounded-md  font-int font-[500] text-[14px]">
                            By Status
							<img src="/images/svgs/arrowview.svg" alt="" className="w-[10px] h-[10px]"  />

                        </button>
                    </div>
                    </div>

                    {/* date filtering */}
{/* 
					<div className="py-8 flex items-center space-x-8 ">
						<div>
							<TextField id="outlined-basic" label="" variant="outlined" />
						</div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateRangePicker
								defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
							/>
						</LocalizationProvider>
					</div> */}

					{loading ? (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								minHeight: "300px",
								
							}}
						>
							<CircularProgress color="primary" size={70} />
						</Box>
					) : (
						<MyDataGrid data={data} type={table} />
					)}
				</div>
			)}
		</div>
	);
};

export default TransctionsPage;
