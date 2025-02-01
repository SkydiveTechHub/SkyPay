import React from "react";
import ForgotPassLayout from "../../pages/auth/forgotPassLayout";
import AuthInput from "../../pages/auth/textInput";
import { useState } from "react";
import PasswordInput from "@/pages/auth/passwordInput";

const ResetPass = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <ForgotPassLayout
      title="Reset Password"
      desc="Enter Your New Password"
      img="/images/png/authbg-2.png"
    >
      <div className="w-full px-6 md:px-12 font-inter">
        <form className="flex flex-col space-y-6 mb-[5rem]">
          <PasswordInput
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="**************"
          />
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Re-type Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="**************"
          />

          <input
            type="submit"
            className="w-full bg-[#020d1e] rounded-lg text-[#fff] h-[40px] font-inter text-[600] md:text-[900]"
            value="Reset Password"
          />
        </form>
      </div>
    </ForgotPassLayout>
  );
};

export default ResetPass;
