import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import TopModal from "@/components/shared/modals/modal";
import PlainModal from "@/components/shared/modals/plainModal";
import ReceiptModal from "@/components/shared/modals/receiptModal";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Betting = () => {
	const url = process.env.BASE_URL ?? '';
	const auth = useContext(AuthContext);
	const api_key = auth?.userData?.api_key;
	const [amount, setAmount] = useState("0");
	const [icon, setIcon] = useState("");
	const [open3, setOpen3] = React.useState(false);
	const [provider, setProvider] = useState<null | "sportybet" | "bet9ja">(
		"sportybet"
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [valuePrice, setValuePrice] = useState<number>(0);
	const [percent, setPercent] = useState<number>(0);
	const [message, setMessage] = useState("");

	const [productCode, setProductCode] = useState("");

	const [data, setData] = useState<any>({});
	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open4, setOpen4] = React.useState(false);
	const [formData, setFormData] = useState({
		phone: "",
	});
	const handleChangeProvider = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setProvider(event.target.value as null | "sportybet" | "bet9ja");
	};

	const handleError = () => {
		setOpen(false);
		setOpen3(true);
	};
	const handleOpen4 = () => {
		setOpen4(true);
	  };
	const handleClose3 = () => {
		setOpen3(false);
	};
	const handleClose4 = () => {
		setOpen4(false);
	  };
	// ********************************** getting betting services
	useEffect(() => {
		const postData = {
			process: "tp_available_service_code_by_sub_code",
			api_key: api_key,
			service_code: provider, //smile_data
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
						console.log(res.data);
						setData(res?.data?.data);
						const firstData = res?.data?.data[0];
						// setAmount(firstData.available_service_actual_price);
						setPercent(firstData.percent_commission);
						setProductCode(firstData.available_service_name);
					}
				}
			} catch (err: any) {
				console.log(err.message);
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

	const handleSwitch = () => {
		setOpen(false);
		setOpen2(true);
	};
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateFormData = (data: any) => {
        const errors: Record<string, string> = {};
        if (!data.phone) {
          errors.phone = 'Please enter your phone number';
          
        }

        if (!amount) {
          errors.amount = 'Please enter amount';
        } else if (parseInt(amount) < 100) {
          errors.amount = 'Minimum amount of airtime is N100';
        }

        return errors;
      };

	  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		handleInputChange(name, value);
	  };
	  const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
		setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
	  };

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
		  setLoading(true)
		  try {
  
			const params = {
				"process": "buy",
				"api_key": api_key,
				"product_code": productCode,
				"amount": valuePrice,
				"phone": formData.phone,
				"bucket": "wallet",
				"user_reference": "100002" 
			}
			
			const response = await axios.post(
			  url,
			  JSON.stringify(params),
			  {
				headers: {
				  'Content-Type': 'application/json',
				},
			  }
			);
  
			setMessage(response.data.server_message)
			if(response.data.status){
			  setLoading(false)
			  handleSwitch()              
			} else{
			  setLoading(false)
			  handleError()
			}
  
			
		  } catch (error) {
			// toast.error('Login Failed')
			setLoading(false)
			console.error('Login failed', error);
			handleError()
		  }      
		}
	
	
	  };

	return (
		<Grid container spacing={8}>
			<Grid item sm={9}>
				<BasicCard>
				<form className='space-y-6 p-6'>

<div className='w-full space-y-4'>
	<p className='text-[#4C535F] font-[500] font-int text-[14px]'>Choose Service Provider</p>
	<div className='w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center'>
	   
		<select  value={provider || ""}
		 onChange={handleChangeProvider}className='w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]'>
		<option value="" disabled>Select betting Platform</option>
			<option value="sportybet">Sporty Bet</option>
			<option value="bet9ja">Bet9ja</option>
		</select>
	</div>
</div>
<div className='w-full space-y-4'>
	<p className='text-[#4C535F] font-[500] font-int text-[14px]'>User ID</p>
	<div className='w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center'>
		<div className='pl-2 pr-3 border-r'><span className='text-[#8D98AA] font-[600] font-int text-[14px]'>+234</span></div>
		<input type="phone"  value={formData.phone} onChange={handleChangeInput} name='phone' className='w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]' />
		
	</div>
	{errors.phone ? (
                <small className="text-[red] font-int">{errors.phone}</small>
              ) : (
                ""
              )}
</div>
<div className='w-full space-y-4'>
	<p className='text-[#4C535F] font-[500] font-int text-[14px]'>Amount to Fund</p>
	<div className='w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md'>
		<input type="text" value={amount} name='amount' onChange={(e)=>setAmount(e.target.value)}  placeholder='N100' className='w-full bg-transparent h-full outline-none  px-4 text-[#8D98AA] font-[600] font-int text-[14px]'  />
		<small>Pay N90</small>
		{errors.amount ? (
                <small className="text-[red] font-int"> {errors.amount}</small>
              ) : (
                ""
              )}
	</div>
	
</div>





<button type='button' onClick={() => {
                handleValidation();
              }} style={{backgroundColor: 'rgba(29, 191, 65, 1)', color:'rgba(255, 255, 255, 1)'}} className='w-[200px] py-2 rounded-lg font-int font-[700]'>Confirm</button>
</form>
				</BasicCard>

				<PlainModal open={open} onClose={handleClose}>
					<Typography sx={{ fontWeight: 700, color: "rgba(34, 52, 127, 1)" }}>
						Please Confirm Your Transaction Details
					</Typography>

					<div className="space-y-4 mt-4 text-[14px]">
						<div className="grid grid-cols-2">
							<span>Name:</span>
							<span>username</span>
						</div>
						<div className="grid grid-cols-2">
							<span>Provider:</span>
							<span>{provider}</span>
						</div>
						<div className="grid grid-cols-2">
							<span>User ID:</span>
							<span></span>
						</div>
						<div className="grid grid-cols-2">
							<span>Amount:</span>
							<span>N{amount}</span>
						</div>
						<div className="grid grid-cols-2">
							<span>Amount Charged:</span>
							<span>{valuePrice}</span>
						</div>

						<div className="grid grid-cols-2">
							<span>Total:</span>
							<span></span>
						</div>
						<div className='flex justify-between items-center'>
                  <small><i>You've enjoyed {percent}% discount on this transaction</i></small>
                    {/* <span>TRANSACTION ID:</span>
                    <span></span> */}
                </div>
						<button
							type="button"
							onClick={handleSubmit}
							style={{
								backgroundColor: "rgba(40, 192, 241, 1)",
								color: "rgba(30, 30, 30, 1)",
							}}
							className="w-[200px] py-2 rounded-lg font-int font-[500]"
						>
							Pay Now
						</button>
					</div>
				</PlainModal>

				 {/* confirmation modal */}
				 <ConfirmModal open={open2} onClose={handleClose2}>
            <div className='text-center w-full'>
                <div>
                    <h3 style={{color:'rgba(0, 0, 0, 1)'}} className='font-int font-[700] text-[20px]'>Bet Recharge Successful</h3>
                </div>
                <div className='w-full text-center'>
                    <p className='text-[14px] font-int'>You have successfully topup</p>
                    <p style={{color:'rgba(41, 41, 41, 1)'}} className='text-[14px] font-int font-[700]'>{formData.phone} {provider?.toUpperCase()} account with <span style={{color:'rgba(4, 142, 35, 1)'}}>  N{valuePrice}</span></p>
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
             <p>{message}</p>
            </p>
          </div>
        </div>
      </UnsuccessfulModal>
      <ReceiptModal 
  open={open4} 
  onClose={handleClose4} 
  phone={formData.phone}
  source={'wallet'}
  provider={provider ?? ''}
  status={'Successful'}
  date={''}
  after_balance={''}
  amount={valuePrice}

  >

  <div className='flex justify-between items-center gap-32'>
      <span className='text-sm'>Amount Topped up</span>
      <span className='text-sm font-[500]'>{amount}</span>
  </div>

</ReceiptModal>
			</Grid>
		</Grid>
	);
};

export default Betting;
