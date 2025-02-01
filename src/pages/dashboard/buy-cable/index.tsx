import BasicCard from "@/components/dashboard/card";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import UnsuccessfulModal from "@/components/shared/modals/UnsuccessfulModal";
import TopModal from "@/components/shared/modals/modal";
import ReceiptModal from "@/components/shared/modals/receiptModal";
import { AuthContext } from "@/context/authcontext/authcontext";
import usePost from "@/hooks/usePost";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const BuyCable = () => {

  // const url = process.env.BASE_URL ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
  const url = process.env.BASE_URL ?? '';
  const [amount, setAmount] = useState("0");
  const [percent, setPercent] = useState<number>(0);
  const [valuePrice, setValuePrice] = useState<number>(0);
  const [prod, setProd] = useState("");
  const [data, setData] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [selectedProd, setSelectedProd] = useState<any>({});
  const [provider, setProvider] = useState<
    null | "dstv" | "gotv" | "startimes"
  >("dstv");
  const auth = useContext(AuthContext);
  const api_key = auth?.userData?.api_key;
  const username = auth?.userData?.username;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const postData = {
      process: "tp_available_service_code_by_sub_code",
      api_key: api_key,
      service_code: provider, //dstv , startimes
    };

    const post = async () => {
      try {
        const res = await axios.post(url, JSON.stringify(postData), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(postData);
        if (res) {
          if (res.status) {
            setData(res?.data?.data);
            const firstData = res?.data?.data[0];
            setSelectedProd(firstData.available_service_system_name);
            setProd(firstData.available_service_system_name);
            setAmount(firstData.available_service_default_price);
          }
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

    post();
  }, [provider]);

  const [formData, setFormData] = useState({
    phone: "",
    amount: amount,
    card_no: "",
  });

  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  // useEffect(() => {
  //   const verifyCard = async () => {
  //     try {
  //       const params = {
  //         process: "verify",
  //         api_key: "dPta1myn2bOZrttYqRqpy7ddD0mfC1iWaCkKAj4H65vlR5LQJn0b468CHQPSYErxQvrkIuETkhlKm7UJRirrOiKoGTirGFkFGEOs4XBlH50sMKOf00PjrJHOzNls8E6J",
  //         product_code: prod,
  //         account_number: formData.card_no,
  //       };
  //       const response = await axios.post(url, JSON.stringify(params), {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.data.status !== true) {
  //         setVerificationError(response.data.data_result?.message || "Card verification failed");
  //       } else {
  //         setVerificationError(null);
  //       }
  //     } catch (error) {
  //       console.error("Card verification failed", error);
  //       setVerificationError("Card verification failed");
  //     }
  //   };

  //   if (prod && formData.card_no) {
  //     verifyCard();
  //   }
  // }, [prod, formData.card_no]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

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
          product_code: prod,
          phone: formData.phone,
          amount: valuePrice,
          smartcard_number: formData.card_no,
          name: username,
          bucket: "wallet",
          user_reference: "12200000000000012",
        };
        const response = await axios.post(url, JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(params);
        const server_message = response.data.server_message;
        setMessage(server_message);
        console.log(server_message);
        if (response.data.status === true) {
          setLoading(false);
          handleSwitch();
        } else {
          setLoading(false);
          handleError();
        }
      } catch (error) {
        setLoading(false);
        console.error("Login failed", error);
      }
    }
  };

  const validateFormData = (data: any) => {
    const errors: Record<string, string> = {};
    if (!data.phone) {
      errors.phone = "Please enter your phone number";
    }

    // if (!data.amount) {
    //   errors.amount = 'Please enter amount';
    // } else if (parseInt(data.amount) < 100) {
    //   errors.amount = 'Minimum amount of airtime is N100';
    // }

    if (!data.card_no) {
      errors.card_no = "Please enter card number";
    } else if (data.card_no.length < 10) {
      errors.card_no = "Please enter valid card number";
    }

    // if (verificationError) {
    //   errors.card_no = verificationError;
    // }

    return errors;
  };

  // const handleOpen = () => {
  // 	setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleSwitch = () => {
    setOpen(false);
    setOpen2(true);
  };
  const handleError = () => {
    setOpen(false);
    setOpen3(true);
  };
  useEffect(() => {
    const selectedProduct = data?.find(
      (i: any) => i.available_service_system_name === prod
    );

    if (selectedProduct) {
      setSelectedProd(selectedProduct);
      setAmount(selectedProduct.available_service_default_price);
    }
  }, [prod, data]);

  return (
    <Grid container spacing={8} paddingX={{ sm: 0, md: 3 }}>
      <Grid item sm={12} lg={9} sx={{ mt: 3 }}>
        <Typography className="font-inter text-2xl font-[700] mb-0">
          Cable TV
        </Typography>
      </Grid>
      <Grid item sm={12} lg={9}>
        <Typography className="font-inter text-lg mb-4 text-[#252525]">
          Choose Provider
        </Typography>
        <BasicCard>
          <div className="flex items-center space-x-3 mt-4">
            <button
              type="button"
              className={`${
                provider === "dstv"
                  ? "border border-[#000] rounded-lg p-[1px]"
                  : ""
              } relative`}
              onClick={() => {
                setProvider("dstv");
              }}
            >
              {provider === "dstv" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute right-0 top-0"
                  alt=""
                />
              )}
              <img src="/images/png/dstv.png" alt="" />
            </button>
            <button
              type="button"
              className={`${
                provider === "startimes"
                  ? "border border-[#000] rounded-lg p-[1px]"
                  : ""
              } relative`}
              onClick={() => {
                setProvider("startimes");
              }}
            >
              {provider === "startimes" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute right-0 top-0"
                  alt=""
                />
              )}
              <img src="/images/png/startimes.png" alt="" />
            </button>
            <button
              type="button"
              className={`${
                provider === "gotv"
                  ? "border border-[#000] rounded-lg p-[1px]"
                  : ""
              } relative`}
              onClick={() => {
                setProvider("gotv");
              }}
            >
              {provider === "gotv" && (
                <img
                  src="/images/png/clicked.png"
                  className="absolute right-0 top-0"
                  alt=""
                />
              )}
              <img src="/images/png/gotv.png" alt="" />
            </button>
          </div>
        </BasicCard>
      </Grid>
      <Grid item sm={12} lg={9}>
        <BasicCard>
          <form className="space-y-6 p-2 md:p-6">
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
                  name="card_no"
                  value={formData.card_no}
                  onChange={handleChangeInput}
                  type="text"
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                />
                {errors.card_no && (
                  <p className="text-red-500 text-sm mt-1">{errors.card_no}</p>
                )}
              </div>
            </div>
            <div className="w-full space-y-4">
              <p className="text-[#4C535F] font-[500] font-int text-[14px]">
                Choose Bouquet
              </p>
              <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
                <select
                  value={prod}
                  onChange={(e) => setProd(e.target.value)}
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                >
                  {data?.map((i: any, index: number) => (
                    <option key={index} value={i.available_service_system_name}>
                      {i?.available_service_description}
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
                <input
                  type="text"
                  value={amount}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChangeInput}
                  type="phone"
                  className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
              className=" w-[100%] md:w-[200px] py-2 rounded-lg font-int font-[700]"
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
              <span>{selectedProd?.available_service_description}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>VALUE</span>
              <span>{amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AMOUNT:</span>
              <span>{valuePrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>PHONE NUMBER:</span>
              <span>{formData.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>TRANSACTION ID:</span>
              <span></span>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              // onClick={handleSwitch}
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
                {formData.phone} with{" "}
                <span style={{ color: "rgba(4, 142, 35, 1)" }}>
                  {prod.toUpperCase()}
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
              <p className="text-[14px] font-int">
                Your transaction has not been fulfilled.
              </p>
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
            <span className="text-sm">Number of GB purchased</span>
            <span className="font-[500] text-sm">{prod.toUpperCase()}</span>
          </div>
        </ReceiptModal>
      </Grid>
    </Grid>
  );

};

export default BuyCable;
