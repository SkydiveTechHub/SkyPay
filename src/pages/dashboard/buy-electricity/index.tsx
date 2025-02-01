import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import TopModal from "@/components/shared/modals/modal";
import PlainModal from "@/components/shared/modals/plainModal";
import { AuthContext } from "@/context/authcontext/authcontext";
import GenerateID from "@/hooks/generateId";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import ReceiptModal from "@/components/shared/modals/receiptModal";

const BuyElectricity = () => {

  // const url = process.env.BASE_URL ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
  const url = process.env.BASE_URL ?? "http://localhost/SkyPay/index.php";
  const [amount, setAmount] = useState("0");
  const [message, setMessage] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [data, setData] = useState<any>({});
  const [provider, setProvider] = useState<
    | null
    | "kaduna"
    | "ibadan"
    | "abuja"
    | "benin"
    | "enugu"
    | "jos"
    | "ikeja"
    | "eko"
  >("ibadan");
  const auth = useContext(AuthContext);
  const api_key = auth?.userData?.api_key;
  const username = auth?.userData?.username;
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [option, setOption] = useState("prepaid");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [generate, setGenerate] = React.useState(false);
  const [percent, setPercent] = useState("0");
  const [valuePrice, setValuePrice] = useState<number>(0);

  const [product, setProduct] = useState<string>("");

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
  const [open4, setOpen4] = React.useState(false);
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
      service_code: `${provider}_distribution_company_prepaid`,
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
            console.log(res.data);
            setData(res?.data?.data);
            const firstData = res?.data?.data[0];
            setServiceName(firstData.available_service_system_name);
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
      const commission = parseInt(percent);
      console.log(commission);

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

  const [formData, setFormData] = useState({
    phone: "",
    meter_no: "",
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        const params = {
          process: "buy",
          api_key: api_key,
          product_code: serviceName,
          phone: formData.phone,
          amount: valuePrice,
          meter_number: formData.meter_no,
          name: username,
          bucket: "wallet",
          user_reference: id,
        };
        console.log("now processing");
        console.log(params);
        const response = await axios.post(url, JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response.data);
        const server_message = response.data.server_message;
        if (response.data.status === true) {
          setLoading(false);
          handleSwitch();
          setMessage(server_message);
        } else {
          setLoading(false);
          handleError();
          setMessage(server_message);
        }
      } catch (error) {
        // toast.error('Login Failed')
        setLoading(false);
        console.error("Login failed", error);
        handleError();
      }
    }
  };

  const validateFormData = (data: any) => {
    const errors: Record<string, string> = {};

    if (!data.phone) {
      errors.phone = "Please enter your phone number";
    }

    if (!amount) {
      errors.amount = "Please enter amount";
    } else if (parseInt(amount) < 100) {
      errors.amount = "Minimum amount of airtime is N100";
    }

    if (!data.meter_no) {
      errors.meter_no = "Please enter meter number";
    } else if (parseInt(data.meter_no) < 10) {
      errors.meter_no = "Minimum amount of airtime is N100";
    }

    // Ensure to return the errors object
    return errors;
  };

  const { id } = GenerateID(generate);

  useEffect(() => {
    const postData = {
      process: "tp_available_service_code_by_sub_code",
      api_key: api_key,
      service_code: `${provider}_distribution_company_${option}`,
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
        // const service_name = res.data.data[0].available_service_system_name
        // console.log(service_name)
        if (res) {
          console.log(res);
          if (res.status) {
            setData(res?.data?.data);
            const firstData = res?.data?.data[0];
            setServiceName(firstData.available_service_system_name);
            setAmount(firstData.available_service_actual_price);
          }

          console.log(res.data);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

    post();
  }, [provider, option]);

  return (
    <Grid container spacing={8} paddingX={3}>
      <Grid item sm={12} lg={9} sx={{ mt: 0 }}>
        <Typography className="font-inter text-2xl font-[700] mb-0">
          Electricity
        </Typography>
      </Grid>
      <Grid item sm={12} lg={9}>
        <Typography className="font-inter text-lg mb-4 text-[#252525]">
          Select Provider
        </Typography>
        <BasicCard>
          <div className="grid grid-cols-1 w-full md:w-[100%] gap-2 md:grid md:grid-cols-4 md:gap-6 items-center md:space-x-3 mt-4">
            <button
              type="button"
              className={`${
                provider === "abuja" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("abuja");
              }}
            >
              {provider === "abuja" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/AbujaEC.png"
                alt=""
              />
              <span className=" block">Abuja Electricity Company PLC</span>
            </button>
            <button
              type="button"
              className={`${
                provider === "benin" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("benin");
              }}
            >
              {provider === "benin" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/BeninEDC.png"
                alt=""
              />
              <span className="block">
                Benin Electricity Distribution Company PLC
              </span>
            </button>
            <button
              type="button"
              className={`${
                provider === "enugu" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("enugu");
              }}
            >
              {" "}
              {provider === "enugu" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/EnuguEDC.png"
                alt=""
              />
              <span className="block">
                Enugu Electricity Distribution Company PLC
              </span>
            </button>

            <button
              type="button"
              className={`${
                provider === "jos" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("jos");
              }}
            >
              {provider === "jos" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/JosEDC.png"
                alt=""
              />
              <span className="block">
                Jos Electricity Distribution Company PLC
              </span>
            </button>
            <button
              type="button"
              className={`${
                provider === "eko" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("eko");
              }}
            >
              {" "}
              {provider === "eko" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/EKOEDC.png"
                alt=""
              />
              <span className="block">
                Eko Electricity Distribution Company PLC
              </span>
            </button>
            <button
              type="button"
              className={`${
                provider === "ibadan" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("ibadan");
              }}
            >
              {provider === "ibadan" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/IbadanEDC.png"
                alt=""
              />
              <span className="block">
                Ibadan Electricity Distribution Company PLC
              </span>
            </button>
            <button
              type="button"
              className={`${
                provider === "ikeja" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("ikeja");
              }}
            >
              {provider === "ikeja" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/IkejaEDC.png"
                alt=""
              />
              <span className="block">
                Ikeja Electricity Distribution Company PLC
              </span>
            </button>
            <button
              type="button"
              className={`${
                provider === "kaduna" ? "" : ""
              } border border-[#000] text-[12px] h-[70px] bg-[#F0F0F0] flex items-center text-left space-x-1 rounded-lg p-[1px] relative`}
              onClick={() => {
                setProvider("kaduna");
              }}
            >
              {" "}
              {provider === "kaduna" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute left-0 top-0"
                  alt=""
                />
              )}
              <img
                className="w-[35px] h-[35px]"
                src="/images/png/Kaduna.png"
                alt=""
              />
              <span className="block">
                Kaduna Electricity Distribution Company PLC
              </span>
            </button>
          </div>
        </BasicCard>
      </Grid>
      <Grid item sm={12} lg={9}>
        <BasicCard>
          <form className="gap-6 p-6 grid grid-cols-1 md:grid-cols-2">
            <div className="w-full space-y-4">
              <p className="text-[#4C535F] font-[500] font-int text-[14px]">
                Meter Type
              </p>
              <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
                <select className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]">
                  <option value="prepaid">Prepaid</option>
                  <option value="postpaid">Postpaid</option>
                </select>
              </div>
            </div>

            <div className="w-full space-y-4">
              <p className="text-[#4C535F] font-[500] font-int text-[14px]">
                Meter Number
              </p>
              <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
                <input
                  type="text"
                  value={formData.meter_no}
                  name="meter_no"
                  onChange={handleChangeInput}
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                />
              </div>
			  {errors.amount ? (
                <small className="text-[red] font-int">{errors.amount}</small>
              ) : (
                ""
              )}
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
                {errors.phone ? (
                  <small className="text-[red] font-int">{errors.phone}</small>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="w-full space-y-4">
              <p className="text-[#4C535F] font-[500] font-int text-[14px]">
                Amount
              </p>
              <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  name="amount"
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                />
              </div>
              {errors.amount ? (
                <small className="text-[red] font-int">{errors.amount}</small>
              ) : (
                ""
              )}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                style={{
                  backgroundColor: "rgba(250, 26, 26, 0.3)",
                  color: "rgba(30, 30, 30, 1)",
                }}
                className="border border-[#FE2F2F] w-[200px] py-2 rounded-lg font-int font-[500]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleValidation();
                }}
                style={{
                  backgroundColor: "rgba(29, 191, 65, 1)",
                  color: "rgba(255, 255, 255, 1)",
                }}
                className="w-[200px] py-2 rounded-lg font-int font-[500]"
              >
                Continue
              </button>
            </div>
          </form>

          <p className="font-int font-[600] text-[12px] text-[#FF0000]">
            Note: You can only pay a minimum amount of N1000
          </p>
          <p className="font-int font-[600] text-[12px] text-[#FF0000]">
            A service charge of N100 will be included{" "}
          </p>
        </BasicCard>

        <PlainModal open={open} onClose={handleClose}>
          <Typography sx={{ fontWeight: 700, color: "rgba(34, 52, 127, 1)" }}>
            Please Confirm Your Transaction Details
          </Typography>

          <div className="space-y-4 mt-4 text-[14px]">
            <div className="grid grid-cols-2">
              <span>Product:</span>
              <span>{provider?.toUpperCase()} Electricity prepaid</span>
            </div>
            {/* <div className='grid grid-cols-2'>
=
                    <span>Phone Number:</span>
                    <span></span>
                </div> */}
            <div className="grid grid-cols-2">
              <span>Unit Price:</span>
              <span>N{amount}</span>
            </div>
            <div className="grid grid-cols-2">
              <span>Phone Number:</span>
              <span>{formData.phone}</span>
            </div>

            <div className="grid grid-cols-2">
              <span>Total Payable Amount:</span>
              <span>{valuePrice}</span>
            </div>

            <div className="grid grid-cols-2">
              <span>Transaction ID:</span>
              <span>{String(id)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span>Status:</span>
              <span></span>
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
              {loading ? "Processing..." : "Pay Now"}
            </button>
            <div className="flex justify-between items-center">
              <small>
                <i>You've enjoyed {percent}% discount on this transaction</i>
              </small>
              {/* <span>TRANSACTION ID:</span>
                    <span></span> */}
            </div>
          </div>
        </PlainModal>

        {/* confirmation modal */}
        <ConfirmModal open={open2} onClose={handleClose2}>
          <div className="text-center w-full">
            <div>
              <h3
                style={{ color: "rgba(0, 0, 0, 1)" }}
                className="font-int font-[700] text-[20px]"
              >
                Transaction Successful
              </h3>
            </div>
            <div className="w-full text-center">
              <p className="text-[14px] font-int">
                You have successfully purchased{" "}
                <span className="font-[800]">
                  {provider?.toUpperCase()} Electricity {option} Token
                </span>
              </p>
              <p
                style={{ color: "rgba(41, 41, 41, 1)" }}
                className="text-[14px] font-int font-[700]"
              >
                {/* {message} */}
                with{" "}
                <span style={{ color: "rgba(4, 142, 35, 1)" }}>
                  N{valuePrice}
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
            <span className="text-sm">Purchased</span>
            <span className="text-sm font-[500]">
              {provider?.toUpperCase()} {option.toUpperCase()}
            </span>
          </div>
        </ReceiptModal>
      </Grid>
    </Grid>
  );
};

export default BuyElectricity;
