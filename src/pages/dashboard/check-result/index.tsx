import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import TopModal from "@/components/shared/modals/modal";
import ReceiptModal from "@/components/shared/modals/receiptModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const CheckResult = () => {
  // const url = process.env.BASE_URL ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
  const url = process.env.BASE_URL ?? "http://localhost/SkyPay/index.php";
  const auth = useContext(AuthContext);
  const api_key = auth?.userData?.api_key;
  const username = auth?.userData?.username;
  const [amount, setAmount] = useState("0");
  const [quantity, setQuantity] = useState("1");
  const [product, setProduct] = useState<string>("");
  const [provider, setProvider] = useState<
    null | "waec" | "nabteb" | "neco" | "jamb"
  >("waec");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const actual_price = parseInt(quantity) * parseInt(amount);
  const [percent, setPercent] = useState("0");
  const [valuePrice, setValuePrice] = useState<number>(0);
  const [open4, setOpen4] = React.useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    amount: actual_price,
    email: "",
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
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
    console.log("got here");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        const params = {
          process: "buy",
          api_key: api_key,
          product_code: `${provider}_pin`,
          phone: formData.phone,
          quantity: quantity,
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

        const server_message = response.data.server_message
        console.log(response.data);
        if (response.data.status) {
          setLoading(false);
          handleSwitch();
        } else {
          setLoading(false);
          handleError();
          setMessage(server_message)
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

    if (!data.email) {
      errors.email = "Kindly enter your email address";
    }

    return errors;
  };

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

  const handleClose4 = () => {
    setOpen4(false);
  };
  
  const handleOpen4 = () => {
    setOpen4(true);
  };
  useEffect(() => {
    const postData = {
      process: "tp_available_service_code_by_sub_code",
      api_key: api_key,
      service_code: `${provider}_pin`, //waec_pin, neco_pin, nabtech_pin
      percent: "percent_commission",
    };

    setLoading(true);
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
            setProduct(res.data.data[0].available_service_description);
            setAmount(res.data.data[0].available_service_default_price);
            setPercent(res.data.data[0].percent_commission)
          }

          console.log(res.data);
        }
      } catch (err: any) {
        console.log(err.message);
        // handleError();
      } finally {
        setLoading(false); // Set loading to false after processing the response
      }
    };

    post();
  }, [provider]);

  useEffect(()=>{
    const calculateDiscount =()=>{
      const commission =  parseInt(percent)
      console.log(commission)
        if (commission !== 0){
          let calculatedValuePrice = (commission / 100) * parseInt(amount);
          const valueAmount = parseInt(amount) - calculatedValuePrice
          setValuePrice(valueAmount)
        }else{
          setValuePrice(parseInt(amount));
        }
      
    }

    calculateDiscount()
  }, [amount])
  return (
    <Grid container spacing={8} paddingX={3}>
      <Grid item sm={12} lg={9} sx={{ mt: 3 }}>
        <Typography className="font-inter text-2xl font-[700] mb-0">
          Result checker
        </Typography>
      </Grid>
      <Grid item sm={12} lg={9}>
        <Typography className="font-inter text-lg mb-4 text-[#252525]">
          Choose Exam Type
        </Typography>
        <BasicCard>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className={`${
                provider === "waec"
                  ? "border border-[#000] rounded-lg p-[1px]"
                  : ""
              } relative `}
              onClick={() => {
                setProvider("waec");
              }}
            >
              {provider === "waec" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute right-0 top-0"
                  alt=""
                />
              )}
              <img src="/images/png/waec.png" alt="" />
            </button>
            <button
              type="button"
              className={`${
                provider === "neco"
                  ? "border border-[#000] rounded-lg p-[1px]"
                  : ""
              } relative `}
              onClick={() => {
                setProvider("neco");
              }}
            >
              {provider === "neco" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute right-0 top-0"
                  alt=""
                />
              )}
              <img src="/images/png/neco.png" alt="" />
            </button>
            <button
              type="button"
              className={`${
                provider === "nabteb"
                  ? "border border-[#000] rounded-lg p-[1px]"
                  : ""
              } relative `}
              onClick={() => {
                setProvider("nabteb");
              }}
            >
              {provider === "nabteb" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute right-0 top-0"
                  alt=""
                />
              )}
              <img src="/images/png/nabteb.png" alt="" />
            </button>
            <button
              type="button"
              className={`${
                provider === "jamb"
                  ? "border border-[#000] rounded-lg p-[1px]"
                  : ""
              } relative `}
              onClick={() => {
                setProvider("jamb");
              }}
            >
              {provider === "jamb" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute right-0 top-0"
                  alt=""
                />
              )}
              <img src="/images/png/waec.png" alt="" />
            </button>
          </div>
        </BasicCard>
      </Grid>
      <Grid item sm={12} lg={9}>
        <BasicCard>
          <form className="space-y-6 p-6">
            <div className="w-full space-y-4">
              <p className="text-[#4C535F] font-[500] font-int text-[14px]">
                Exam Type
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
              <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                >
                  {/* <option>Choose quantity </option> */}
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <div className="w-full space-y-4">
              <p className="text-[#4C535F] font-[500] font-int text-[14px]">
                Amount:{" "}
                <span className="text-[12px] italic">{loading ? "Loading amount..." : amount} per unit</span>
              </p>
              <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
                <input
                  type="text"
                  value={loading ? "Loading..." : actual_price}
                  disabled
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                />
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
                   {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="w-full space-y-4">
              <p className="text-[#4C535F] font-[500] font-int text-[14px]">
                Enter Email{" "}
              </p>
              <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeInput}
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                />
                   {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
            <div className='flex justify-between items-center'>
                    <span>ACTUAL AMOUNT:</span>
                    <span>₦ {amount}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>DISCOUNT AMOUNT:</span>
                    <span>₦ {valuePrice}</span>
                </div>
            <div className="flex justify-between items-center">
              <span>PHONE NUMBER:</span>
              <span>{formData.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>TRANSACTION ID:</span>
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
                {provider?.toUpperCase()} Pin Purchase Successful
              </h3>
            </div>
            <div className="w-full text-center">
              <p className="text-[14px] font-int">
                You have successfully purchased
              </p>
              <p
                style={{ color: "rgba(41, 41, 41, 1)" }}
                className="text-[14px] font-int font-[700]"
              >
                {provider?.toUpperCase()} Pin with{" "}
                <span style={{ color: "rgba(4, 142, 35, 1)" }}>
                N{valuePrice} {provider?.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
          <button type='button' 
        onClick={()=>{
          handleClose2()
          handleOpen4()
          
          }} 
          style={{backgroundColor: 'rgba(29, 191, 65, 1)', color:'rgba(255, 255, 255, 1)'}} className='w-[150px] py-2 rounded-lg font-int text-[14px] font-[600]'>View Reciept</button>
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

        {/* reciept modal */}
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
      <span className='text-sm'>Number of pins purchased</span>
      <span className='text-sm font-[500]'>{quantity}</span>
  </div>

</ReceiptModal>
      </Grid>
    </Grid>
  );
};

export default CheckResult;
