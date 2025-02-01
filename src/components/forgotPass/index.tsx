import React, { FormEvent } from "react";

import ForgotPassLayout from "../../pages/auth/forgotPassLayout";
import AuthInput from "../../pages/auth/textInput";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import router from "next/router";
import SuccessModal from "../shared/modals/SuccessModal";
// import styles from "./forgotPass.module.css";

const ForgotPass = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  
const [data, setData] = useState<any>({})
const [loading, setLoading] = useState<boolean>(false)
const [errors, setErrors] = useState<Record<string, string>>({});
const [open, setOpen] = React.useState(false);
const [open2, setOpen2] = React.useState(false);


const handleOpen = () => {
  setOpen(true);
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


  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e : FormEvent<HTMLFormElement>) =>{

    e.preventDefault();
    const validationErrors = validateFormData(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true)
      const params = {
        process: "tp_forgot_password",
        email: formData.email,
        }
      try {
        const response = await axios.post("http://localhost/SkyPay/index.php", JSON.stringify(params),{
          headers: {
          'Content-Type': 'application/json'
          }
        });
        console.log(response)
        let status = response.data.status
                if (status){
          setLoading(false)
          toast.success('Success')
          setData(response.data)
          handleSwitch()          
        }else{
          setLoading(false)
          toast.error('Unsuccessful! Email not registered, use a vaild email or register')
        }
        console.log(status)
        
      } catch (error) {
        console.error("Error forgetting password:", error);
      }
    }
    
  }
  
  const validateFormData = (data: any) => {
    const errors: Record<string, string> = {};
    
      if (!data.email) {
      errors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    
    return errors;
    };
  
    

  return (
    <ForgotPassLayout
      title="Forgot Password"
      desc="Enter your email below to retrieve your account"
      img="/images/png/authbg-2.png"
    >
      <div className="w-full px-6 md:px-12 font-inter">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mb-[5rem]">
          <AuthInput
            id="email"
            name="email"
            type="text"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            error={errors.email}
          />

          <input
          disabled={loading? true : false}
            type="submit"
            className="w-full bg-[#020d1e] rounded-lg text-[#fff] h-[40px] font-inter text-[600] md:text-[900]"
            value="Reset Password"
          />
        </form>
        
        <SuccessModal open={open2} onClose={handleClose2}>
          <div className='text-center w-full'>
              <div>
                  <h3 style={{color:'rgba(0, 0, 0, 1)'}} className='font-int font-[700] text-[20px]'>Succesful!</h3>
              </div>
              <div className='w-full text-center'>
                  <p className='text-[14px] font-int'>We've sent a password reset link to your email. Please check your inbox, and follow the instructions to create a new password. If you don’t see the email in a few minutes, don’t forget to check your spam folder.
                  </p>
              </div>
          </div>  
      </SuccessModal>
      </div>
    </ForgotPassLayout>
    
  );
};

export default ForgotPass;
